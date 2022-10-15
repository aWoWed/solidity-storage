import { BigNumber } from 'ethers';
import { task, types } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';

import {
  logSlot,
  getKeyPreimage,
  getNestedMappingKeyPreimage,
  getMappingKeyPreimage,
  logGetter,
} from '../../../common/functions';
import { getStringStructFromStorage } from '../../../common/structFunctions';
import {
  GET_SLOT_40_42_STRING_STRUCT,
  GET_SLOT_43_STRING_STRUCT_ARRAY,
  GET_SLOT_44_45_STRING_STRUCT_MAPPING,
  GET_SLOT_46_47_STRING_STRUCT_NESTED_MAPPING,
} from '../../task-names';

task(GET_SLOT_40_42_STRING_STRUCT)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexStrLength = 40;
    const storageIndexBytes32 = 41;
    const storageIndexIsCreated = 42;

    const stringStructParsed = await getStringStructFromStorage(
      hre,
      params.storageRetriever,
      storageIndexStrLength,
      storageIndexBytes32,
      storageIndexIsCreated,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const stringStruct = await storageRetriever.getStringStruct();
    logGetter('StringStruct', stringStruct);
  });

task(GET_SLOT_43_STRING_STRUCT_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 43;
    const arrayLengthFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );
    logSlot(`Slot ${storageIndex}`, arrayLengthFromStorage);

    const arrayLengthParsed = Number.parseInt(arrayLengthFromStorage, 16);
    logSlot(`ArrayLength from storage`, arrayLengthParsed);

    const keyPreimage = getKeyPreimage(hre, storageIndex);
    const fieldsCount:BigNumber = BigNumber.from(3);
    for (let i = 0; i < arrayLengthParsed; i++) {
      const keyPreimageArray = keyPreimage.add(fieldsCount.mul(i));
      const stringStructParsed = await getStringStructFromStorage(
        hre,
        params.storageRetriever,
        keyPreimageArray,
        keyPreimageArray.add(1),
        keyPreimageArray.add(2),
        `\nSlot ${storageIndex} with keyPreimage and index ${i}`,
      );
    }

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayLength = await storageRetriever.getStringStructArrayLength();
    logGetter('arrayLength', arrayLength);
    for (let i = 0; i < arrayLength; i++) {
      const elem = await storageRetriever.getStringStructArrayItem(i);
      logGetter(`Elem with index ${i}`, elem);
    }
  });

task(GET_SLOT_44_45_STRING_STRUCT_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 44;
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
      await storageRetriever.getStringStructMappingCounter();
    logGetter(`StringStructMappingCounter uint256`, stringStructCounter);

    const storageIndexMapping = 45;
    const mappingLength = Number.parseInt(mappingCounterFromStorage, 16);
    logSlot(`MappingLength from storage`, mappingLength);

    for (let key = 1; key <= mappingLength; key++) {
      const keyPreimage = getMappingKeyPreimage(
        hre,
        BigNumber.from(key),
        BigNumber.from(storageIndexMapping),
      );
      const stringStructParsed = await getStringStructFromStorage(
        hre,
        params.storageRetriever,
        keyPreimage,
        keyPreimage.add(1),
        keyPreimage.add(2),
        `\nSlot ${storageIndexMapping} with keyPreimage and key ${key}`,
      );
    }

    for (let key = 1; key <= stringStructCounter; key++) {
      const elem = await storageRetriever.getStringStructMappingItem(key);
      logGetter(`StringStruct Mapping item with key ${key}`, elem);
    }
  });

task(GET_SLOT_46_47_STRING_STRUCT_NESTED_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 46;
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
      await storageRetriever.getStringStructNestedMappingCounter();
    logGetter(`NestedMappingBytesStructCounter uint256`, nestedMappingCounter);

    const storageIndexNestedMapping = 47;

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

      const stringStructParsed = await getStringStructFromStorage(
        hre,
        params.storageRetriever,
        keyPreimage,
        keyPreimage.add(1),
        keyPreimage.add(2),
        `\nSlot ${storageIndexNestedMapping} with keyPreimage and key ${key} and key1 ${key1}`,
      );
    }

    for (let key = 1; key <= nestedMappingCounter; key++) {
      const elem = await storageRetriever.getStringStructNestedItem(key, key1);
      logGetter(`Nested Mapping item with key0 ${key} and key1 ${key1}`, elem);
    }
  });
