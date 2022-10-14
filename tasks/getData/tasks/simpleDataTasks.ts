import { BigNumber } from 'ethers';
import { task, types } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';

import {
  convertToString,
  getVariableFromMulltiSlot,
  logGetter,
  logSlot,
} from '../../common/functions';
import {
  GET_SLOT_0_OWNER_ADDRESS,
  GET_SLOT_1_CHILD_NUMBER_UINT256,
  GET_SLOT_2_THIRTY_TWO_BYTES_NUMBER,
  GET_SLOT_3_MANY_NUMBERS,
  GET_SLOT_4_DEPLOYER_ADDRESS,
  GET_SLOT_5_MANY_VARIABLES,
  GET_SLOT_6_BYTES_VARIABLES,
  GET_SLOT_7_BYTES32,
  GET_STORAGE_SLOTS,
} from '../task-names';

task(GET_STORAGE_SLOTS)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    // overall 64 slots(because of structs)
    for (let index = 0; index <= 64; index++) {
      console.log(
        `[${index}]` +
          (await hre.ethers.provider.getStorageAt(
            params.storageRetriever,
            index,
          )),
      );
    }
  });

task(GET_SLOT_0_OWNER_ADDRESS)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const storageIndex = 0;
    const ownerFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );
    const owner = await storageRetriever.owner();

    logSlot(`Slot ${storageIndex} address`, ownerFromStorage);
    logGetter('Owner', owner);
  });

task(GET_SLOT_1_CHILD_NUMBER_UINT256)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 1;
    const childNumberFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );
    const childNumber = await storageRetriever.childNumber();

    logSlot(
      `Slot ${storageIndex} uint256`,
      BigNumber.from(childNumberFromStorage),
    );
    logGetter('ChildNumber', childNumber);
  });

task(GET_SLOT_2_THIRTY_TWO_BYTES_NUMBER)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 2;
    const thirtyTwoBytesNumberFromStorage =
      await hre.ethers.provider.getStorageAt(
        params.storageRetriever,
        storageIndex,
      );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );
    const thirtyTwoBytesNumber =
      await storageRetriever.getThirtyTwoBytesNumber();

    logSlot(
      `Slot ${storageIndex} uint256`,
      BigNumber.from(thirtyTwoBytesNumberFromStorage),
    );
    logGetter('ThirtyTwoBytesNumber', thirtyTwoBytesNumber);
  });

task(GET_SLOT_3_MANY_NUMBERS)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 3;
    const manyNumbersFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );
    const sixteenBytesNumberFromStorage = getVariableFromMulltiSlot(
      manyNumbersFromStorage,
      32,
      0,
    );
    const eightBytesNumberFromStorage = getVariableFromMulltiSlot(
      manyNumbersFromStorage,
      48,
      32,
    );
    const fourBytesNumberFromStorage = getVariableFromMulltiSlot(
      manyNumbersFromStorage,
      56,
      48,
    );
    const twoBytesNumberFromStorage = getVariableFromMulltiSlot(
      manyNumbersFromStorage,
      60,
      56,
    );
    const oneByteNumberFromStorage = getVariableFromMulltiSlot(
      manyNumbersFromStorage,
      62,
      60,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );
    const sixteenBytesNumber = await storageRetriever.getSixteenBytesNumber();
    const eightBytesNumber = await storageRetriever.getEightBytesNumber();
    const fourBytesNumber = await storageRetriever.getFourBytesNumber();
    const twoBytesNumber = await storageRetriever.getTwoBytesNumber();
    const oneByteNumber = await storageRetriever.getOneByteNumber();

    logSlot(`Slot ${storageIndex}`, manyNumbersFromStorage);

    logSlot(
      `Separated Slot ${storageIndex} uint128`,
      BigNumber.from(sixteenBytesNumberFromStorage),
    );
    logSlot(
      `Separated Slot ${storageIndex} uint64`,
      BigNumber.from(eightBytesNumberFromStorage),
    );
    logSlot(
      `Separated Slot ${storageIndex} uint32`,
      BigNumber.from(fourBytesNumberFromStorage),
    );
    logSlot(
      `Separated Slot ${storageIndex} uint16`,
      BigNumber.from(twoBytesNumberFromStorage),
    );
    logSlot(
      `Separated Slot ${storageIndex} uint8`,
      BigNumber.from(oneByteNumberFromStorage),
    );

    logGetter('SixteenBytesNumber', sixteenBytesNumber);
    logGetter('EightBytesNumber', eightBytesNumber);
    logGetter('FourBytesNumber', fourBytesNumber);
    logGetter('TwoBytesNumber', twoBytesNumber);
    logGetter('OneByteNumber', oneByteNumber);
  });

