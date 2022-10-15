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
import { getOneStorageSlotStructFromStorage } from '../../../common/structFunctions';
import {
  GET_SLOT_25_ONE_STORAGE_SLOT_STRUCT,
  GET_SLOT_26_ONE_STORAGE_SLOT_STRUCT_ARRAY,
  GET_SLOT_27_28_ONE_STORAGE_SLOT_STRUCT_MAPPING,
  GET_SLOT_29_30_ONE_STORAGE_SLOT_STRUCT_NESTED_MAPPING,
} from '../../task-names';

task(GET_SLOT_25_ONE_STORAGE_SLOT_STRUCT)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 25;
    const oneStorageSlotStructFromStorage =
      await getOneStorageSlotStructFromStorage(
        hre,
        params.storageRetriever,
        storageIndex,
        `Slot ${storageIndex}`,
      );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const oneStorageSlotStruct =
      await storageRetriever.getOneStorageSlotStruct();

    logGetter('OneStorageSlotStruct', oneStorageSlotStruct);
  });

task(GET_SLOT_26_ONE_STORAGE_SLOT_STRUCT_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 26;
    const arrayLengthFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );
    logSlot(`Slot ${storageIndex}`, arrayLengthFromStorage);

    const arrayLengthParsed = Number.parseInt(arrayLengthFromStorage, 16);
    logSlot(`ArrayLength from storage`, arrayLengthParsed);

    const keyPreimage = getKeyPreimage(hre, storageIndex);
    const fieldsCount: BigNumber = BigNumber.from(1);
    for (let i = 0; i < arrayLengthParsed; i++) {
      const keyPreimageArray = keyPreimage.add(fieldsCount.mul(i));
      await getOneStorageSlotStructFromStorage(
        hre,
        params.storageRetriever,
        keyPreimageArray.add(i),
        `\nSlot ${storageIndex} with keyPreimage and index ${i}`,
      );
    }

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayLength =
      await storageRetriever.getOneStorageSlotStructArrayLength();
    logGetter('arrayLength', arrayLength);
    for (let i = 0; i < arrayLength; i++) {
      const elem = await storageRetriever.getOneStorageSlotStructArrayItem(i);
      logGetter(`Elem with index ${i}`, elem);
    }
  });

task(GET_SLOT_27_28_ONE_STORAGE_SLOT_STRUCT_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 27;
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

    const oneStorageSlotStructCounter =
      await storageRetriever.getOneStorageSlotStructMappingCounter();
    logGetter(
      `OneStorageSlotStructMappingCounter uint256`,
      oneStorageSlotStructCounter,
    );

    const storageIndexMapping = 28;
    const mappingLength = Number.parseInt(mappingCounterFromStorage, 16);

    for (let key = 1; key <= mappingLength; key++) {
      const keyPreimage = getMappingKeyPreimage(
        hre,
        BigNumber.from(key),
        BigNumber.from(storageIndexMapping),
      );
      const oneStorageSlotStructFromStorage =
        await getOneStorageSlotStructFromStorage(
          hre,
          params.storageRetriever,
          keyPreimage,
          `\nSlot ${storageIndexMapping} with keyPreimage and key ${key}`,
        );
    }

    for (let key = 1; key <= oneStorageSlotStructCounter; key++) {
      const elem = await storageRetriever.getOneStorageSlotStructMappingItem(
        key,
      );
      logGetter(`OneStorageSlotStruct Mapping item with key ${key}`, elem);
    }
  });

task(GET_SLOT_29_30_ONE_STORAGE_SLOT_STRUCT_NESTED_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 29;
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
      await storageRetriever.getOneStorageSlotStructNestedMappingCounter();
    logGetter(
      `NestedMappingOneStorageslotStructCounter uint256`,
      nestedMappingCounter,
    );

    const storageIndexNestedMapping = 30;

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
      const oneStorageSlotStructFromStorage =
        await getOneStorageSlotStructFromStorage(
          hre,
          params.storageRetriever,
          keyPreimage,
          `\nSlot ${storageIndexNestedMapping} with keyPreimage and key0 ${key} and key1 ${key1}`,
        );
    }

    for (let key = 1; key <= nestedMappingCounter; key++) {
      const elem = await storageRetriever.getOneStorageSlotStructNestedItem(
        key,
        key1,
      );
      logGetter(`Nested Mapping item with key0 ${key} and key1 ${key1}`, elem);
    }
  });
