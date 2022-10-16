import { BigNumber } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

import {
  convertToString,
  getBytesData,
  getKeyPreimage,
  getStringData,
  getVariableFromMulltiSlot,
  logSlot,
} from './functions';
import {
  ArrayStruct,
  BytesStruct,
  OneStorageSlotStruct,
  ParentStruct,
  SomeStatus,
  StringStruct,
} from './types';

const createOneStorageStruct = (
  oneStorageSlotStructFromStorage: string,
): OneStorageSlotStruct => {
  const oneByteNumber: number = Number.parseInt(
    getVariableFromMulltiSlot(oneStorageSlotStructFromStorage, 2, 0),
  );
  const eightBytesNumber: number = Number.parseInt(
    getVariableFromMulltiSlot(oneStorageSlotStructFromStorage, 18, 2),
  );
  const status: SomeStatus = Number.parseInt(
    getVariableFromMulltiSlot(oneStorageSlotStructFromStorage, 19, 18),
  );
  return new OneStorageSlotStruct(oneByteNumber, eightBytesNumber, status);
};

export const getOneStorageSlotStructFromStorage = async (
  hre: HardhatRuntimeEnvironment,
  contractAddress: string,
  key: string | number | BigNumber,
  logMessage: string,
): Promise<OneStorageSlotStruct> => {
  const oneStorageSlotStructFromStorage =
    await hre.ethers.provider.getStorageAt(contractAddress, key);
  logSlot(logMessage, oneStorageSlotStructFromStorage);
  return createOneStorageStruct(oneStorageSlotStructFromStorage);
};

const createBytesStruct = (
  amount: BigNumber,
  someAddress: string,
  data: string,
  status: string,
): BytesStruct => {
  const statusParsed: SomeStatus = Number.parseInt(status);
  return new BytesStruct(amount, someAddress, data, statusParsed);
};

export const getBytesStructFromStorage = async (
  hre: HardhatRuntimeEnvironment,
  contractAddress: string,
  key0: string | number | BigNumber,
  key1: string | number | BigNumber,
  key2: string | number | BigNumber,
  key3: string | number | BigNumber,
  logMessage?: string | undefined | null,
): Promise<BytesStruct> => {
  const amount = await hre.ethers.provider.getStorageAt(contractAddress, key0);
  logSlot(`Slot ${key0}`, amount);

  const someAddress = await hre.ethers.provider.getStorageAt(
    contractAddress,
    key1,
  );
  logSlot(`Slot ${key1}`, someAddress);

  const bytesLengthFromStorage = await hre.ethers.provider.getStorageAt(
    contractAddress,
    key2,
  );
  logSlot(`Slot ${key2}`, bytesLengthFromStorage);

  const bytesConcatinated = await getStringData(
    hre,
    key2,
    bytesLengthFromStorage,
    contractAddress,
  );

  const status = await hre.ethers.provider.getStorageAt(contractAddress, key3);
  logSlot(`Slot ${key3}`, status);

  if (logMessage !== undefined && logMessage !== null && logMessage !== '') {
    console.log(logMessage);
  }
  return createBytesStruct(
    BigNumber.from(amount),
    someAddress,
    bytesConcatinated,
    status,
  );
};

const createStringStruct = (
  str: string,
  bytes32: string,
  isCreated: string,
): StringStruct => {
  const b: boolean = isCreated === '1';
  return new StringStruct(str, bytes32, b);
};

export const getStringStructFromStorage = async (
  hre: HardhatRuntimeEnvironment,
  contractAddress: string,
  key0: string | number | BigNumber,
  key1: string | number | BigNumber,
  key2: string | number | BigNumber,
  logMessage?: string | undefined | null,
): Promise<StringStruct> => {
  const strLength = await hre.ethers.provider.getStorageAt(
    contractAddress,
    key0,
  );
  logSlot(`Slot ${key0}`, strLength);

  const str = await getStringData(hre, key0, strLength, contractAddress);

  const bytes32 = await hre.ethers.provider.getStorageAt(contractAddress, key1);
  logSlot(`Slot ${key1}`, bytes32);

  const isCreated = await hre.ethers.provider.getStorageAt(
    contractAddress,
    key2,
  );
  logSlot(`Slot ${key2}`, isCreated);

  if (logMessage !== undefined && logMessage !== null && logMessage !== '') {
    console.log(logMessage);
  }
  return createStringStruct(
    parsedStr,
    bytes32,
    isCreated.slice(isCreated.length - 1),
  );
};

