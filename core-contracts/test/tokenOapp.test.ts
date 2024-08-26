import { Options } from '@layerzerolabs/lz-v2-utilities';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

describe('TOKEN Test', function () {
  const eidA = 1;
  const eidB = 2;
  let TOKEN: ContractFactory;
  let EndpointV2Mock: ContractFactory;
  let ownerA: SignerWithAddress;
  let ownerB: SignerWithAddress;
  let endpointOwner: SignerWithAddress;
  let tokenA: Contract;
  let tokenB: Contract;
  let mockEndpointV2A: Contract;
  let mockEndpointV2B: Contract;

  before(async function () {
    TOKEN = await ethers.getContractFactory('TOKEN');
    [ownerA, ownerB, endpointOwner] = await ethers.getSigners();
    EndpointV2Mock = await ethers.getContractFactory(
      'EndpointV2Mock',
      endpointOwner
    );
  });

  beforeEach(async function () {
    mockEndpointV2A = await EndpointV2Mock.deploy(eidA);
    mockEndpointV2B = await EndpointV2Mock.deploy(eidB);

    tokenA = await TOKEN.deploy( mockEndpointV2A.target);
    tokenB = await TOKEN.deploy(mockEndpointV2B.target);


    await mockEndpointV2A.setDestLzEndpoint(
      tokenB.target,
      mockEndpointV2B.target
    );
    await mockEndpointV2B.setDestLzEndpoint(
      tokenA.target,
      mockEndpointV2A.target
    );

    await tokenA
      .connect(ownerA)
      .setPeer(eidB, ethers.zeroPadValue(tokenB.target, 32));
    await tokenB
      .connect(ownerA)
      .setPeer(eidA, ethers.zeroPadValue(tokenA.target, 32));

    await tokenA.setAdmin(ownerA.address);
    //Mint to ownerA
    await tokenA.mint(ownerA.address, ethers.parseEther('100'));
    // Approve tokenA
    await tokenA.approve(tokenA.target, ethers.parseEther('100'));
    // Grant MINTER_ROLE contracts
    await tokenA.setAdmin(tokenA.target);
    await tokenB.setAdmin(tokenB.target);

  });

  it('should mint TOKEN tokens cross-chain', async function () {
    const mintAmount = ethers.parseEther('100');
    const options = Options.newOptions()
      .addExecutorLzReceiveOption(200000, 0)
      .toHex()
      .toString();

    // Check if TOKEN tokens on chain A
    expect(await tokenA.balanceOf(ownerA.address)).to.equal(mintAmount);
    expect(await tokenA.balanceOf(ownerB.address)).to.equal(0);
    expect(await tokenB.balanceOf(ownerA.address)).to.equal(0);
    expect(await tokenB.balanceOf(ownerB.address)).to.equal(0);
    // Quote and send the cross-chain mint message
    const [nativeFee] = await tokenA.quote(
      eidB,
      ownerA.address,
      mintAmount,
      options,
      false
    );
    //bridge to address ownerB
    await tokenA.bridgeTOKEN(
      eidB,
      ownerB.address,
      mintAmount,
      options,
      { value: nativeFee }
    );

    // Check if TOKEN tokens were minted on chain B
    expect(await tokenA.balanceOf(ownerA.address)).to.equal(0);
    expect(await tokenA.balanceOf(ownerB.address)).to.equal(0);
    expect(await tokenB.balanceOf(ownerA.address)).to.equal(0);
    expect(await tokenB.balanceOf(ownerB.address)).to.equal(mintAmount);
  });
});
