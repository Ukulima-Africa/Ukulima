// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IProxyInitialize {
  function initialize(string calldata name, string calldata symbol, uint8 decimals, uint256 amount, bool mintable, address owner) external;
}
