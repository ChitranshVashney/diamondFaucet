require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const privateKey = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.20",
  networks: {
    bsctestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: "Y4K2D5QG3VP45VJD32FSP75XQHXFWEIXB6",
    },
  },
};
