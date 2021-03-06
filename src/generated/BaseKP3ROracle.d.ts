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

export interface BaseKP3ROracle extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): BaseKP3ROracle;
  clone(): BaseKP3ROracle;
  methods: {
    MAX_TWAP_TIME(): NonPayableTransactionObject<string>;

    MIN_TWAP_TIME(): NonPayableTransactionObject<string>;

    celo(): NonPayableTransactionObject<string>;

    currentPx0Cumu(pair: string): NonPayableTransactionObject<string>;

    currentPx1Cumu(pair: string): NonPayableTransactionObject<string>;

    factory(): NonPayableTransactionObject<string>;

    kp3r(): NonPayableTransactionObject<string>;

    mcelo(): NonPayableTransactionObject<string>;

    price0TWAP(pair: string): NonPayableTransactionObject<string>;

    price1TWAP(pair: string): NonPayableTransactionObject<string>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
