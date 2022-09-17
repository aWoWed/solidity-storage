import { BigNumber } from 'ethers';

export enum SomeStatus {
  NotCreated,
  Canceled,
  Active,
  Executed,
}

export class OneStorageSlotStruct {
  oneByteNumber: number;
  eightBytesNumber: number;
  status: SomeStatus;

  constructor(
    oneByteNumber: number,
    eightBytesNumber: number,
    status: SomeStatus,
  ) {
    this.oneByteNumber = oneByteNumber;
    this.eightBytesNumber = eightBytesNumber;
    this.status = status;
    console.log(
      `OneStorageSlotStruct {\n\toneByteNumber: ${oneByteNumber}\n\teightBytesNumber: ${eightBytesNumber}\n\tstatus: ${status}\n}`,
    );
  }
}

export class BytesStruct {
  amount: BigNumber;
  someAddress: string;
  data: string;
  status: SomeStatus;

  constructor(
    amount: BigNumber,
    someAddress: string,
    data: string,
    status: SomeStatus,
  ) {
    this.amount = amount;
    this.someAddress = someAddress;
    this.data = data;
    this.status = status;
    console.log(
      `BytesStruct {\n\tamount: ${amount}\n\tsomeAddress: ${someAddress}\n\tdata: ${data}\n\tstatus: ${status}\n}`,
    );
  }
}

export class StringStruct {
  str: string;
  thirtyTwoBytes: string;
  isCreated: boolean;

  constructor(str: string, thirtyTwoBytes: string, isCreated: boolean) {
    this.str = str;
    this.thirtyTwoBytes = thirtyTwoBytes;
    this.isCreated = isCreated;
    console.log(
      `StringStruct {\n\tstr: ${str}\n\tthirtyTwoBytes: ${thirtyTwoBytes}\n\tisCreated: ${isCreated}\n}`,
    );
  }
}

export class ArrayStruct {
  addresses: string[];
  amounts: BigNumber[];
  status: SomeStatus;

  constructor(addresses: string[], amounts: BigNumber[], status: SomeStatus) {
    this.addresses = addresses;
    this.amounts = amounts;
    this.status = status;
    console.log(
      `ArrayStruct {\n\taddresses: [ ${addresses} ]\n\tamounts: [ ${amounts} ]\n\tstatus: ${status}\n}`,
    );
  }
}

export class ChildStruct {
  amount: BigNumber;
  someAddress: string;
  functionSignature: string;

  constructor(
    amount: BigNumber,
    someAddress: string,
    functionSignature: string,
  ) {
    this.amount = amount;
    this.someAddress = someAddress;
    this.functionSignature = functionSignature;
  }
}

export class ParentStruct {
  childStruct: ChildStruct;
  number: BigNumber;
  status: SomeStatus;

  constructor(
    amount: BigNumber,
    someAddress: string,
    functionSignature: string,
    number: BigNumber,
    status: SomeStatus,
  ) {
    this.childStruct = new ChildStruct(amount, someAddress, functionSignature);
    this.number = number;
    this.status = status;
    console.log(
      `ParentStruct {\n\tchildStruct: {\n\t\tamount: ${amount};\n\t\tsomeAddress: ${someAddress}\n\t\tfunctionSignature: ${functionSignature}\n\t}\n\tnumber: ${number}\n\tstatus: ${status}\n}`,
    );
  }
}
