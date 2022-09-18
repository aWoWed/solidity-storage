import { BigNumber } from 'ethers';
import { task, types } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';

import {
  logSlot,
  getKeyPreimage,
  getNestedMappingKeyPreimage,
  getMappingKeyPreimage,
  logGetter,
  getArrayStructFromStorage,
} from '../../../common/functions';
import {
  GET_SLOT_48_50_ARRAY_STRUCT,
  GET_SLOT_51_ARRAY_STRUCT_ARRAY,
  GET_SLOT_52_53_ARRAY_STRUCT_MAPPING,
  GET_SLOT_54_55_ARRAY_STRUCT_NESTED_MAPPING,
} from '../../task-names';

task(GET_SLOT_48_50_ARRAY_STRUCT)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexAddresses = 48;
    const storageIndexAmounts = 49;
    const storageIndexStatus = 50;

    const arrayStructParsed = await getArrayStructFromStorage(hre, params.storageRetriever, storageIndexAddresses, storageIndexAmounts, storageIndexStatus);

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayStruct = await storageRetriever.getArrayStruct();
    logGetter('ArrayStruct', arrayStruct);
  });

task(GET_SLOT_51_ARRAY_STRUCT_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 51;
    const arrayLengthFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );
    logSlot(`Slot ${storageIndex}`, arrayLengthFromStorage);

    const arrayLengthParsed = Number.parseInt(arrayLengthFromStorage, 16);
    logSlot(`ArrayLength from storage`, arrayLengthParsed);

    const keyPreimage = getKeyPreimage(hre, storageIndex);
    for (let i = 0; i < arrayLengthParsed; i++) {
      const arrayStructParsed = await getArrayStructFromStorage(hre, params.storageRetriever, keyPreimage, keyPreimage.add(1), keyPreimage.add(2), `\nSlot ${storageIndex} with keyPreimage and index ${i}`);
    }

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayLength = await storageRetriever.getArrayStructArrayLength();
    logGetter('arrayLength', arrayLength);
    for (let i = 0; i < arrayLength; i++) {
      const elem = await storageRetriever.getArrayStructArrayItem(i);
      logGetter(`Elem with index ${i}`, elem);
    }
  });

task(GET_SLOT_52_53_ARRAY_STRUCT_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 52;
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

    const stringStructCounter =
      await storageRetriever.getArrayStructMappingCounter();
    logGetter(`ArrayStructMappingCounter uint256`, stringStructCounter);

    const storageIndexMapping = 53;
    const mappingLength = Number.parseInt(mappingCounterFromStorage, 16);
    logSlot(`MappingLength from storage`, mappingLength);

    for (let key = 1; key <= mappingLength; key++) {
      const keyPreimage = getMappingKeyPreimage(
        hre,
        BigNumber.from(key),
        BigNumber.from(storageIndexMapping),
      );

      const arrayStructParsed = await getArrayStructFromStorage(hre, params.storageRetriever, keyPreimage, keyPreimage.add(1), keyPreimage.add(2), `\nSlot ${storageIndexMapping} with keyPreimage and index ${key}`);
    }

    for (let key = 1; key <= stringStructCounter; key++) {
      const elem = await storageRetriever.getArrayStructMappingItem(key);
      logGetter(`ArrayStruct Mapping item with key ${key}`, elem);
    }
  });

task(GET_SLOT_54_55_ARRAY_STRUCT_NESTED_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 54;
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
      await storageRetriever.getArrayStructNestedMappingCounter();
    logGetter(`NestedMappingArrayStructCounter uint256`, nestedMappingCounter);

    const storageIndexNestedMapping = 55;

    const nestedMappingLength = Number.parseInt(
      nestedMappingCounterFromStorage,
      16,
    );
    logSlot(`NestedMappingLength from storage`, nestedMappingLength);

    const key1 = '0xC7D1232dc17825f0C1dCb46a5c9F6Dd81118B742';
    for (let key = 1; key <= nestedMappingLength; key++) {
      const keyPreimage = getNestedMappingKeyPreimage(
        hre,
        BigNumber.from(key),
        BigNumber.from(storageIndexNestedMapping),
        BigNumber.from(key1),
      );

      const arrayStructParsed = await getArrayStructFromStorage(hre, params.storageRetriever, keyPreimage, keyPreimage.add(1), keyPreimage.add(2), `\nSlot ${storageIndexNestedMapping} with keyPreimage and key ${key} and key1 ${key1}`);
    }

    for (let key = 1; key <= nestedMappingCounter; key++) {
      const elem = await storageRetriever.getArrayStructNestedItem(key, key1);
      logGetter(`Nested Mapping item with key0 ${key} and key1 ${key1}`, elem);
    }
  });
