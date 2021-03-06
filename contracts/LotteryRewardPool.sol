// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./libs/IBEP20.sol";
import "./libs/SafeBEP20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

import './MasterChef.sol';

contract LotteryRewardPool is Ownable {
  using SafeBEP20 for IBEP20;

  MasterChef public chef;
  address public adminAddress;
  address public receiver;
  IBEP20 public lptoken;
  IBEP20 public agri;

  constructor(
    MasterChef _chef,
    IBEP20 _agri,
    address _admin,
    address _receiver
  ) public {
    chef = _chef;
    agri = _agri;
    adminAddress = _admin;
    receiver = _receiver;
  }

  event StartFarming(address indexed user, uint256 indexed pid);
  event Harvest(address indexed user, uint256 indexed pid);
  event EmergencyWithdraw(address indexed user, uint256 amount);

  modifier onlyAdmin() {
    require(msg.sender == adminAddress, "admin: wut?");
    _;
  }

  function startFarming(uint256 _pid, IBEP20 _lptoken, uint256 _amount) external onlyAdmin {
    _lptoken.safeApprove(address(chef), _amount);
    chef.deposit(_pid, _amount);
    emit StartFarming(msg.sender, _pid);
  }

  function harvest(uint256 _pid) external onlyAdmin {
    chef.deposit(_pid, 0);
    uint256 balance = agri.balanceOf(address(this));
    agri.safeTransfer(receiver, balance);
    emit Harvest(msg.sender, _pid);
  }

  function setReceiver(address _receiver) external onlyAdmin {
    receiver = _receiver;
  }

  function pendingReward(uint256 _pid) external view returns (uint256) {
    return chef.pendingAgri(_pid, address(this));
  }

  // EMERGENCY ONLY.
  function emergencyWithdraw(IBEP20 _token, uint256 _amount) external onlyOwner {
    agri.safeTransfer(address(msg.sender), _amount);
    emit EmergencyWithdraw(msg.sender, _amount);
  }

  function setAdmin(address _admin) external onlyOwner {
    adminAddress = _admin;
  }

}
