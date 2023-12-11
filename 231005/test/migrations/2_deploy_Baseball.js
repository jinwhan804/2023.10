const Baseball = artifacts.require("Baseball");

module.exports = (deployer)=>{
    deployer.deploy(Baseball);
}