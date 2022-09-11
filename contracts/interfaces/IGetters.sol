// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Types} from "../libraries/Types.sol";

interface IGetters {
    function getThirtyTwoBytesNumber() external view returns (uint256);

    function getSixteenBytesNumber() external view returns (uint128);

    function getEightBytesNumber() external view returns (uint64);

    function getFourBytesNumber() external view returns (uint32);

    function getTwoBytesNumber() external view returns (uint16);

    function getOneByteNumber() external view returns (uint8);

    function getDeployerAddress() external view returns (address);

    function getPayableAddress() external view returns (address payable);

    function getIsDeployed() external view returns (bool);

    function getIsNotDeployed() external view returns (bool);

    function getFunctionSignature() external view returns (bytes4);

    function getEightBytes() external view returns (bytes8);

    function getSixteenBytes() external view returns (bytes16);

    function getThirtyTwoBytes() external view returns (bytes32);

    function getDeployerNickname() external view returns (string memory);

    function getData() external view returns (bytes memory);

    function getFixedSizeArray() external view returns (uint256[6] memory);

    function getThirtyTwoBytesNumberArrayLength()
        external
        view
        returns (uint256);

    function getThirtyTwoBytesNumberArrayItem(uint256 id)
        external
        view
        returns (uint256);

    function getSixteenBytesNumberArrayLength() external view returns (uint256);

    function getSixteenBytesNumberArrayItem(uint256 id)
        external
        view
        returns (uint256);

    function getAddressArrayLength() external view returns (uint256);

    function getAddressArrayItem(uint256 id) external view returns (address);

    function getStringArrayLength() external view returns (uint256);

    function getStringArrayItem(uint256 id)
        external
        view
        returns (string memory);

    function getBoolArrayLength() external view returns (uint256);

    function getBoolArrayItem(uint256 id) external view returns (bool);

    function getDefaultMappingCounter() external view returns (uint256);

    function getDefaultMappingItem(uint256 id) external view returns (address);

    function getNestedMappingCounter() external view returns (uint256);

    function getNestedMappingItem(uint256 id, address _address)
        external
        view
        returns (bool);

    function getOneStorageSlotStruct()
        external
        view
        returns (Types.OneStorageSlotStruct memory);

    function getOneStorageSlotStructArrayLength()
        external
        view
        returns (uint256);

    function getOneStorageSlotStructArrayItem(uint256 id)
        external
        view
        returns (Types.OneStorageSlotStruct memory);

    function getOneStorageSlotStructMappingCounter()
        external
        view
        returns (uint256);

    function getOneStorageSlotStructMappingItem(uint256 id)
        external
        view
        returns (Types.OneStorageSlotStruct memory);

    function getOneStorageSlotStructNestedMappingCounter()
        external
        view
        returns (uint256);

    function getOneStorageSlotStructNestedItem(uint256 id, address _address)
        external
        view
        returns (Types.OneStorageSlotStruct memory);

    function getBytesStruct() external view returns (Types.BytesStruct memory);

    function getBytesStructArrayLength() external view returns (uint256);

    function getBytesStructArrayItem(uint256 id)
        external
        view
        returns (Types.BytesStruct memory);

    function getBytesStructMappingCounter() external view returns (uint256);

    function getBytesStructMappingItem(uint256 id)
        external
        view
        returns (Types.BytesStruct memory);

    function getBytesStructNestedMappingCounter()
        external
        view
        returns (uint256);

    function getBytesStructNestedItem(uint256 id, address _address)
        external
        view
        returns (Types.BytesStruct memory);

    function getStringStruct()
        external
        view
        returns (Types.StringStruct memory);

    function getStringStructArrayLength() external view returns (uint256);

    function getStringStructArrayItem(uint256 id)
        external
        view
        returns (Types.StringStruct memory);

    function getStringStructMappingCounter() external view returns (uint256);

    function getStringStructMappingItem(uint256 id)
        external
        view
        returns (Types.StringStruct memory);

    function getStringStructNestedMappingCounter()
        external
        view
        returns (uint256);

    function getStringStructNestedItem(uint256 id, address _address)
        external
        view
        returns (Types.StringStruct memory);

    function getArrayStruct() external view returns (Types.ArrayStruct memory);

    function getArrayStructArrayLength() external view returns (uint256);

    function getArrayStructArrayItem(uint256 id)
        external
        view
        returns (Types.ArrayStruct memory);

    function getArrayStructMappingCounter() external view returns (uint256);

    function getArrayStructMappingItem(uint256 id)
        external
        view
        returns (Types.ArrayStruct memory);

    function getArrayStructNestedMappingCounter()
        external
        view
        returns (uint256);

    function getArrayStructNestedItem(uint256 id, address _address)
        external
        view
        returns (Types.ArrayStruct memory);

    function getParentStruct()
        external
        view
        returns (Types.ParentStruct memory);

    function getParentStructArrayLength() external view returns (uint256);

    function getParentStructArrayItem(uint256 id)
        external
        view
        returns (Types.ParentStruct memory);

    function getParentStructMappingCounter() external view returns (uint256);

    function getParentStructMappingItem(uint256 id)
        external
        view
        returns (Types.ParentStruct memory);

    function getParentStructNestedMappingCounter()
        external
        view
        returns (uint256);

    function getParentStructNestedItem(uint256 id, address _address)
        external
        view
        returns (Types.ParentStruct memory);
}
