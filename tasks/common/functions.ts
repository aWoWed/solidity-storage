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

export const getVariableFromMulltiSlot = (
  manyNumbersFromStorage: string,
  variableLength: number,
  otherVariablesLength: number,
): string =>
  '0x'.concat(
    manyNumbersFromStorage.slice(
      manyNumbersFromStorage.length - variableLength,
      manyNumbersFromStorage.length - otherVariablesLength,
    ),
  );

export const convertToString = (variable: string): string => {
  let result = '';
  for (let i = 0; i < variable.length; i += 2) {
    const substr: number = Number.parseInt(variable.slice(i, i + 2), 16);
    result += String.fromCharCode(substr);
  }
  return result;
};

const getBytesData = async (
  hre: HardhatRuntimeEnvironment,
  length: number,
  contractAddress: string,
  bytesKey: BigNumber,
): Promise<string> => {
  let result = '0x';
  for (let i = 0; i < Math.round(length / 64); i++) {
    const elem: string = await hre.ethers.provider.getStorageAt(
      contractAddress,
      bytesKey.add(i),
    );
    const str: string = elem.slice(2, elem.length);
    result += str;
  }
  logSlot(`Concatinated Bytes`, result);
  return result;
};

export const getStringData = async (
  hre: HardhatRuntimeEnvironment,
  slotIndex: string | number | BigNumber,
  elem: string,
  contractAddress: string,
): Promise<string> => {
  let bytesStr = '0x';
  let parsedElem = '';
  let stringLength = 0;

  if (elem[2] !== '0' || elem[3] !== '0') {
    stringLength = BigNumber.from(
      '0x'.concat(elem.slice(elem.length - 1)),
    ).toNumber();
    bytesStr = elem.slice(2, 2 + stringLength);
  } else {
    stringLength = Number.parseInt(elem, 16);

    const keyPreimageString = getKeyPreimage(hre, slotIndex);
    bytesStr = await getBytesData(
      hre,
      stringLength,
      contractAddress,
      keyPreimageString,
    );
  }
  parsedElem = convertToString(bytesStr);
  logSlot(`String in storage Length`, stringLength);
  logSlot(`Slot ${slotIndex} parsed`, parsedElem);
  return bytesStr;
};

export const getKeyPreimage = (
  hre: HardhatRuntimeEnvironment,
  index: any,
): BigNumber => {
  const newKey = hre.ethers.utils.keccak256(toHex(hre, index, 32));
  console.log('New Key:', newKey);
  return BigNumber.from(newKey);
};

export const getArrayElements = async (
  hre: HardhatRuntimeEnvironment,
  contractAddress: string,
  storageIndex: number,
  logType?: string | undefined,
): Promise<any[]> => {
  const result: any[] = [];

  const lenArrayFromStorage = await hre.ethers.provider.getStorageAt(
    contractAddress,
    storageIndex,
  );
  logSlot(`Slot ${storageIndex}`, lenArrayFromStorage);

  const arrayLengthParsed = Number.parseInt(lenArrayFromStorage, 16);
  logSlot('ArrayLengthParsed from storage', arrayLengthParsed);

  const keyPreimage = getKeyPreimage(hre, storageIndex);
  for (let i = 0; i < arrayLengthParsed; i++) {
    const arrayKeyPreimage: BigNumber = keyPreimage.add(i);
    const elem = await hre.ethers.provider.getStorageAt(
      contractAddress,
      arrayKeyPreimage,
    );

    if (logType === 'number') {
      const e: BigNumber = BigNumber.from(elem);
      logSlot(
        `Slot ${storageIndex} with keyPreimage and index ${i}`,
        BigNumber.from(elem),
      );
      result.push(e);
    } else if (logType === 'string') {
      const stringData: string = await getStringData(
        hre,
        arrayKeyPreimage,
        elem,
        contractAddress,
      );
      logSlot(
        `Slot ${arrayKeyPreimage} with keyPreimage and index ${i}`,
        stringData,
      );
    } else {
      logSlot(`Slot ${storageIndex} with keyPreimage and index ${i}`, elem);
    }
    result.push(elem);
  }
  return result;
};

export const getMappingKeyPreimage = (
  hre: HardhatRuntimeEnvironment,
  key: BigNumber,
  storageSlot: BigNumber,
): BigNumber => {
  // The pre-image used to compute the Storage location
  const newKeyPreimage = hre.ethers.utils.concat([
    // Mappings' keys in Solidity must all be word-aligned (32 bytes)
    toHex(hre, key.toHexString(), 32),
    // Similarly with the slot-index into the Solidity variable layout
    toHex(hre, storageSlot.toHexString(), 32),
  ]);

  console.log('New Key Preimage:', hre.ethers.utils.hexlify(newKeyPreimage));
  // "0x0000000000000000000000000000000000000000000000000000000000000001
  //    0000000000000000000000000000000000000000000000000000000000000004"

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