task(GET_SLOT_4_DEPLOYER_ADDRESS)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 4;
    const deployerAddressFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );
    const deployerAddress = await storageRetriever.getDeployerAddress();

    logSlot(`Slot ${storageIndex}`, deployerAddressFromStorage);
    logGetter('DeployerAddress', deployerAddress);
  });

task(GET_SLOT_5_MANY_VARIABLES)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 5;
    const manyVariablesFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );
    const payableAddressFromStorage = getVariableFromMulltiSlot(
      manyVariablesFromStorage,
      40,
      0,
    );
    const isDeployedFromStorage = getVariableFromMulltiSlot(
      manyVariablesFromStorage,
      42,
      40,
    );
    const isNotDeployedFromStorage = getVariableFromMulltiSlot(
      manyVariablesFromStorage,
      44,
      42,
    );
    const functionSignatureFromStorage = getVariableFromMulltiSlot(
      manyVariablesFromStorage,
      52,
      44,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );
    const payableAddress = await storageRetriever.getPayableAddress();
    const isDeployed = await storageRetriever.getIsDeployed();
    const isNotDeployed = await storageRetriever.getIsNotDeployed();
    const functionSignature = await storageRetriever.getFunctionSignature();

    logSlot(`Slot ${storageIndex}`, manyVariablesFromStorage);

    logSlot(
      `Separated Slot ${storageIndex} payable(address)`,
      payableAddressFromStorage,
    );
    logSlot(
      `Separated Slot ${storageIndex} bool(uint8) isDeployed`,
      isDeployedFromStorage,
    );
    logSlot(
      `Separated Slot ${storageIndex} bool(uint8) isNotDeployed`,
      isNotDeployedFromStorage,
    );
    logSlot(
      `Separated Slot ${storageIndex} bytes(4) functionSignature`,
      functionSignatureFromStorage,
    );

    logGetter('PayableAddress', payableAddress);
    logGetter('IsDeployed', isDeployed);
    logGetter('IsNotDeployed', isNotDeployed);
    logGetter('FunctionSignature', functionSignature);
  });

task(GET_SLOT_6_BYTES_VARIABLES)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 6;
    const bytesVariablesFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );
    const eightBytesFromStorage = getVariableFromMulltiSlot(
      bytesVariablesFromStorage,
      16,
      0,
    );
    const sixteenBytesFromStorage = getVariableFromMulltiSlot(
      bytesVariablesFromStorage,
      48,
      16,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );
    const eightBytes = await storageRetriever.getEightBytes();
    const sixteenBytes = await storageRetriever.getSixteenBytes();

    logSlot(`Slot ${storageIndex}`, bytesVariablesFromStorage);

    logSlot(`Separated Slot ${storageIndex} bytes8`, eightBytesFromStorage);
    logSlot(`Separated Slot ${storageIndex} bytes16`, sixteenBytesFromStorage);

    logSlot(
      `Separated Slot ${storageIndex} bytes8 parsed`,
      convertToString(eightBytesFromStorage),
    );
    logSlot(
      `Separated Slot ${storageIndex} bytes16 parsed`,
      convertToString(sixteenBytesFromStorage),
    );

    logGetter('EightBytes', eightBytes);
    logGetter('SixteenBytes', sixteenBytes);
  });

task(GET_SLOT_7_BYTES32)
  .addParam(
    'storageRetriever',
    'storageRetriever contract address',
    '0x2bb443Dd41267c4AAA413DE4F787B8f2D9d4bc56',
    types.string,
  )
  .setAction(async (params: string, hre) => {
    const [signer] = await hre.ethers.getSigners();

    const storageIndex = 7;
    const thirtyTwoBytesFromStorage = await hre.ethers.provider.getStorageAt(
      params.storageRetriever,
      storageIndex,
    );

    const storageRetriever = await hre.ethers.getContractAt(
      'StorageRetriever',
      params.storageRetriever,
      signer,
    );
    const thirtyTwoBytes = await storageRetriever.getThirtyTwoBytes();

    logSlot(`Slot ${storageIndex}`, thirtyTwoBytesFromStorage);
    logSlot(
      `Separated Slot ${storageIndex} bytes32 parsed`,
      convertToString(thirtyTwoBytesFromStorage),
    );

    logGetter('ThirtyTwoBytes bytes32', thirtyTwoBytes);
  });
