// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ContractA is Ownable, ReentrancyGuard {
    uint256 private value;

    event ValueChanged(uint256 newValue);

    constructor() Ownable(msg.sender) {}

    // Getter function to return the value
    function getValue() external view returns (uint256) {
        return value;
    }

    // Setter function to update the value with reentrancy guard and admin access
    function setValue(uint256 newValue) external onlyOwner nonReentrant {
        value += newValue;
        emit ValueChanged(value);
    }
}
