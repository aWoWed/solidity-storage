import { BigNumber } from 'ethers';
import { task, types } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';

import {
  logSlot,
  convertToString,
  getMappingKeyPreimage,
  getNestedMappingKeyPreimage,
  logGetter,
  getArrayElements,
  getStringData,
} from '../../common/functions';
import {
  GET_SLOT_10_15_FIXED_ARRAY,
  GET_SLOT_16_UINT256_ARRAY,
  GET_SLOT_17_UINT128_ARRAY,
  GET_SLOT_18_ADDRESS_ARRAY,
  GET_SLOT_19_STRING_ARRAY,
  GET_SLOT_20_BOOL_ARRAY,
  GET_SLOT_21_22_DEFAULT_MAPPING,
  GET_SLOT_23_24_NESTED_MAPPING,
  GET_SLOT_8_STRING,
  GET_SLOT_9_BYTES,
} from '../task-names';

task(GET_SLOT_8_STRING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 8;
    const deployerNicknameFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    ); // Should return str length only, but when str takes less then 248 bits, than will be concatinated

    const bytesStr = await getStringData(
      hre,
      storageIndex,
      deployerNicknameFromStorage,
      params.storageRetriever,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );
    const deployerNickname = await storageRetriever.getDeployerNickname();

    logSlot(`Slot ${storageIndex}`, deployerNicknameFromStorage);

    logGetter('DeployerNickname string', deployerNickname);
  });

task(GET_SLOT_9_BYTES)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 9;
    const dataFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    ); // Should return str length only, but when str takes less then 256 bits, than will be concatinated

    const bytesStr = await getStringData(
      hre,
      storageIndex,
      dataFromStorage,
      params.storageRetriever,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );
    const data = await storageRetriever.getData();
    const dataParsed = convertToString(data.slice(2, data.length));

    logSlot(`Slot ${storageIndex}`, dataFromStorage);
    logSlot(
      `Slot ${storageIndex} from keyPreimage bytesConcatinated`,
      bytesStr,
    );

    logGetter('Data bytes', data);
    logGetter(`Data bytes parsed`, dataParsed);
  });

task(GET_SLOT_10_15_FIXED_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 10;
    const arrayLength = 6;

    const fixedSizeArrayFromStorage: number[] = [];
    logSlot(`Array Length`, arrayLength);
    for (let i = 0; i < arrayLength; i++) {
      const elem = Number.parseInt(
        await hre.ethers.provider.getStorageAt(
          params.storageRetriever,
          storageIndex + i,
        ),
        16,
      );
      logSlot(`Slot ${storageIndex + i}`, elem);
      fixedSizeArrayFromStorage.push(elem);
    }

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    logSlot(
      `Slots ${storageIndex}-${storageIndex + arrayLength}`,
      fixedSizeArrayFromStorage,
    );
    const fixedSizeArray = await storageRetriever.getFixedSizeArray();
    logSlot(`FixedSizeArray uint256[6]`, fixedSizeArray);
  });

task(GET_SLOT_16_UINT256_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 16;
    const array = await getArrayElements(
      hre,
      params.storageRetriever,
      storageIndex,
      'number',
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayLength =
      await storageRetriever.getThirtyTwoBytesNumberArrayLength();
    logGetter('ArrayLength', arrayLength);

    for (let i = 0; i < arrayLength; i++) {
      const elem =
        await await storageRetriever.getThirtyTwoBytesNumberArrayItem(i);
      logGetter(`Item ${i}`, elem);
    }
  });

task(GET_SLOT_17_UINT128_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 17;
    const array = await getArrayElements(
      hre,
      params.storageRetriever,
      storageIndex,
      'number',
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayLength =
      await storageRetriever.getSixteenBytesNumberArrayLength();
    logGetter('ArrayLength', arrayLength);

    for (let i = 0; i < arrayLength; i++) {
      const elem = await await storageRetriever.getSixteenBytesNumberArrayItem(
        i,
      );
      logGetter(`Item ${i}`, elem);
    }
  });

