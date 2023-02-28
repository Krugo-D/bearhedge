pragma solidity ^0.8.4;

import "./Crowdsale.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

/**
 * @title MintedCrowdsale
 * @dev Extension of Crowdsale contract whose tokens are minted in each purchase.
 * Token ownership should be transferred to MintedCrowdsale for minting.
 */
contract MintedCrowdsale is Crowdsale {

    constructor(
        uint256 r,
        address payable w,
        IERC20 t
    ) Crowdsale(r,w,t) {
    
    }

    function _deliverTokens(address beneficiary, uint256 tokenAmount) internal override {
        ERC20PresetMinterPauser(address(token())).mint(beneficiary, tokenAmount);
    }
}
