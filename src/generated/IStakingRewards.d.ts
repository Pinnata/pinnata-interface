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

export interface IStakingRewards extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): IStakingRewards;
  clone(): IStakingRewards;
  methods: {
    balanceOf(account: string): NonPayableTransactionObject<string>;

    earned(account: string): NonPayableTransactionObject<string>;

    exit(): NonPayableTransactionObject<void>;

    getReward(): NonPayableTransactionObject<void>;

    getRewardForDuration(): NonPayableTransactionObject<string>;

    lastTimeRewardApplicable(): NonPayableTransactionObject<string>;

    rewardPerToken(): NonPayableTransactionObject<string>;

    stake(amount: number | string | BN): NonPayableTransactionObject<void>;

    totalSupply(): NonPayableTransactionObject<string>;

    withdraw(amount: number | string | BN): NonPayableTransactionObject<void>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