const createArrayStruct = (
  addresses: string[],
  amounts: BigNumber[],
  status: string,
): ArrayStruct => {
  const statusParsed: SomeStatus = Number.parseInt(status);
  return new ArrayStruct(addresses, amounts, statusParsed);
};

export const getArrayStructFromStorage = async (
  hre: HardhatRuntimeEnvironment,
  contractAddress: string,
  key0: string | number | BigNumber,
  key1: string | number | BigNumber,
  key2: string | number | BigNumber,
  logMessage?: string | undefined | null,
): Promise<ArrayStruct> => {
  const addressesLength = await hre.ethers.provider.getStorageAt(
    contractAddress,
    key0,
  );
  logSlot(`Slot ${key0}`, addressesLength);
  const lengthAddresses = Number.parseInt(addressesLength, 16);

  const addresses: string[] = [];
  for (let i = 0; i < lengthAddresses; i++) {
    const key = getKeyPreimage(hre, key0);
    const elem = await hre.ethers.provider.getStorageAt(
      contractAddress,
      key.add(i),
    );
    addresses.push(elem);
  }

  const amountsLength = await hre.ethers.provider.getStorageAt(
    contractAddress,
    key1,
  );
  logSlot(`Slot ${key1}`, amountsLength);
  const lengthAmounts = Number.parseInt(amountsLength, 16);

  const amounts: BigNumber[] = [];
  for (let i = 0; i < lengthAmounts; i++) {
    const key = getKeyPreimage(hre, key1);
    const elem = BigNumber.from(
      await hre.ethers.provider.getStorageAt(contractAddress, key.add(i)),
    );
    amounts.push(elem);
  }

  const status = await hre.ethers.provider.getStorageAt(contractAddress, key2);
  logSlot(`Slot ${key2}`, status);

  if (logMessage !== undefined && logMessage !== null && logMessage !== '') {
    console.log(logMessage);
  }
  return createArrayStruct(addresses, amounts, status.slice(status.length - 1));
};

const createParentStruct = (
  amount: BigNumber,
  someAddressAndFunctionSignature: string,
  number: BigNumber,
  status: string,
): ParentStruct => {
  const statusParsed: SomeStatus = Number.parseInt(status);
  const someAddress: string = getVariableFromMulltiSlot(
    someAddressAndFunctionSignature,
    40,
    0,
  );
  const functionSignature: string = getVariableFromMulltiSlot(
    someAddressAndFunctionSignature,
    48,
    40,
  );
  return new ParentStruct(
    amount,
    someAddress,
    functionSignature,
    number,
    statusParsed,
  );
};

export const getParentStructFromStorage = async (
  hre: HardhatRuntimeEnvironment,
  contractAddress: string,
  key0: string | number | BigNumber,
  key1: string | number | BigNumber,
  key2: string | number | BigNumber,
  key3: string | number | BigNumber,
  logMessage?: string | undefined | null,
): Promise<ParentStruct> => {
  const amount = await hre.ethers.provider.getStorageAt(contractAddress, key0);
  logSlot(`Slot ${key0}`, amount);

  const someAddressAndFunctionSignature =
    await hre.ethers.provider.getStorageAt(contractAddress, key1);
  logSlot(`Slot ${key1}`, someAddressAndFunctionSignature);

  const number = await hre.ethers.provider.getStorageAt(contractAddress, key2);
  logSlot(`Slot ${key2}`, number);

  const status = await hre.ethers.provider.getStorageAt(contractAddress, key3);
  logSlot(`Slot ${key3}`, status);

  if (logMessage !== undefined && logMessage !== null && logMessage !== '') {
    console.log(logMessage);
  }
  return createParentStruct(
    BigNumber.from(amount),
    someAddressAndFunctionSignature,
    BigNumber.from(number),
    status,
  );
};
