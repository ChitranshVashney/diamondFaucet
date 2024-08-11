// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract ContractB is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address public superAdmin;

    constructor() {
        superAdmin = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addAdmin(address account) external onlySuperAdmin {
        grantRole(ADMIN_ROLE, account);
    }

    function removeAdmin(address account) external onlySuperAdmin {
        revokeRole(ADMIN_ROLE, account);
    }

    function transferAdminRole(address newSuperAdmin) external onlySuperAdmin {
        require(
            newSuperAdmin != address(0),
            "New super admin is the zero address"
        );
        revokeRole(DEFAULT_ADMIN_ROLE, superAdmin);
        superAdmin = newSuperAdmin;
        grantRole(DEFAULT_ADMIN_ROLE, superAdmin);
    }

    function renounceAdminRole() external onlySuperAdmin {
        renounceRole(DEFAULT_ADMIN_ROLE, superAdmin);
        superAdmin = address(0);
    }

    modifier onlySuperAdmin() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Caller is not super admin"
        );
        _;
    }
}
