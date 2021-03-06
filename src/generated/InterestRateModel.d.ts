/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export interface InterestRateModel extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): InterestRateModel;
  clone(): InterestRateModel;
  methods: {
    getBorrowRate(
      cash: number | string | BN,
      borrows: number | string | BN,
      reserves: number | string | BN
    ): NonPayableTransactionObject<string>;

    getSupplyRate(
      cash: number | string | BN,
      borrows: number | string | BN,
      reserves: number | string | BN,
      reserveFactorMantissa: number | string | BN
    ): NonPayableTransactionObject<string>;

    isInterestRateModel(): NonPayableTransactionObject<boolean>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
