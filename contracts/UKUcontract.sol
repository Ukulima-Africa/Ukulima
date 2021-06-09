pragma solidity ^0.7.6;

import "hardhat/console.sol";

// Import Ownable from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/access/Ownable.sol";

contract UKUcontract is Ownable {

  string greeting;
  uint256 private value;

  event GreetingChanged(string _greeting);
  event ValueChanged(uint256 newValue);

  constructor(string memory _greeting) {
    console.log("Deploying UKUcontract with message:", _greeting);
    greeting = _greeting;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    emit GreetingChanged(_greeting);
    greeting = _greeting;
  }

    // The onlyOwner modifier restricts who can call the store function
    function store(uint256 newValue) public onlyOwner {
        value = newValue;
        emit ValueChanged(newValue);
    }

    function retrieve() public view returns (uint256) {
        return value;
    }
}
