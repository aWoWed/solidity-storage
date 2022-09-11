// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Types {
    enum SomeStatus {
        NotCreated,
        Canceled,
        Active,
        Executed
    }

    struct OneStorageSlotStruct {
        uint8 oneByteNumber;
        uint64 eightBytesNumber;
        SomeStatus status;
    }

    struct BytesStruct {
        uint256 amount;
        address someAddress;
        bytes data;
        SomeStatus status;
    }

    struct StringStruct {
        string str;
        bytes32 thirtyTwoBytes;
        bool isCreated;
    }

    struct ArrayStruct {
        address[] addresses;
        uint256[] amounts;
        SomeStatus status;
    }

    struct ChildStruct {
        uint256 amount;
        address someAddress;
        bytes4 functionSignature;
    }

    struct ParentStruct {
        ChildStruct childStruct;
        uint256 number;
        SomeStatus status;
    }
}
