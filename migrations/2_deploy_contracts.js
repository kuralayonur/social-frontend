var Users = artifacts.require("./Users.sol");

export default function(deployer) {
  deployer.deploy(Users);
};
