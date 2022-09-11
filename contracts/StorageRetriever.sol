// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Setters.sol";

contract StorageRetriever is Setters {
    constructor(string memory deployerNickname) {
        _deployerAddress = msg.sender;
        _payableAddress = payable(msg.sender);
        _deployerNickname = deployerNickname;
        _data = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    }
}
