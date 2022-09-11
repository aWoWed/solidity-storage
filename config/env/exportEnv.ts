import { EnvVariables } from './types';

export const getEnvVariables = (): EnvVariables => ({
  INFURA_API_KEY: process.env.INFURA_API_KEY || '',
  MNEMONIC: process.env.MNEMONIC || '',
  MNEMONIC_DEV:
    process.env.MNEMONIC_DEV ||
    'story lemon benefit fix decline axis purchase ribbon tattoo aim suggest diagram',
  FORKING_NETWORK: process.env.FORKING_NETWORK || '',
  ARBISCAN_API_KEY: process.env.ARBISCAN_API_KEY || '',
  BSCSCAN_API_KEY: process.env.BSCSCAN_API_KEY || '',
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY || '',
  FANTOMSCAN_API_KEY: process.env.FANTOMSCAN_API_KEY || '',
  OPTIMISM_API_KEY: process.env.OPTIMISM_API_KEY || '',
  POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY || '',
  SNOWTRACE_API_KEY: process.env.SNOWTRACE_API_KEY || '',
});
