// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // Deploy Crowdsale
  const [owner] = await ethers.getSigners();

  const rate = 1;
  const wallet = owner.address;
  const token = "0x95401dc811bb5740090279Ba06cfA8fcF6113778";

  const Crowdsale = await hre.ethers.getContractFactory("MintedCrowdsale");
  const crowdsale = await Crowdsale.deploy(rate, wallet, token);
  await crowdsale.deployed();
  console.log("Crowdsale deployed to:", crowdsale.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
