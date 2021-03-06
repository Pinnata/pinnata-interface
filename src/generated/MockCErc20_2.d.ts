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

export interface MockCErc202 extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): MockCErc202;
  clone(): MockCErc202;
  methods: {
    balanceOf(arg0: string): NonPayableTransactionObject<string>;

    decimals(): NonPayableTransactionObject<string>;

    mint(mintAmount: number | string | BN): NonPayableTransactionObject<string>;

    mintRate(): NonPayableTransactionObject<string>;

    redeem(
      redeemAmount: number | string | BN
    ): NonPayableTransactionObject<string>;

    setMintRate(
      _mintRate: number | string | BN
    ): NonPayableTransactionObject<void>;

    token(): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    underlying(): NonPayableTransactionObject<string>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
