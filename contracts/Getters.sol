// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ChildContract.sol";
import "./Types.sol";

contract Getters is ChildContract, Types {
    uint256 internal constant _CONST_NUMBER = 100;

    uint256 internal _thirtyTwoBytesNumber = 5556;
    uint128 internal _sixteenBytesNumber = 13267176253;
    uint64 internal _eightBytesNumber = 4736;
    uint32 internal _fourBytesNumber = 1078;
    uint16 internal _twoBytesNumber = 532;
    uint8 internal _oneByteNumber = 15;

    address internal _deployerAddress; // 20 bytes
    address payable internal _payableAddress; // 20 bytes
    bool internal _isDeployed = true;
    bool internal _isNotDeployed;

    bytes4 internal _functionSignature =
        bytes4(keccak256(bytes("transfer(address,uint256)")));
    bytes8 internal _eightBytes = "8 bytes";
    bytes16 internal _sixteenBytes = "16 bytes";
    bytes32 internal _thirtyTwoBytes = "32 bytes";
    string internal _deployerNickname;
    bytes internal _data;

    uint256[6] internal _fixedSizeArray = [1, 2, 3, 4, 5, 6];
    uint256[] internal _thirtyTwoBytesNumberArray;
    uint128[] internal _sixteenBytesNumberArray;
    address[] internal _addressesArray;
    string[] internal _stringArray;
    bool[] internal _boolArray;

    uint256 internal _defaultMappingCounter;
    mapping(uint256 => address) internal _defaultMapping;
    uint256 internal _nestedMappingCounter;
    mapping(uint256 => mapping(address => bool)) internal _nestedMapping;

    OneStorageSlotStruct internal _oneStorageSlotStruct;
    OneStorageSlotStruct[] internal _oneStorageSlotStructArray;
    uint256 internal _oneStorageSlotStructMappingCounter;
    mapping(uint256 => OneStorageSlotStruct)
        internal _oneStorageSlotStructMapping;
    uint256 internal _oneStorageSlotStructNestedMappingCounter;
    mapping(uint256 => mapping(address => OneStorageSlotStruct))
        internal _oneStorageSlotStructNestedMapping;

    BytesStruct internal _bytesStruct;
    BytesStruct[] internal _bytesStructArray;
    uint256 internal _bytesStructMappingCounter;
    mapping(uint256 => BytesStruct) internal _bytesStructMapping;
    uint256 internal _bytesStructNestedMappingCounter;
    mapping(uint256 => mapping(address => BytesStruct))
        internal _bytesStructNestedMapping;

    StringStruct internal _stringStruct;
    StringStruct[] internal _stringStructArray;
    uint256 internal _stringStructMappingCounter;
    mapping(uint256 => StringStruct) internal _stringStructMapping;
    uint256 internal _stringStructNestedMappingCounter;
    mapping(uint256 => mapping(address => StringStruct))
        internal _stringStructNestedMapping;

    ArrayStruct internal _arrayStruct;
    ArrayStruct[] internal _arrayStructArray;
    uint256 internal _arrayStructMappingCounter;
    mapping(uint256 => ArrayStruct) internal _arrayStructMapping;
    uint256 internal _arrayStructNestedMappingCounter;
    mapping(uint256 => mapping(address => ArrayStruct))
        internal _arrayStructNestedMapping;

    ParentStruct internal _parentStruct;
    ParentStruct[] internal _parentStructArray;
    uint256 internal _parentStructMappingCounter;
    mapping(uint256 => ParentStruct) internal _parentStructMapping;
    uint256 internal _parentStructNestedMappingCounter;
    mapping(uint256 => mapping(address => ParentStruct))
        internal _parentStructNestedMapping;

    function getThirtyTwoBytesNumber() public view returns (uint256) {
        return _thirtyTwoBytesNumber;
    }

    function getSixteenBytesNumber() public view returns (uint128) {
        return _sixteenBytesNumber;
    }

    function getEightBytesNumber() public view returns (uint64) {
        return _eightBytesNumber;
    }

    function getFourBytesNumber() public view returns (uint32) {
        return _fourBytesNumber;
    }

    function getTwoBytesNumber() public view returns (uint16) {
        return _twoBytesNumber;
    }

    function getOneByteNumber() public view returns (uint8) {
        return _oneByteNumber;
    }

    function getDeployerAddress() public view returns (address) {
        return _deployerAddress;
    }

    function getPayableAddress() public view returns (address payable) {
        return _payableAddress;
    }

    function getIsDeployed() public view returns (bool) {
        return _isDeployed;
    }

    function getIsNotDeployed() public view returns (bool) {
        return _isNotDeployed;
    }

    function getFunctionSignature() public view returns (bytes4) {
        return _functionSignature;
    }

    function getEightBytes() public view returns (bytes8) {
        return _eightBytes;
    }

    function getSixteenBytes() public view returns (bytes16) {
        return _sixteenBytes;
    }

    function getThirtyTwoBytes() public view returns (bytes32) {
        return _thirtyTwoBytes;
    }

    function getDeployerNickname() public view returns (string memory) {
        return _deployerNickname;
    }

    function getData() public view returns (bytes memory) {
        return _data;
    }

    function getFixedSizeArray() public view returns (uint256[6] memory) {
        return _fixedSizeArray;
    }

    function getThirtyTwoBytesNumberArrayLength()
        public
        view
        returns (uint256)
    {
        return _thirtyTwoBytesNumberArray.length;
    }

    function getThirtyTwoBytesNumberArrayItem(uint256 id)
        public
        view
        returns (uint256)
    {
        return _thirtyTwoBytesNumberArray[id];
    }

    function getSixteenBytesNumberArrayLength() public view returns (uint256) {
        return _sixteenBytesNumberArray.length;
    }

    function getSixteenBytesNumberArrayItem(uint256 id)
        public
        view
        returns (uint256)
    {
        return _sixteenBytesNumberArray[id];
    }

    function getAddressArrayLength() public view returns (uint256) {
        return _addressesArray.length;
    }

    function getAddressArrayItem(uint256 id) public view returns (address) {
        return _addressesArray[id];
    }

    function getStringArrayLength() public view returns (uint256) {
        return _stringArray.length;
    }

    function getStringArrayItem(uint256 id)
        public
        view
        returns (string memory)
    {
        return _stringArray[id];
    }

    function getBoolArrayLength() public view returns (uint256) {
        return _boolArray.length;
    }

    function getBoolArrayItem(uint256 id) public view returns (bool) {
        return _boolArray[id];
    }

    function getDefaultMappingCounter() public view returns (uint256) {
        return _defaultMappingCounter;
    }

    function getDefaultMappingItem(uint256 id) public view returns (address) {
        return _defaultMapping[id];
    }

    function getNestedMappingCounter() public view returns (uint256) {
        return _nestedMappingCounter;
    }

    function getNestedMappingItem(uint256 id, address _address)
        public
        view
        returns (bool)
    {
        return _nestedMapping[id][_address];
    }

    function getOneStorageSlotStruct()
        public
        view
        returns (OneStorageSlotStruct memory)
    {
        return _oneStorageSlotStruct;
    }

    function getOneStorageSlotStructArrayLength()
        public
        view
        returns (uint256)
    {
        return _oneStorageSlotStructArray.length;
    }

    function getOneStorageSlotStructArrayItem(uint256 id)
        public
        view
        returns (OneStorageSlotStruct memory)
    {
        return _oneStorageSlotStructArray[id];
    }

    function getOneStorageSlotStructMappingCounter()
        public
        view
        returns (uint256)
    {
        return _oneStorageSlotStructMappingCounter;
    }

    function getOneStorageSlotStructMappingItem(uint256 id)
        public
        view
        returns (OneStorageSlotStruct memory)
    {
        return _oneStorageSlotStructMapping[id];
    }

    function getOneStorageSlotStructNestedMappingCounter()
        public
        view
        returns (uint256)
    {
        return _oneStorageSlotStructNestedMappingCounter;
    }

    function getOneStorageSlotStructNestedItem(uint256 id, address _address)
        public
        view
        returns (OneStorageSlotStruct memory)
    {
        return _oneStorageSlotStructNestedMapping[id][_address];
    }

    function getBytesStruct() public view returns (BytesStruct memory) {
        return _bytesStruct;
    }

    function getBytesStructArrayLength() public view returns (uint256) {
        return _bytesStructArray.length;
    }

    function getBytesStructArrayItem(uint256 id)
        public
        view
        returns (BytesStruct memory)
    {
        return _bytesStructArray[id];
    }

    function getBytesStructMappingCounter() public view returns (uint256) {
        return _bytesStructMappingCounter;
    }

    function getBytesStructMappingItem(uint256 id)
        public
        view
        returns (BytesStruct memory)
    {
        return _bytesStructMapping[id];
    }

    function getBytesStructNestedMappingCounter()
        public
        view
        returns (uint256)
    {
        return _bytesStructNestedMappingCounter;
    }

    function getBytesStructNestedItem(uint256 id, address _address)
        public
        view
        returns (BytesStruct memory)
    {
        return _bytesStructNestedMapping[id][_address];
    }

    function getStringStruct() public view returns (StringStruct memory) {
        return _stringStruct;
    }

    function getStringStructArrayLength() public view returns (uint256) {
        return _stringStructArray.length;
    }

    function getStringStructArrayItem(uint256 id)
        public
        view
        returns (StringStruct memory)
    {
        return _stringStructArray[id];
    }

    function getStringStructMappingCounter() public view returns (uint256) {
        return _stringStructMappingCounter;
    }

    function getStringStructMappingItem(uint256 id)
        public
        view
        returns (StringStruct memory)
    {
        return _stringStructMapping[id];
    }

    function getStringStructNestedMappingCounter()
        public
        view
        returns (uint256)
    {
        return _stringStructNestedMappingCounter;
    }

    function getStringStructNestedItem(uint256 id, address _address)
        public
        view
        returns (StringStruct memory)
    {
        return _stringStructNestedMapping[id][_address];
    }

    function getArrayStruct() public view returns (ArrayStruct memory) {
        return _arrayStruct;
    }

    function getArrayStructArrayLength() public view returns (uint256) {
        return _arrayStructArray.length;
    }

    function getArrayStructArrayItem(uint256 id)
        public
        view
        returns (ArrayStruct memory)
    {
        return _arrayStructArray[id];
    }

    function getArrayStructMappingCounter() public view returns (uint256) {
        return _arrayStructMappingCounter;
    }

    function getArrayStructMappingItem(uint256 id)
        public
        view
        returns (ArrayStruct memory)
    {
        return _arrayStructMapping[id];
    }

    function getArrayStructNestedMappingCounter()
        public
        view
        returns (uint256)
    {
        return _arrayStructNestedMappingCounter;
    }

    function getArrayStructNestedItem(uint256 id, address _address)
        public
        view
        returns (ArrayStruct memory)
    {
        return _arrayStructNestedMapping[id][_address];
    }

    function getParentStruct() public view returns (ParentStruct memory) {
        return _parentStruct;
    }

    function getParentStructArrayLength() public view returns (uint256) {
        return _parentStructArray.length;
    }

    function getParentStructArrayItem(uint256 id)
        public
        view
        returns (ParentStruct memory)
    {
        return _parentStructArray[id];
    }

    function getParentStructMappingCounter() public view returns (uint256) {
        return _parentStructMappingCounter;
    }

    function getParentStructMappingItem(uint256 id)
        public
        view
        returns (ParentStruct memory)
    {
        return _parentStructMapping[id];
    }

    function getParentStructNestedMappingCounter()
        public
        view
        returns (uint256)
    {
        return _parentStructNestedMappingCounter;
    }

    function getParentStructNestedItem(uint256 id, address _address)
        public
        view
        returns (ParentStruct memory)
    {
        return _parentStructNestedMapping[id][_address];
    }
}
