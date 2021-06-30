/* global task ethers */
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require('./node_modules/hardhat-contract-sizer');
require('./node_modules/solidity-coverage');
require('dotenv').config();

const {
  mnemonic
} = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("Accounts", "Prints a list of Accounts", async () => {
  const accounts = await ethers.getSigners();
  console.log('accounts', accounts);
  // eslint-disable-next-line no-restricted-syntax
  for (const account of accounts) {
    // eslint-disable-next-line no-await-in-loop
    console.log(await account.getAddress());
  }
})
/**
 * @type import('hardhat/config').HardhatUserConfig
 * You have to export an object to set up your config
 * This object can have the following optional entries:
 * defaultNetwork, networks, solc, and paths.
 * Go to https://buidler.dev/config/ to learn more
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      blockGasLimit: 1350000000,
      gas: 1300000000
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic}
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic}
    },
    matic: {
      url: 'https://rpc-mainnet.matic.network',
      accounts: {mnemonic},
      blockGasLimit: 20000000,
      gasPrice: 1000000000
    },
    mumbai: {
      url: 'https://rpc-mumbai.matic.today',
      accounts: {mnemonic},
      blockGasLimit: 20000000,
      gasPrice: 1000000000
    },
    kovan: {
      url: 'https://kovan.infura.io/',
      accounts: {mnemonic},
      gasPrice: 5000000000
    },
    rinkeby: {
      url: 'https://eth-mainnet.alchemyapi.io/v2/123abc123abc123abc123abc123abcde',
      accounts: {mnemonic},
    }
  },
  solidity: {
    version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: false
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: false
  }
}
