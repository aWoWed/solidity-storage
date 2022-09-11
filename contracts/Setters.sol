// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./interfaces/ISetters.sol";
import "./ownable/Ownable.sol";
import "./Getters.sol";
import {Types} from "./libraries/Types.sol";

contract Setters is Ownable, Getters, ISetters {
    function setData(bytes calldata data) external override onlyOwner {
        _data = data;
    }

    function addThirtyTwoBytesNumberArrayItem(uint256 item) external override {
        _thirtyTwoBytesNumberArray.push(item);
    }

    function addSixteenBytesNumberArrayItem(uint128 item) external override {
        _sixteenBytesNumberArray.push(item);
    }

    function addAddressesArrayItem(address item) external override {
        _addressesArray.push(item);
    }

    function addStringArrayItem(string calldata item) external override {
        _stringArray.push(item);
    }

    function addBoolArrayItem(bool item) external override {
        _boolArray.push(item);
    }

    function addDefaultMappingItem(address item) external override {
        _defaultMappingCounter = _defaultMappingCounter + 1;
        _defaultMapping[_defaultMappingCounter] = item;
    }

    function addNestedMappingItem(bool item) external override {
        _nestedMappingCounter = _nestedMappingCounter + 1;
        _nestedMapping[_nestedMappingCounter][msg.sender] = item;
    }

    function _createOneStorageSlotStruct(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        Types.SomeStatus _status
    ) private pure returns (Types.OneStorageSlotStruct memory newStruct) {
        newStruct = Types.OneStorageSlotStruct({
            oneByteNumber: _oneByteNumber,
            eightBytesNumber: _eightBytesNumber,
            status: _status
        });
    }

    function _createBytesStruct(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        Types.SomeStatus _status
    ) private pure returns (Types.BytesStruct memory newStruct) {
        newStruct = Types.BytesStruct({
            amount: _amount,
            someAddress: _someAddress,
            data: _data,
            status: _status
        });
    }

    function _createStringStruct(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) private pure returns (Types.StringStruct memory newStruct) {
        newStruct = Types.StringStruct({
            str: _str,
            thirtyTwoBytes: _thirtyTwoBytes,
            isCreated: _isCreated
        });
    }

    function _createArrayStruct(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        Types.SomeStatus _status
    ) private pure returns (Types.ArrayStruct memory newStruct) {
        newStruct = Types.ArrayStruct({
            amounts: _amounts,
            addresses: _addresses,
            status: _status
        });
    }

    function _createParentStruct(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        Types.SomeStatus _status
    ) private pure returns (Types.ParentStruct memory newStruct) {
        Types.ChildStruct memory _childStruct = Types.ChildStruct({
            amount: _amount,
            someAddress: _someAddress,
            functionSignature: _functionSignature
        });

        newStruct = Types.ParentStruct({
            childStruct: _childStruct,
            number: _number,
            status: _status
        });
    }

    function setOneStorageSlotStruct(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        Types.SomeStatus _status
    ) external override onlyOwner {
        _oneStorageSlotStruct = _createOneStorageSlotStruct(
            _oneByteNumber,
            _eightBytesNumber,
            _status
        );
    }

    function addOneStorageSlotStructArrayItem(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        Types.SomeStatus _status
    ) external override {
        _oneStorageSlotStructArray.push(
            _createOneStorageSlotStruct(
                _oneByteNumber,
                _eightBytesNumber,
                _status
            )
        );
    }

    function addOneStorageSlotStructMappingItem(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        Types.SomeStatus _status
    ) external override {
        _oneStorageSlotStructMappingCounter =
            _oneStorageSlotStructMappingCounter +
            1;
        _oneStorageSlotStructMapping[
            _oneStorageSlotStructMappingCounter
        ] = _createOneStorageSlotStruct(
            _oneByteNumber,
            _eightBytesNumber,
            _status
        );
    }

    function addOneStorageSlotStructNestedMappingItem(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        Types.SomeStatus _status
    ) external override {
        _oneStorageSlotStructNestedMappingCounter =
            _oneStorageSlotStructNestedMappingCounter +
            1;
        _oneStorageSlotStructNestedMapping[
            _oneStorageSlotStructNestedMappingCounter
        ][msg.sender] = _createOneStorageSlotStruct(
            _oneByteNumber,
            _eightBytesNumber,
            _status
        );
    }

    function setBytesStruct(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        Types.SomeStatus _status
    ) external override onlyOwner {
        _bytesStruct = _createBytesStruct(
            _amount,
            _someAddress,
            _data,
            _status
        );
    }

    function addBytesStructArrayItem(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        Types.SomeStatus _status
    ) external override {
        _bytesStructArray.push(
            _createBytesStruct(_amount, _someAddress, _data, _status)
        );
    }

    function addBytesStructMappingItem(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        Types.SomeStatus _status
    ) external override {
        _bytesStructMappingCounter = _bytesStructMappingCounter + 1;
        _bytesStructMapping[_bytesStructMappingCounter] = _createBytesStruct(
            _amount,
            _someAddress,
            _data,
            _status
        );
    }

    function addBytesStructNestedMappingItem(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        Types.SomeStatus _status
    ) external override {
        _bytesStructNestedMappingCounter = _bytesStructNestedMappingCounter + 1;
        _bytesStructNestedMapping[_bytesStructNestedMappingCounter][
            msg.sender
        ] = _createBytesStruct(_amount, _someAddress, _data, _status);
    }

    function setStringStruct(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) external override onlyOwner {
        _stringStruct = _createStringStruct(_str, _thirtyTwoBytes, _isCreated);
    }

    function addStringStructArrayItem(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) external override {
        _stringStructArray.push(
            _createStringStruct(_str, _thirtyTwoBytes, _isCreated)
        );
    }

    function addStringStructMappingItem(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) external override {
        _stringStructMappingCounter = _stringStructMappingCounter + 1;
        _stringStructMapping[_stringStructMappingCounter] = _createStringStruct(
            _str,
            _thirtyTwoBytes,
            _isCreated
        );
    }

    function addStringStructNestedMappingItem(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) external override {
        _stringStructNestedMappingCounter =
            _stringStructNestedMappingCounter +
            1;
        _stringStructNestedMapping[_stringStructNestedMappingCounter][
            msg.sender
        ] = _createStringStruct(_str, _thirtyTwoBytes, _isCreated);
    }

    function setArrayStruct(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        Types.SomeStatus _status
    ) external override onlyOwner {
        _arrayStruct = _createArrayStruct(_amounts, _addresses, _status);
    }

    function addArrayStructArrayItem(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        Types.SomeStatus _status
    ) external override {
        _arrayStructArray.push(
            _createArrayStruct(_amounts, _addresses, _status)
        );
    }

    function addArrayStructMappingItem(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        Types.SomeStatus _status
    ) external override {
        _arrayStructMappingCounter = _arrayStructMappingCounter + 1;
        _arrayStructMapping[_arrayStructMappingCounter] = _createArrayStruct(
            _amounts,
            _addresses,
            _status
        );
    }

    function addArrayStructNestedMappingItem(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        Types.SomeStatus _status
    ) external override {
        _arrayStructNestedMappingCounter = _arrayStructNestedMappingCounter + 1;
        _arrayStructNestedMapping[_arrayStructNestedMappingCounter][
            msg.sender
        ] = _createArrayStruct(_amounts, _addresses, _status);
    }

    function setParentStruct(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        Types.SomeStatus _status
    ) external override onlyOwner {
        _parentStruct = _createParentStruct(
            _amount,
            _someAddress,
            _functionSignature,
            _number,
            _status
        );
    }

    function addParentStructArrayItem(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        Types.SomeStatus _status
    ) external override {
        _parentStructArray.push(
            _createParentStruct(
                _amount,
                _someAddress,
                _functionSignature,
                _number,
                _status
            )
        );
    }

    function addParentStructMappingItem(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        Types.SomeStatus _status
    ) external override {
        _parentStructMappingCounter = _parentStructMappingCounter + 1;
        _parentStructMapping[_parentStructMappingCounter] = _createParentStruct(
            _amount,
            _someAddress,
            _functionSignature,
            _number,
            _status
        );
    }

    function addParentStructNestedMappingItem(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        Types.SomeStatus _status
    ) external override {
        _parentStructNestedMappingCounter =
            _parentStructNestedMappingCounter +
            1;
        _parentStructNestedMapping[_parentStructNestedMappingCounter][
            msg.sender
        ] = _createParentStruct(
            _amount,
            _someAddress,
            _functionSignature,
            _number,
            _status
        );
    }
}
