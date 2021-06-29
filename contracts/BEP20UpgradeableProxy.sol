// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/proxy/TransparentUpgradeableProxy.sol";

contract BEP20UpgradeableProxy is TransparentUpgradeableProxy {

  constructor(address logic, address admin, bytes memory data) TransparentUpgradeableProxy(logic, admin, data) public {

  }
}
