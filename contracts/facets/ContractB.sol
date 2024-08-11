// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract ContractB {
    bytes32 constant DIAMOND_STORAGE_POSITION =
        keccak256("diamond.standard.admin.storage");

    struct AdminState {
        address superAdmin;
        mapping(address => bool) isAdmin;
    }

    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    event AdminRoleTransferred(
        address indexed oldAdmin,
        address indexed newAdmin
    );
    event SuperAdminChanged(
        address indexed oldSuperAdmin,
        address indexed newSuperAdmin
    );
    event AdminRoleRenounced(address indexed admin);

    modifier onlySuperAdmin() {
        require(
            msg.sender == diamondStorage().superAdmin,
            "ContractB: Caller is not the superAdmin"
        );
        _;
    }

    constructor() {
        diamondStorage().superAdmin = msg.sender;
    }

    function diamondStorage() internal pure returns (AdminState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function addAdmin(address _admin) external onlySuperAdmin {
        require(_admin != address(0), "ContractB: Invalid admin address");
        AdminState storage adminState = diamondStorage();
        require(!adminState.isAdmin[_admin], "ContractB: Admin already exists");

        adminState.isAdmin[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) external onlySuperAdmin {
        require(_admin != address(0), "ContractB: Invalid admin address");
        AdminState storage adminState = diamondStorage();
        require(adminState.isAdmin[_admin], "ContractB: Admin does not exist");

        adminState.isAdmin[_admin] = false;
        emit AdminRemoved(_admin);
    }

    function transferAdminRole(address _newAdmin) external {
        require(
            _newAdmin != address(0),
            "ContractB: Invalid new admin address"
        );
        AdminState storage adminState = diamondStorage();
        require(
            adminState.isAdmin[msg.sender],
            "ContractB: Caller is not an admin"
        );

        adminState.isAdmin[msg.sender] = false;
        adminState.isAdmin[_newAdmin] = true;
        emit AdminRoleTransferred(msg.sender, _newAdmin);
    }

    function renounceAdminRole() external {
        AdminState storage adminState = diamondStorage();
        require(
            adminState.isAdmin[msg.sender],
            "ContractB: Caller is not an admin"
        );

        adminState.isAdmin[msg.sender] = false;
        emit AdminRoleRenounced(msg.sender);
    }

    function changeSuperAdmin(address _newSuperAdmin) external onlySuperAdmin {
        require(
            _newSuperAdmin != address(0),
            "ContractB: Invalid new superAdmin address"
        );
        AdminState storage adminState = diamondStorage();
        address oldSuperAdmin = adminState.superAdmin;

        adminState.superAdmin = _newSuperAdmin;
        emit SuperAdminChanged(oldSuperAdmin, _newSuperAdmin);
    }

    function isAdmin(address _admin) external view returns (bool) {
        return diamondStorage().isAdmin[_admin];
    }

    function getSuperAdmin() external view returns (address) {
        return diamondStorage().superAdmin;
    }
}
