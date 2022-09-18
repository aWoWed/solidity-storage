import { BigNumber } from 'ethers';
import { task, types } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';

import {
  logSlot,
  getKeyPreimage,
  getNestedMappingKeyPreimage,
  getMappingKeyPreimage,
  logGetter,
  getParentStructFromStorage,
} from '../../../common/functions';
import {
  GET_SLOT_56_59_PARENT_STRUCT,
  GET_SLOT_60_PARENT_STRUCT_ARRAY,
  GET_SLOT_61_62_PARENT_STRUCT_MAPPING,
  GET_SLOT_63_64_PARENT_STRUCT_NESTED_MAPPING,
} from '../../task-names';

task(GET_SLOT_56_59_PARENT_STRUCT)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexAmount = 56;
    const storageIndexAddressAndSig = 57;
    const storageIndexNumber = 58;
    const storageIndexStatus = 59;

    const parentStructParsed = await getParentStructFromStorage(hre, params.storageRetriever, storageIndexAmount, storageIndexAddressAndSig, storageIndexNumber, storageIndexStatus);

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const parentSlotStruct = await storageRetriever.getParentStruct();
    logGetter('ParentStruct', parentSlotStruct);
  });

task(GET_SLOT_60_PARENT_STRUCT_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 60;
    const arrayLengthFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );
    logSlot(`Slot ${storageIndex}`, arrayLengthFromStorage);

    const arrayLengthParsed = Number.parseInt(arrayLengthFromStorage, 16);
    logSlot(`ArrayLength from storage`, arrayLengthParsed);

    const keyPreimage = getKeyPreimage(hre, storageIndex);
    for (let i = 0; i < arrayLengthParsed; i++) {
      const parentStructParsed = await getParentStructFromStorage(hre, params.storageRetriever, keyPreimage, keyPreimage.add(1), keyPreimage.add(2), keyPreimage.add(3), `\nSlot ${storageIndex} with keyPreimage and index ${i}`);
    }

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayLength = await storageRetriever.getParentStructArrayLength();
    logGetter('arrayLength', arrayLength);
    for (let i = 0; i < arrayLength; i++) {
      const elem = await storageRetriever.getParentStructArrayItem(i);
      logGetter(`Elem with index ${i}`, elem);
    }
  });

task(GET_SLOT_61_62_PARENT_STRUCT_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 61;
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
    const parentStructCounter =
      await storageRetriever.getParentStructMappingCounter();
    logGetter(`ParentStructMappingCounter uint256`, parentStructCounter);

    const storageIndexMapping = 62;
    const mappingLength = Number.parseInt(mappingCounterFromStorage, 16);
    logSlot(`MappingLength from storage`, mappingLength);

    for (let key = 1; key <= mappingLength; key++) {
      const keyPreimage = getMappingKeyPreimage(
        hre,
        BigNumber.from(key),
        BigNumber.from(storageIndexMapping),
      );

      const parentStructParsed = await getParentStructFromStorage(hre, params.storageRetriever, keyPreimage, keyPreimage.add(1), keyPreimage.add(2), keyPreimage.add(3), `\nSlot ${storageIndexMapping} with keyPreimage and key ${key}`);
    }

    for (let key = 1; key <= parentStructCounter; key++) {
      const elem = await storageRetriever.getParentStructMappingItem(key);
      logGetter(`ParentStruct Mapping item with key ${key}`, elem);
    }
  });

task(GET_SLOT_63_64_PARENT_STRUCT_NESTED_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 63;
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
      await storageRetriever.getParentStructNestedMappingCounter();
    logGetter(`NestedMappingParentStructCounter uint256`, nestedMappingCounter);

    const storageIndexNestedMapping = 64;

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

      const parentStructParsed = await getParentStructFromStorage(hre, params.storageRetriever, keyPreimage, keyPreimage.add(1), keyPreimage.add(2), keyPreimage.add(3), `\nSlot ${storageIndexNestedMapping} with keyPreimage and key0 ${key} and key1 ${key1}`);    
    }

    for (let key = 1; key <= nestedMappingCounter; key++) {
      const elem = await storageRetriever.getParentStructNestedItem(key, key1);
      logGetter(`Nested Mapping item with key0 ${key} and key1 ${key1}`, elem);
    }
  });
