require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_URL } = process.env;
const { MNEMONIC } = process.env;

/** @type import('hardhat/config').HardhatUserConfig. */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_URL,
      },
    },
  },
};
