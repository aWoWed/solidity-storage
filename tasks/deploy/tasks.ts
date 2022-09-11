import { BigNumber } from 'ethers';
import { subtask, task, types } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';

import { logDeployment, preAction, delay, toHex } from './functions';
import {
  TASK_DEPLOY,
  SUBTASK_DEPLOY_RETRIEVER,
  SUBTASK_SET_ARRAY_MAPPING_VALUES,
  SUBTASK_SET_ONESTORAGESLOT_STRUCT,
  SUBTASK_SET_BYTES_STRUCT,
  SUBTASK_SET_STRING_STRUCT,
  SUBTASK_SET_ARRAY_STRUCT,
  SUBTASK_SET_PARENT_STRUCT,
} from './task-names';

task(TASK_DEPLOY)
  .addParam('nickname', 'deployer nickname', 'John Doe', types.string)
  .setAction(async (params: string, hre) => {
    await preAction(hre);

    const storageRetriever = await hre.run(SUBTASK_DEPLOY_RETRIEVER, {
      nickname: params.nickname,
    });

    const setArrayMappingValues = await hre.run(
      SUBTASK_SET_ARRAY_MAPPING_VALUES,
      { storageRetriever: storageRetriever },
    );

    const setOneStorageSlotStruct = await hre.run(
      SUBTASK_SET_ONESTORAGESLOT_STRUCT,
      { storageRetriever: storageRetriever },
    );

    const setBytesStruct = await hre.run(SUBTASK_SET_BYTES_STRUCT, {
      storageRetriever: storageRetriever,
    });

    const setStringStruct = await hre.run(SUBTASK_SET_STRING_STRUCT, {
      storageRetriever: storageRetriever,
    });

    const setArrayStruct = await hre.run(SUBTASK_SET_ARRAY_STRUCT, {
      storageRetriever: storageRetriever,
    });

    const setParentStruct = await hre.run(SUBTASK_SET_PARENT_STRUCT, {
      storageRetriever: storageRetriever,
    });
  });

subtask(SUBTASK_DEPLOY_RETRIEVER)
  .addParam('nickname', 'deployer nickname', 'John Doe', types.string)
  .setAction(async (params: string, hre) => {
    await preAction(hre);
    const [deployer] = await hre.ethers.getSigners();

    const factory = await hre.ethers.getContractFactory(
      'StorageRetriever',
      deployer,
    );
    const storageRetriever = await (await factory.deploy()).deployed();

    logDeployment(
      'Greeter',
      ['Nickname', params.nickname],
      ['Address', storageRetriever.address],
      ['Deployer', deployer.address],
    );
    return storageRetriever.address;
  });

subtask(SUBTASK_SET_ARRAY_MAPPING_VALUES)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      deployer,
    );

    const number: BigNumber = hre.ethers.utils.parseEther('10');
    await storageRetriever.addThirtyTwoBytesNumberArrayItem(number);
    await delay(2000);

    const sixteenNumber: BigNumber = hre.ethers.utils.parseUnits('99', 6);
    await storageRetriever.addSixteenBytesNumberArrayItem(sixteenNumber);
    await delay(2000);

    await storageRetriever.addAddressesArrayItem(deployer.address);
    await delay(2000);

    const nickname = await storageRetriever.getDeployerNickname();
    await storageRetriever.addStringArrayItem(nickname);
    await delay(2000);

    await storageRetriever.addBoolArrayItem(true);
    await delay(2000);

    await storageRetriever.addDefaultMappingItem(deployer.address);
    await delay(2000);

    await storageRetriever.addNestedMappingItem(true);
    await delay(2000);

    console.log('Completed');
  });

subtask(SUBTASK_SET_ONESTORAGESLOT_STRUCT)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      deployer,
    );

    const oneByteNumber = 256;
    const eightBytesNumber: BigNumber = hre.ethers.utils.parseUnits('12.99', 6);
    const status = SomeStatus.Active;

    await storageRetriever.setOneStorageSlotStruct(
      oneByteNumber,
      eightBytesNumber,
      status,
    );
    await delay(2000);

    await storageRetriever.addOneStorageSlotStructArrayItem(
      oneByteNumber,
      eightBytesNumber,
      status,
    );
    await delay(2000);

    await storageRetriever.addOneStorageSlotStructMappingItem(
      oneByteNumber,
      eightBytesNumber,
      status,
    );
    await delay(2000);

    await storageRetriever.addOneStorageSlotStructNestedMappingItem(
      oneByteNumber,
      eightBytesNumber,
      status,
    );
    await delay(2000);

    console.log('Completed');
  });

