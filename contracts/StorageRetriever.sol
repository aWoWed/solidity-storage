// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Getters.sol";
import "./Setters.sol";
import "./interfaces/IStorageRetriever.sol";

contract StorageRetriever is Getters, Setters, IStorageRetriever {
    constructor(string memory deployerNickname) {
        _deployerAddress = msg.sender;
        _payableAddress = payable(msg.sender);
        _deployerNickname = deployerNickname;
        _data = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    }
}
