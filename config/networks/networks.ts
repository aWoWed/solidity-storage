import 'dotenv/config';
import { HardhatNetworkUserConfig, NetworkUserConfig } from 'hardhat/types';

import { gwei, mwei } from './constants';
import { NetworkConfig } from './types';

import { getEnvVariables } from '../env';

const { INFURA_API_KEY, MNEMONIC, MNEMONIC_DEV } = getEnvVariables();

export const mnemonics: NetworkConfig<string> = {
  dev: MNEMONIC,
  hardhat: MNEMONIC_DEV,
};

export const chainIds: NetworkConfig<number> = {
  arbitrum: 42161,
  avalanche: 43114,
  avalanche_fuji: 433113,
  bsc: 56,
  bsc_testnet: 97,
  ethereum: 1,
  fantom: 250,
  fantom_testnet: 4002,
  goerli: 5,
  hardhat: 31337,
  local: 31337,
  optimism: 10,
  polygon: 137,
  polygon_mumbai: 80001,
  ultron: 1231,
  ultron_testnet: 1230,
};

export const gasPrices: NetworkConfig<number> = {
  arbitrum: 10 * gwei,
  avalanche: 8 * gwei,
  avalanche_fuji: 8 * gwei,
  bsc: 5 * gwei,
  bsc_testnet: 5 * gwei,
  ethereum: 10 * gwei,
  fantom: 15 * gwei,
  fantom_testnet: 10 * gwei,
  goerli: 5 * gwei,
  hardhat: 10 * gwei,
  local: 10 * gwei,
  optimism: 10 * gwei,
  polygon: 15 * gwei,
  polygon_mumbai: 15 * gwei,
  ultron: 1 * gwei,
  ultron_testnet: 1 * gwei,
};

export const rpcUrls: NetworkConfig<string> = {
  arbitrum: 'https://arb1.arbitrum.io/rpc',
  avalanche: 'https://api.avax.network/ext/bc/C/rpc',
  avalanche_fuji: 'https://api.avax-test.network/ext/bc/C/rpc',
  bsc: 'https://bsc-dataseed1.binance.org',
  bsc_testnet: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  ethereum: INFURA_API_KEY
    ? `https://eth-mainnet.alchemyapi.io/v2/${INFURA_API_KEY}`
    : `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  fantom: 'https://rpc.ftm.tools/',
  fantom_testnet: 'https://rpc.testnet.fantom.network/',
  goerli: INFURA_API_KEY
    ? `https://eth-goerli.alchemyapi.io/v2/${INFURA_API_KEY}`
    : `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
  hardhat: 'http://localhost:8545',
  optimism: 'https://mainnet.optimism.io',
  polygon: 'https://polygon-rpc.com',
  polygon_mumbai: 'https://rpc-mumbai.matic.today',
  ultron: 'https://ultron-rpc.net',
  ultron_testnet: 'https://ultron-dev.io',
};

export const gases: NetworkConfig<number | undefined> = {
  arbitrum: undefined,
  avalanche: undefined,
  avalanche_fuji: undefined,
  bsc: undefined,
  bsc_testnet: undefined,
  fantom: undefined,
  fantom_testnet: undefined,
  goerli: undefined,
  hardhat: undefined,
  ethereum: undefined,
  local: 1_250_000,
  optimism: undefined,
  polygon: undefined,
  polygon_mumbai: undefined,
  ultron: undefined,
  ultron_testnet: undefined,
};

export const timeouts: NetworkConfig<number | undefined> = {
  arbitrum: undefined,
  avalanche: undefined,
  avalanche_fuji: undefined,
  bsc: undefined,
  bsc_testnet: undefined,
  fantom: undefined,
  fantom_testnet: undefined,
  goerli: undefined,
  hardhat: undefined,
  ethereum: undefined,
  local: 999_999,
  optimism: undefined,
  polygon: undefined,
  polygon_mumbai: undefined,
  ultron: undefined,
  ultron_testnet: undefined,
};

export const blockGasLimits: NetworkConfig<number | undefined> = {
  arbitrum: undefined,
  avalanche: undefined,
  avalanche_fuji: undefined,
  bsc: undefined,
  bsc_testnet: undefined,
  fantom: undefined,
  fantom_testnet: undefined,
  goerli: undefined,
  hardhat: 300 * mwei,
  ethereum: 300 * mwei,
  local: undefined,
  optimism: undefined,
  polygon: undefined,
  polygon_mumbai: undefined,
  ultron: undefined,
  ultron_testnet: undefined,
};

export const initialBasesFeePerGas: NetworkConfig<number | undefined> = {
  arbitrum: undefined,
  avalanche: undefined,
  avalanche_fuji: undefined,
  bsc: undefined,
  bsc_testnet: undefined,
  fantom: undefined,
  fantom_testnet: undefined,
  goerli: undefined,
  hardhat: 0,
  ethereum: undefined,
  local: undefined,
  optimism: undefined,
  polygon: undefined,
  polygon_mumbai: undefined,
  ultron: undefined,
  ultron_testnet: undefined,
};

export const getBaseNetworkConfig = (network: string): NetworkUserConfig => ({
  accounts: {
    mnemonic: mnemonics.dev,
  },
  chainId: chainIds[network],
  gas: gases[network],
  gasPrice: gasPrices[network],
  blockGasLimit: blockGasLimits[network],
  timeout: timeouts[network],
  initialBaseFeePerGas: initialBasesFeePerGas[network],
});

export const getNetworkConfig = (network: string): NetworkUserConfig => ({
  ...getBaseNetworkConfig(network),
  url: rpcUrls[network],
});

export const getForkNetworkConfig = (
  network: string,
): HardhatNetworkUserConfig => ({
  ...getBaseNetworkConfig(network),
  accounts: {
    mnemonic: mnemonics.dev,
  },
  forking: {
    url: rpcUrls[network],
  },
});

export const getHardhatNetworkConfig = (): HardhatNetworkUserConfig => ({
  ...getBaseNetworkConfig('hardhat'),
  accounts: {
    mnemonic: mnemonics.hardhat,
  },
});
