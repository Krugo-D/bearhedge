// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // Deploy BEARHEDGE_Token
  const Bearhedge = await hre.ethers.getContractFactory("BEARHEDGE_Token");
  const bearhedge = await Bearhedge.deploy();
  await bearhedge.deployed();
  console.log("Bearhedge deployed to:", bearhedge.address);

  // Deploy Crowdsale
  const [owner] = await ethers.getSigners();
  const rate = 1;
  const wallet = owner.address;
  const token = bearhedge.address;

  const Crowdsale = await hre.ethers.getContractFactory("Crowdsale");
  const crowdsale = await Crowdsale.deploy(rate, wallet, token);
  await crowdsale.deployed();
  console.log("Crowdsale deployed to:", crowdsale.address);

  // Add liquidity to Uniswap
  const router = await hre.ethers.getContractAt(
    "IDexRouter",
    "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
  );

  // Add half of total supply + 100 ETH to liquidity
  await bearhedge.approve(router.address, hre.ethers.constants.MaxUint256);
  const deadline = Math.floor(Date.now() / 1000);
  await router.addLiquidityETH(
    bearhedge.address,
    500000000000000000000n,
    0,
    0,
    bearhedge.address,
    deadline,
    { value: 100000000000000000000n }
  );
  console.log("Liquidity added to Uniswap");

  // Approve crowdsale contract to take tokens from owner
  await bearhedge.approve(crowdsale.address, hre.ethers.constants.MaxUint256);

  // Exclude crowdsale contract from fees, limits, max wallet and dividends
  await bearhedge.setIsFeeExempt(crowdsale.address, true);
  await bearhedge.setIsLimitExempt(crowdsale.address, true);
  await bearhedge.setIsWalletExempt(crowdsale.address, true);
  await bearhedge.setIsDividendExempt(crowdsale.address, true);
  console.log(
    "Crowdsale contract excluded from fees, limits, max wallet and dividends"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
