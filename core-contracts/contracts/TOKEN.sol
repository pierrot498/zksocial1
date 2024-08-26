// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ITOKEN } from "./interfaces/ITOKEN.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";

contract TOKEN is ITOKEN, ERC20, ERC20Burnable, ERC20Permit, OApp {
    address public admin;
    mapping(address => bool) public blacklist;

    constructor(address _endpoint) ERC20("TOKEN", "TOKEN") ERC20Permit("TOKEN") OApp(_endpoint, msg.sender) Ownable(msg.sender) {
        // No initial supply
    }

    function setAdmin(address newAdmin) external onlyOwner {
        if (newAdmin == address(0)) revert InvalidAdminAddress();
        address oldAdmin = admin;
        admin = newAdmin;
        emit AdminChanged(oldAdmin, newAdmin);
    }

    function mint(address to, uint256 amount) external {
        if (msg.sender != admin) revert OnlyAdminCanMint();
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    function blacklistAccount(address account) external onlyOwner {
        blacklist[account] = true;
        emit Blacklisted(account);
    }

    function unblacklistAccount(address account) external onlyOwner {
        blacklist[account] = false;
        emit Unblacklisted(account);
    }

    function _update(address from, address to, uint256 amount) internal virtual override {
        if (blacklist[from] || blacklist[to]) revert BlacklistedAddress();
        super._update(from, to, amount);
    }

    function _lzReceive(
        Origin calldata _origin,
        bytes32 _guid,
        bytes calldata _message,
        address _executor,
        bytes calldata _extraData
    ) internal override {
        (address user, uint256 amount) = abi.decode(_message, (address, uint256));
        this.mint(user, amount);
    }

    function bridgeTOKEN(uint32 _dstEid, address _to, uint256 _amount, bytes calldata _options) external payable {
        this.burnFrom(msg.sender, _amount);
        bytes memory payload = abi.encode(_to, _amount);
        _lzSend(_dstEid, payload, _options, MessagingFee(msg.value, 0), payable(msg.sender));
    }

    function quote(
        uint32 _dstEid,
        address _to,
        uint256 _amount,
        bytes calldata _options,
        bool _payInLzToken
    ) public view returns (uint256 nativeFee, uint256 lzTokenFee) {
        bytes memory payload = abi.encode(_to, _amount);
        MessagingFee memory fee = _quote(_dstEid, payload, _options, _payInLzToken);
        return (fee.nativeFee, fee.lzTokenFee);
    }
}
