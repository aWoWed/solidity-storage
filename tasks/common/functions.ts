import colors from 'colors';
import { BigNumber } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

import {
  ArrayStruct,
  BytesStruct,
  OneStorageSlotStruct,
  ParentStruct,
  SomeStatus,
  StringStruct,
} from './types';

export const logDeployment = (
  contractName: string,
  ...args: [string, unknown][]
): void => {
  console.log(
    colors.bold(colors.green(`${contractName} successfully deployed:`)),
  );
  args.forEach(([key, value]) =>
    console.log(colors.bold(colors.yellow(`${key}:`)), `${value}`),
  );
};

export const logGetter = (variable: string, value: any): void => {
  console.log(colors.bold(colors.green(`${variable}:`)), `${value}`);
};

export const logSlot = (variable: string, value: any): void => {
  console.log(colors.bold(colors.yellow(`${variable}:`)), `${value}`);
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

export const convertToString = (variable: string): string => {
  let result = '';
  for (let i = 0; i < variable.length; i += 2) {
    const substr: number = Number.parseInt(variable.slice(i, i + 2), 16);
    result += String.fromCharCode(substr);
  }
  return result;
};

export const getBytesData = async (
  hre: HardhatRuntimeEnvironment,
  length: number,
  address: string,
  bytesKey: BigNumber,
): Promise<string> => {
  let result = '0x';
  for (let i = 0; i < Math.round(length / 64); i++) {
    const elem: string = await hre.ethers.provider.getStorageAt(
      address,
      bytesKey.add(i),
    );
    const str: string = elem.slice(2, elem.length);
    result += str;
  }
  logSlot(`Concatinated Bytes`, result);
  return result;
};

export const getKeyPreimage = (
  hre: HardhatRuntimeEnvironment,
  index: any,
): BigNumber => {
  const newKey = hre.ethers.utils.keccak256(toHex(hre, index, 32));
  console.log('New Key:', newKey);
  return BigNumber.from(newKey);
};

export const getMappingKeyPreimage = (
  hre: HardhatRuntimeEnvironment,
  key: BigNumber,
  storageSlot: BigNumber,
): BigNumber => {
  // The pre-image used to compute the Storage location
  const newKeyPreimage = hre.ethers.utils.concat([
    // Mappings' keys in Solidity must all be word-aligned (32 bytes)
    hre.ethers.utils.hexZeroPad(key.toHexString(), 32),

    // Similarly with the slot-index into the Solidity variable layout
    hre.ethers.utils.hexZeroPad(storageSlot.toHexString(), 32),
  ]);

  console.log('New Key Preimage:', hre.ethers.utils.hexlify(newKeyPreimage));
  // "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000004"

  const newKey = hre.ethers.utils.keccak256(newKeyPreimage);
  console.log('New Key:', newKey);

  return BigNumber.from(newKey);
};

export const getNestedMappingKeyPreimage = (
  hre: HardhatRuntimeEnvironment,
  key0: BigNumber,
  storageSlot: BigNumber,
  key1: BigNumber,
): BigNumber => {
  const newKey = getMappingKeyPreimage(hre, key0, storageSlot);
  const nestedNewKey = getMappingKeyPreimage(hre, key1, newKey);
  return nestedNewKey;
};

export const getOneStorageStruct = (
  oneStorageSlotStructFromStorage: string,
): OneStorageSlotStruct => {
  const oneByteNumber: number = Number.parseInt(
    '0x'.concat(
      oneStorageSlotStructFromStorage.slice(
        oneStorageSlotStructFromStorage.length - 2,
      ),
    ),
  );
  const eightBytesNumber: number = Number.parseInt(
    '0x'.concat(
      oneStorageSlotStructFromStorage.slice(
        oneStorageSlotStructFromStorage.length - 18,
        oneStorageSlotStructFromStorage.length - 2,
      ),
    ),
  );
  const status: SomeStatus = Number.parseInt(
    '0x'.concat(
      oneStorageSlotStructFromStorage.slice(
        oneStorageSlotStructFromStorage.length - 19,
        oneStorageSlotStructFromStorage.length - 18,
      ),
    ),
  );
  return new OneStorageSlotStruct(oneByteNumber, eightBytesNumber, status);
};

export const getBytesStruct = (
  amount: BigNumber,
  someAddress: string,
  data: string,
  status: string,
): BytesStruct => {
  const statusParsed: SomeStatus = Number.parseInt(status);
  return new BytesStruct(amount, someAddress, data, statusParsed);
};
export const getStringStruct = (
  str: string,
  bytes32: string,
  isCreated: string,
): StringStruct => {
  const b: boolean = isCreated === '1';
  return new StringStruct(str, bytes32, b);
};

export const getArrayStruct = (
  addresses: string[],
  amounts: BigNumber[],
  status: string,
): ArrayStruct => {
  const statusParsed: SomeStatus = Number.parseInt(status);
  return new ArrayStruct(addresses, amounts, statusParsed);
};

export const getParentStruct = (
  amount: BigNumber,
  someAddressAndFunctionSignature: string,
  number: BigNumber,
  status: string,
): ParentStruct => {
  const statusParsed: SomeStatus = Number.parseInt(status);
  const someAddress: string = someAddressAndFunctionSignature.slice(
    someAddressAndFunctionSignature.length - 40,
    someAddressAndFunctionSignature.length,
  );
  const functionSignature: string = someAddressAndFunctionSignature.slice(
    someAddressAndFunctionSignature.length - 48,
    someAddressAndFunctionSignature.length - 40,
  );
  return new ParentStruct(
    amount,
    someAddress,
    functionSignature,
    number,
    statusParsed,
  );
};
