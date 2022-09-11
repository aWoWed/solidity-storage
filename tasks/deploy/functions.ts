import colors from 'colors';
import { BigNumber } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

export const logDeployment = (
  contractName: string,
  ...args: [string, unknown][]
): void => {
  console.log(
    colors.bold(colors.green(`${contractName} successfully deployed:`)),
  );
  args.forEach(([key, value]) =>
    console.log(colors.bold(colors.yellow(`${key}:`)), `"${value}"`),
  );
};

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const preAction = (hre: HardhatRuntimeEnvironment): Promise<void> =>
  hre.run('clean').then(() => hre.run('compile'));

export const toHex = (
  hre: HardhatRuntimeEnvironment,
  covertThis: number | bigint | string | BigNumber,
  padding: number,
) => hre.ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(covertThis), padding);
