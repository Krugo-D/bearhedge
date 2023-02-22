require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_URL } = process.env;
const { MNEMONIC } = process.env;

/** @type import('hardhat/config').HardhatUserConfig. */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    goerliArbitrum: {
      url: ALCHEMY_URL,
      accounts: { mnemonic: MNEMONIC },
    },
  },
};
