import { ethers } from 'hardhat';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Get the signer
  const [signer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', signer.address);

  // Deploy EndpointV2Mock (for testing purposes)
  const EndpointV2MockFactory = await ethers.getContractFactory('EndpointV2Mock');
  const EndpointV2Mock = await EndpointV2MockFactory.deploy(1); // Assuming eidA is 1
  await EndpointV2Mock.waitForDeployment();
  await sleep(5000); // Sleep for 5 seconds
  const EndpointV2MockAddress = await EndpointV2Mock.getAddress();
  console.log('EndpointV2Mock deployed to:', EndpointV2MockAddress);

  // Deploy TOKEN
  const TOKENFactory = await ethers.getContractFactory('TOKEN');
  const TOKEN = await TOKENFactory.deploy(EndpointV2MockAddress);
  await TOKEN.waitForDeployment();
  await sleep(5000); // Sleep for 5 seconds
  const TOKENAddress = await TOKEN.getAddress();
  console.log('TOKEN deployed to:', TOKENAddress);

  // Set up initial state for TOKEN contract
  const [owner] = await ethers.getSigners();

  // Set admin for TOKEN
  await TOKEN.setAdmin(owner.address);
  await sleep(5000); // Sleep for 5 seconds
  console.log('Owner set as admin for TOKEN');

  // Mint some initial tokens to the owner (for testing)
  const initialMintAmount = ethers.parseEther('1000');
  await TOKEN.mint(owner.address, initialMintAmount);
  await sleep(5000); // Sleep for 5 seconds
  console.log('Minted', ethers.formatEther(initialMintAmount), 'TOKEN to owner');

  // Set up peer for cross-chain functionality (for testing purposes)
  const mockPeerAddress = ethers.Wallet.createRandom().address;
  await TOKEN.setPeer(2, ethers.zeroPadValue(mockPeerAddress, 32)); // Assuming eidB is 2
  await sleep(5000); // Sleep for 5 seconds
  console.log('Set mock peer for TOKEN');

  // Check the balance of TOKEN for the owner
  const tokenBalance = await TOKEN.balanceOf(owner.address);
  console.log('Owner TOKEN balance:', ethers.formatEther(tokenBalance));

  console.log('Deployment and initial setup completed successfully');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
