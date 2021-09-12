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

export interface ICurveRegistry extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): ICurveRegistry;
  clone(): ICurveRegistry;
  methods: {
    get_coins(pool: string): NonPayableTransactionObject<string[]>;

    get_gauges(pool: string): NonPayableTransactionObject<{
      0: string[];
      1: string[];
    }>;

    get_lp_token(pool: string): NonPayableTransactionObject<string>;

    get_n_coins(lp: string): NonPayableTransactionObject<{
      0: string;
      1: string;
    }>;

    get_pool_from_lp_token(lp: string): NonPayableTransactionObject<string>;

    pool_list(id: number | string | BN): NonPayableTransactionObject<string>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
