// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Getters.sol";
import "./ownable/Ownable.sol";

contract Setters is Getters, Ownable {
    function setData(bytes calldata data) external onlyOwner {
        _data = data;
    }

    function addThirtyTwoBytesNumberArrayItem(uint256 item) public {
        _thirtyTwoBytesNumberArray.push(item);
    }

    function addSixteenBytesNumberArrayItem(uint128 item) public {
        _sixteenBytesNumberArray.push(item);
    }

    function addAddressesArrayItem(address item) public {
        _addressesArray.push(item);
    }

    function addStringArrayItem(string calldata item) public {
        _stringArray.push(item);
    }

    function addBoolArrayItem(bool item) public {
        _boolArray.push(item);
    }

    function addDefaultMappingItem(address item) public {
        _defaultMappingCounter = _defaultMappingCounter + 1;
        _defaultMapping[_defaultMappingCounter] = item;
    }

    function addNestedMappingItem(bool item) public {
        _nestedMappingCounter = _nestedMappingCounter + 1;
        _nestedMapping[_nestedMappingCounter][msg.sender] = item;
    }

    function _createOneStorageSlotStruct(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        SomeStatus _status
    ) internal pure returns (OneStorageSlotStruct memory newStruct) {
        newStruct = OneStorageSlotStruct({
            oneByteNumber: _oneByteNumber,
            eightBytesNumber: _eightBytesNumber,
            status: _status
        });
    }

    function _createBytesStruct(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        SomeStatus _status
    ) internal pure returns (BytesStruct memory newStruct) {
        newStruct = BytesStruct({
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
    ) internal pure returns (StringStruct memory newStruct) {
        newStruct = StringStruct({
            str: _str,
            thirtyTwoBytes: _thirtyTwoBytes,
            isCreated: _isCreated
        });
    }

    function _createArrayStruct(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        SomeStatus _status
    ) internal pure returns (ArrayStruct memory newStruct) {
        newStruct = ArrayStruct({
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
        SomeStatus _status
    ) internal pure returns (ParentStruct memory newStruct) {
        ChildStruct memory _childStruct = ChildStruct({
            amount: _amount,
            someAddress: _someAddress,
            functionSignature: _functionSignature
        });

        newStruct = ParentStruct({
            childStruct: _childStruct,
            number: _number,
            status: _status
        });
    }

    function setOneStorageSlotStructArray(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        SomeStatus _status
    ) external onlyOwner {
        _oneStorageSlotStruct = _createOneStorageSlotStruct(
            _oneByteNumber,
            _eightBytesNumber,
            _status
        );
    }

    function addOneStorageSlotStructArrayItem(
        uint8 _oneByteNumber,
        uint64 _eightBytesNumber,
        SomeStatus _status
    ) public {
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
        SomeStatus _status
    ) public {
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
        SomeStatus _status
    ) public {
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

    function setBytesStructArray(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        SomeStatus _status
    ) external onlyOwner {
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
        SomeStatus _status
    ) public {
        _bytesStructArray.push(
            _createBytesStruct(_amount, _someAddress, _data, _status)
        );
    }

    function addBytesStructMappingItem(
        uint256 _amount,
        address _someAddress,
        bytes calldata _data,
        SomeStatus _status
    ) public {
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
        SomeStatus _status
    ) public {
        _bytesStructNestedMappingCounter = _bytesStructNestedMappingCounter + 1;
        _bytesStructNestedMapping[_bytesStructNestedMappingCounter][
            msg.sender
        ] = _createBytesStruct(_amount, _someAddress, _data, _status);
    }

    function setStringStructArray(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) external onlyOwner {
        _stringStruct = _createStringStruct(_str, _thirtyTwoBytes, _isCreated);
    }

    function addStringStructArrayItem(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) public {
        _stringStructArray.push(
            _createStringStruct(_str, _thirtyTwoBytes, _isCreated)
        );
    }

    function addStringStructMappingItem(
        string calldata _str,
        bytes32 _thirtyTwoBytes,
        bool _isCreated
    ) public {
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
    ) public {
        _stringStructNestedMappingCounter =
            _stringStructNestedMappingCounter +
            1;
        _stringStructNestedMapping[_stringStructNestedMappingCounter][
            msg.sender
        ] = _createStringStruct(_str, _thirtyTwoBytes, _isCreated);
    }

    function setArrayStructArray(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        SomeStatus _status
    ) external onlyOwner {
        _arrayStruct = _createArrayStruct(_amounts, _addresses, _status);
    }

    function addArrayStructArrayItem(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        SomeStatus _status
    ) public {
        _arrayStructArray.push(
            _createArrayStruct(_amounts, _addresses, _status)
        );
    }

    function addArrayStructMappingItem(
        uint256[] calldata _amounts,
        address[] calldata _addresses,
        SomeStatus _status
    ) public {
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
        SomeStatus _status
    ) public {
        _arrayStructNestedMappingCounter = _arrayStructNestedMappingCounter + 1;
        _arrayStructNestedMapping[_arrayStructNestedMappingCounter][
            msg.sender
        ] = _createArrayStruct(_amounts, _addresses, _status);
    }

    function setParentStructParent(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        SomeStatus _status
    ) external onlyOwner {
        _parentStruct = _createParentStruct(
            _amount,
            _someAddress,
            _functionSignature,
            _number,
            _status
        );
    }

    function addParentStructParentItem(
        uint256 _amount,
        address _someAddress,
        bytes4 _functionSignature,
        uint256 _number,
        SomeStatus _status
    ) public {
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
        SomeStatus _status
    ) public {
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
        SomeStatus _status
    ) public {
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
