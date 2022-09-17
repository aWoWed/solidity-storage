import { BigNumber } from 'ethers';
import { task, types } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';

import {
  logSlot,
  getKeyPreimage,
  getNestedMappingKeyPreimage,
  getMappingKeyPreimage,
  getBytesData,
  getBytesStruct,
  logGetter,
} from '../../../common/functions';
import {
  GET_SLOT_31_34_BYTES_STRUCT,
  GET_SLOT_35_BYTES_STRUCT_ARRAY,
  GET_SLOT_36_37_BYTES_STRUCT_MAPPING,
  GET_SLOT_38_39_BYTES_STRUCT_NESTED_MAPPING,
} from '../../task-names';

task(GET_SLOT_31_34_BYTES_STRUCT)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexAmount = 31;
    const bytesStructAmountFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndexAmount,
    );
    logSlot(`Slot ${storageIndexAmount}`, bytesStructAmountFromStorage);

    const storageIndexSomeAddress = 32;
    const bytesStructSomeAddressFromStorage =
      await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        storageIndexSomeAddress,
      );
    logSlot(
      `Slot ${storageIndexSomeAddress}`,
      bytesStructSomeAddressFromStorage,
    );

    const storageIndexData = 33;
    const bytesLengthFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndexData,
    );
    logSlot(`Slot ${storageIndexData}`, bytesLengthFromStorage);
    const bytesLength = Number.parseInt(bytesLengthFromStorage, 16);
    logSlot(`BytesLength parsed`, bytesLength);
    const bytesKey = getKeyPreimage(hre, storageIndexData);
    const bytesConcatinated = await getBytesData(
      hre,
      bytesLength,
      params.storageRetriever,
      bytesKey,
    );

    const storageIndexStatus = 34;
    const bytesStructStatusFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndexStatus,
    );
    logSlot(`Slot ${storageIndexStatus}`, bytesStructStatusFromStorage);

    const bytesStructParsed = getBytesStruct(
      BigNumber.from(bytesStructAmountFromStorage),
      bytesStructSomeAddressFromStorage,
      bytesConcatinated,
      bytesStructStatusFromStorage,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const bytesSlotStruct = await storageRetriever.getBytesStruct();
    logGetter('BytesStruct', bytesSlotStruct);
  });

task(GET_SLOT_35_BYTES_STRUCT_ARRAY)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 35;
    const arrayLengthFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );
    logSlot(`Slot ${storageIndex}`, arrayLengthFromStorage);

    const arrayLengthParsed = Number.parseInt(arrayLengthFromStorage, 16);
    logSlot(`ArrayLength from storage`, arrayLengthParsed);

    const keyPreimage = getKeyPreimage(hre, storageIndex);
    for (let i = 0; i < arrayLengthParsed; i++) {
      const amount = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage,
      );
      const someAddress = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage.add(1),
      );

      const dataLength = Number.parseInt(
        await hre.ethers.provider.getStorageAt(
          params.storageRetriever,
          keyPreimage.add(2),
        ),
      );
      const bytesKey = getKeyPreimage(hre, keyPreimage.add(2));
      const data = await getBytesData(
        hre,
        dataLength,
        params.storageRetriever,
        bytesKey,
      );

      const status = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage.add(3),
      );

      console.log(`\nSlot ${storageIndex} with keyPreimage and index ${i}`);
      const bytesStructParsed = getBytesStruct(
        BigNumber.from(amount),
        someAddress,
        data,
        status,
      );
    }

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );

    const arrayLength = await storageRetriever.getBytesStructArrayLength();
    logGetter('arrayLength', arrayLength);
    for (let i = 0; i < arrayLength; i++) {
      const elem = await storageRetriever.getBytesStructArrayItem(i);
      logGetter(`Elem with index ${i}`, elem);
    }
  });

task(GET_SLOT_36_37_BYTES_STRUCT_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 36;
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

    const bytesStructCounter =
      await storageRetriever.getBytesStructMappingCounter();
    logGetter(`BytesStructMappingCounter uint256`, bytesStructCounter);

    const storageIndexMapping = 37;
    const mappingLength = Number.parseInt(mappingCounterFromStorage, 16);
    logSlot(`MappingLength from storage`, mappingLength);

    for (let key = 1; key <= mappingLength; key++) {
      const keyPreimage = getMappingKeyPreimage(
        hre,
        BigNumber.from(key),
        BigNumber.from(storageIndexMapping),
      );
      const amount = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage,
      );
      const someAddress = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage.add(1),
      );

      const dataLength = Number.parseInt(
        await hre.ethers.provider.getStorageAt(
          params.storageRetriever,
          keyPreimage.add(2),
        ),
      );
      const bytesKey = getKeyPreimage(hre, keyPreimage.add(2));
      const data = await getBytesData(
        hre,
        dataLength,
        params.storageRetriever,
        bytesKey,
      );

      const status = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage.add(3),
      );
      console.log(
        `\nSlot ${storageIndexMapping} with keyPreimage and key ${key}`,
      );
      const bytesStructParsed = getBytesStruct(
        BigNumber.from(amount),
        someAddress,
        data,
        status,
      );
    }

    for (let key = 1; key <= bytesStructCounter; key++) {
      const elem = await storageRetriever.getBytesStructMappingItem(key);
      logGetter(`BytesStruct Mapping item with key ${key}`, elem);
    }
  });

task(GET_SLOT_38_39_BYTES_STRUCT_NESTED_MAPPING)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndexCounter = 38;
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
      await storageRetriever.getBytesStructNestedMappingCounter();
    logGetter(`NestedMappingBytesStructCounter uint256`, nestedMappingCounter);

    const storageIndexNestedMapping = 39;

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

      const amount = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage,
      );
      const someAddress = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage.add(1),
      );

      const dataLength = Number.parseInt(
        await hre.ethers.provider.getStorageAt(
          params.storageRetriever,
          keyPreimage.add(2),
        ),
      );
      const bytesKey = getKeyPreimage(hre, keyPreimage.add(2));
      const data = await getBytesData(
        hre,
        dataLength,
        params.storageRetriever,
        bytesKey,
      );

      const status = await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        keyPreimage.add(3),
      );
      console.log(
        `\nSlot ${storageIndexNestedMapping} with keyPreimage and key ${key}`,
      );
      const bytesStructParsed = getBytesStruct(
        BigNumber.from(amount),
        someAddress,
        data,
        status,
      );
    }

    for (let key = 1; key <= nestedMappingCounter; key++) {
      const elem = await storageRetriever.getBytesStructNestedItem(key, key1);
      logGetter(`Nested Mapping item with key0 ${key} and key1 ${key1}`, elem);
    }
  });
