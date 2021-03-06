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

export interface MockCErc20 extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): MockCErc20;
  clone(): MockCErc20;
  methods: {
    balanceOf(user: string): NonPayableTransactionObject<string>;

    borrow(
      borrowAmount: number | string | BN
    ): NonPayableTransactionObject<string>;

    borrowBalanceCurrent(account: string): NonPayableTransactionObject<string>;

    borrowBalanceStored(account: string): NonPayableTransactionObject<string>;

    borrows(arg0: string): NonPayableTransactionObject<string>;

    decimals(): NonPayableTransactionObject<string>;

    interestPerYear(): NonPayableTransactionObject<string>;

    lastBlock(arg0: string): NonPayableTransactionObject<string>;

    mint(mintAmount: number | string | BN): NonPayableTransactionObject<string>;

    redeem(
      redeemTokens: number | string | BN
    ): NonPayableTransactionObject<string>;

    repayBorrow(
      repayAmount: number | string | BN
    ): NonPayableTransactionObject<string>;

    token(): NonPayableTransactionObject<string>;

    underlying(): NonPayableTransactionObject<string>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