task(GET_SLOT_18_ADDRESS_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 18;
    const array = await getArrayElements(
      hre,
      params.storageRetriever,
      storageIndex,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayLength = await storageRetriever.getAddressArrayLength();
    logGetter('ArrayLength', arrayLength);

    for (let i = 0; i < arrayLength; i++) {
      const elem = await await storageRetriever.getAddressArrayItem(i);
      logGetter(`Item ${i}`, elem);
    }
  });

task(GET_SLOT_19_STRING_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 19;
    const array = await getArrayElements(
      hre,
      params.storageRetriever,
      storageIndex,
      'string',
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayLength = await storageRetriever.getStringArrayLength();
    logGetter('ArrayLength', arrayLength);

    for (let i = 0; i < arrayLength; i++) {
      const elem = await await storageRetriever.getStringArrayItem(i);
      logGetter(`Item ${i}`, elem);
    }
  });

task(GET_SLOT_20_BOOL_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 20;
    const array = await getArrayElements(
      hre,
      params.storageRetriever,
      storageIndex,
      'number',
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayLength = await storageRetriever.getBoolArrayLength();
    logGetter('ArrayLength', arrayLength);

    for (let i = 0; i < arrayLength; i++) {
      const elem = await await storageRetriever.getBoolArrayItem(i);
      logGetter(`Item ${i}`, elem);
    }
  });

task(GET_SLOT_21_22_DEFAULT_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 21;
    const mappingCounterFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndexCounter,
    );

    logSlot(`Slot ${storageIndexCounter}`, mappingCounterFromStorage);

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const mappingCounter = await storageRetriever.getDefaultMappingCounter();
    logGetter(`MappingCounter uint256`, mappingCounter);

    const storageIndexMapping = 22;
    const mappingFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndexMapping,
    );
    const mappingLength = Number.parseInt(mappingFromStorage, 16);

    logSlot(`Slot ${storageIndexMapping}`, mappingFromStorage);
    logSlot(`MappingLength from storage`, mappingLength);

    for (let key = 1; key <= mappingLength; key++) {
      const keyPreimage = getMappingKeyPreimage(
        hre,
        BigNumber.from(key),
        BigNumber.from(storageIndexMapping),
      );
      const elem = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage,
      );
      logSlot(
        `Slot ${storageIndexMapping} with keyPreimage and key ${key}`,
        elem,
      );
    }

    for (let key = 1; key <= mappingCounter; key++) {
      const elem = await storageRetriever.getDefaultMappingItem(key);
      logGetter(`Mapping item with key ${key}`, elem);
    }
  });

task(GET_SLOT_23_24_NESTED_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 23;
    const nestedMappingCounterFromStorage =
      await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        storageIndexCounter,
      );

    logSlot(`Slot ${storageIndexCounter}`, nestedMappingCounterFromStorage);

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const nestedMappingCounter =
      await storageRetriever.getNestedMappingCounter();
    logGetter(`NestedMappingCounter uint256`, nestedMappingCounter);

    const storageIndexMapping = 24;
    const nestedMappingFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndexCounter,
    );
    const nestedMappingLength = Number.parseInt(nestedMappingFromStorage, 16);

    logSlot(`Slot ${storageIndexMapping}`, nestedMappingFromStorage);
    logSlot(`NestedMappingLength from storage`, nestedMappingLength);

    const key1 = '0xC7D1232dc17825f0C1dCb46a5c9F6Dd81118B742';
    for (let key = 1; key <= nestedMappingLength; key++) {
      const keyPreimage = getNestedMappingKeyPreimage(
        hre,
        BigNumber.from(key),
        BigNumber.from(storageIndexMapping),
        BigNumber.from(key1),
      );
      const elem = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage,
      );
      logSlot(
        `Slot ${storageIndexMapping} with keyPreimage and key0 ${key} and key1 ${key1}`,
        elem,
      );
    }

    for (let key = 1; key <= nestedMappingCounter; key++) {
      const elem = await storageRetriever.getNestedMappingItem(key, key1);
      logGetter(`Nested Mapping item with key0 ${key} and key1 ${key1}`, elem);
    }
  });
