// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./interfaces/IChildContract.sol";

contract ChildContract is IChildContract {
    uint256 public override childNumber = 3287423874;
}