subtask(SUBTASK_SET_BYTES_STRUCT)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      deployer,
    );

    const amount: BigNumber = hre.ethers.utils.parseUnits('12.974659', 18);
    const address = deployer.address;
    const data =
      '0x' +
      toHex(hre, amount, 32).substr(2) +
      toHex(hre, address, 32).substr(2) +
      address.substr(2);
    const status = SomeStatus.Executed;

    await storageRetriever.setBytesStruct(amount, address, data, status);
    await delay(2000);

    await storageRetriever.addBytesStructArrayItem(
      amount,
      address,
      data,
      status,
    );
    await delay(2000);

    await storageRetriever.addBytesStructMappingItem(
      amount,
      address,
      data,
      status,
    );
    await delay(2000);

    await storageRetriever.addBytesStructNestedMappingItem(
      amount,
      address,
      data,
      status,
    );
    await delay(2000);

    console.log('Completed');
  });

subtask(SUBTASK_SET_STRING_STRUCT)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      deployer,
    );

    const string =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const thirtyTwoBytes = deployer.address;
    const _isCreated = true;

    await storageRetriever.setStringStruct(string, thirtyTwoBytes, _isCreated);
    await delay(2000);

    await storageRetriever.addStringStructArrayItem(
      string,
      thirtyTwoBytes,
      _isCreated,
    );
    await delay(2000);

    await storageRetriever.addStringStructMappingItem(
      string,
      thirtyTwoBytes,
      _isCreated,
    );
    await delay(2000);

    await storageRetriever.addStringStructNestedMappingItem(
      string,
      thirtyTwoBytes,
      _isCreated,
    );
    await delay(2000);

    console.log('Completed');
  });

subtask(SUBTASK_SET_ARRAY_STRUCT)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      deployer,
    );

    const amounts: BigNumber[] = [
      hre.ethers.utils.parseEther('15'),
      hre.ethers.utils.parseUnits('10.34', 6),
      hre.ethers.utils.parseEther('732981'),
    ];
    const addresses: string[] = [
      deployer.address,
      '0xcafecafecafecafecafecafecafecafecafecafe',
    ];
    const status: SomeStatus = SomeStatus.Canceled;

    await storageRetriever.setArrayStruct(amounts, addresses, status);
    await delay(2000);

    await storageRetriever.addArrayStructArrayItem(amounts, addresses, status);
    await delay(2000);

    await storageRetriever.addArrayStructMappingItem(
      amounts,
      addresses,
      status,
    );
    await delay(2000);

    await storageRetriever.addArrayStructNestedMappingItem(
      amounts,
      addresses,
      status,
    );
    await delay(2000);

    console.log('Completed');
  });

subtask(SUBTASK_SET_PARENT_STRUCT)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      deployer,
    );

    const amount: BigNumber = hre.ethers.utils.parseEther('15');
    const address = '0xcafecafecafecafecafecafecafecafecafecafe';
    const functionSignature = '0x9e85053f';
    const number: BigNumber = hre.ethers.utils.parseEther('5656');
    const status: SomeStatus = SomeStatus.NotCreated;

    await storageRetriever.setParentStruct(
      amount,
      address,
      functionSignature,
      number,
      status,
    );
    await delay(2000);

    await storageRetriever.addParentStructArrayItem(
      amount,
      address,
      functionSignature,
      number,
      status,
    );
    await delay(2000);

    await storageRetriever.addParentStructMappingItem(
      amount,
      address,
      functionSignature,
      number,
      status,
    );
    await delay(2000);

    await storageRetriever.addParentStructNestedMappingItem(
      amount,
      address,
      functionSignature,
      number,
      status,
    );
    await delay(2000);

    console.log('Completed');
  });
