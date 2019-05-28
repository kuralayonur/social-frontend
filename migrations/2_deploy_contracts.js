var Social = artifacts.require("../contracts/Social.sol");

module.exports =  function(deployer) {
  deployer.deploy(Social);
};
