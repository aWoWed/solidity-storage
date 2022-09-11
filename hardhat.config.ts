import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';
import '@typechain/hardhat';
import 'solidity-coverage';

import {
  getEnvVariables,
  getForkNetworkConfig,
  getHardhatNetworkConfig,
  getNetworkConfig,
} from './config';
import './tasks';

dotenv.config();

const {
  FORKING_NETWORK,
  ARBISCAN_API_KEY,
  BSCSCAN_API_KEY,
  ETHERSCAN_API_KEY,
  FANTOMSCAN_API_KEY,
  OPTIMISM_API_KEY,
  POLYGONSCAN_API_KEY,
  SNOWTRACE_API_KEY,
} = getEnvVariables();

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  etherscan: {
    apiKey: {
      arbitrumOne: ARBISCAN_API_KEY,
      avalanche: SNOWTRACE_API_KEY,
      avalancheFujiTestnet: SNOWTRACE_API_KEY,
      bsc: BSCSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
      opera: FANTOMSCAN_API_KEY,
      ftmTestnet: FANTOMSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      mainnet: ETHERSCAN_API_KEY,
      optimisticEthereum: OPTIMISM_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'rinkeby',
        chainId: 4,
        urls: {
          apiURL: 'https://api-rinkeby.etherscan.io/api',
          browserURL: 'https://rinkeby.etherscan.io',
        },
      },
    ],
  },
  gasReporter: {
    currency: 'USD',
    enabled: true,
    excludeContracts: [],
    src: './contracts',
  },
  networks: {
    hardhat: FORKING_NETWORK
      ? getForkNetworkConfig(FORKING_NETWORK)
      : getHardhatNetworkConfig(),
    arbitrum: getNetworkConfig('arbitrum'),
    avalanche: getNetworkConfig('avalanche'),
    avalanch_fuji: getNetworkConfig('avalanche_fuji'),
    bsc: getNetworkConfig('bsc'),
    bsc_testnet: getNetworkConfig('bsc_testnet'),
    goerli: getNetworkConfig('goerli'),
    fantom: getNetworkConfig('fantom'),
    fantom_testnet: getNetworkConfig('fantom_testnet'),
    ethereum: getNetworkConfig('ethereum'),
    optimism: getNetworkConfig('optimism'),
    polygon: getNetworkConfig('polygon'),
    polygon_mumbai: getNetworkConfig('polygon_mumbai'),
    ultron: getNetworkConfig('ultron'),
    ultron_testnet: getNetworkConfig('ultron_testnet'),
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  solidity: {
    compilers: [
      {
        version: '0.8.13',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};

export default config;
