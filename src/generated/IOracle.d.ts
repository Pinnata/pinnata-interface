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

export interface IOracle extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): IOracle;
  clone(): IOracle;
  methods: {
    asETHBorrow(
      token: string,
      amount: number | string | BN,
      owner: string
    ): NonPayableTransactionObject<string>;

    asETHCollateral(
      token: string,
      id: number | string | BN,
      amount: number | string | BN,
      owner: string
    ): NonPayableTransactionObject<string>;

    convertForLiquidation(
      tokenIn: string,
      tokenOut: string,
      tokenOutId: number | string | BN,
      amountIn: number | string | BN
    ): NonPayableTransactionObject<string>;

    support(token: string): NonPayableTransactionObject<boolean>;

    supportWrappedToken(
      token: string,
      id: number | string | BN
    ): NonPayableTransactionObject<boolean>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
