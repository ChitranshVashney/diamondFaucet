// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ContractA is ReentrancyGuard {
    bytes32 constant DIAMOND_STORAGE_POSITION =
        keccak256("diamond.standard.storage");

    struct SquareState {
        uint256 value;
    }

    constructor() {}

    function diamondStorage() internal pure returns (SquareState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    // Stores a new value in the contract
    function setValue(uint256 _newValue) public {
        SquareState storage squareState = diamondStorage();
        squareState.value = _newValue;
    }

    // Reads the last stored value
    function getValue() public view returns (uint256) {
        SquareState storage squareState = diamondStorage();
        return squareState.value;
    }
}
