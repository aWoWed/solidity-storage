// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Types} from "../libraries/Types.sol";

interface ISetters {
    function setData(bytes calldata data) external;

    function addThirtyTwoBytesNumberArrayItem(uint256 item) external;

    function addSixteenBytesNumberArrayItem(uint128 item) external;

    function addAddressesArrayItem(address item) external;

    function addStringArrayItem(string calldata item) external;

    function addBoolArrayItem(bool item) external;

    function addDefaultMappingItem(address item) external;

    function addNestedMappingItem(bool item) external;

    function setOneStorageSlotStruct(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        Types.SomeStatus _status
    ) external;

    function addOneStorageSlotStructArrayItem(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        Types.SomeStatus _status
    ) external;

    function addOneStorageSlotStructMappingItem(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        Types.SomeStatus _status
    ) external;

    function addOneStorageSlotStructNestedMappingItem(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        Types.SomeStatus _status
    ) external;

    function setBytesStruct(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        Types.SomeStatus _status
    ) external;

    function addBytesStructArrayItem(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        Types.SomeStatus _status
    ) external;

    function addBytesStructMappingItem(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        Types.SomeStatus _status
    ) external;

    function addBytesStructNestedMappingItem(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        Types.SomeStatus _status
    ) external;

    function setStringStruct(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) external;

    function addStringStructArrayItem(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) external;

    function addStringStructMappingItem(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) external;

    function addStringStructNestedMappingItem(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) external;

    function setArrayStruct(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        Types.SomeStatus _status
    ) external;

    function addArrayStructArrayItem(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        Types.SomeStatus _status
    ) external;

    function addArrayStructMappingItem(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        Types.SomeStatus _status
    ) external;

    function addArrayStructNestedMappingItem(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        Types.SomeStatus _status
    ) external;

    function setParentStruct(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        Types.SomeStatus _status
    ) external;

    function addParentStructArrayItem(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        Types.SomeStatus _status
    ) external;

    function addParentStructMappingItem(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        Types.SomeStatus _status
    ) external;

    function addParentStructNestedMappingItem(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        Types.SomeStatus _status
    ) external;
}
