// "0xff58342a0ac3fB6Aeb679c8D397F1805ba90151b" is the address of the account you want to check the balance of
// This script is run with `npx hardhat run scripts/test.js`
const hre = require("hardhat");

async function main() {
  var balance = await hre.ethers.provider.getBalance(
    "0x5ceBbdD7BA6820ff6cC0fEab04543EdfDDECf2D7"
  );
  // balance is a BigNumber (in wei); format is as a sting (in ether)
  console.log(hre.ethers.utils.formatEther(balance));
}

main();
