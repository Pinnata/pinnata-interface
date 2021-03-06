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

export type AcceptGovernor = ContractEventLog<{
  governor: string;
  0: string;
}>;
export type SetGovernor = ContractEventLog<{
  governor: string;
  0: string;
}>;
export type SetPendingGovernor = ContractEventLog<{
  pendingGovernor: string;
  0: string;
}>;

export interface Governable extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): Governable;
  clone(): Governable;
  methods: {
    acceptGovernor(): NonPayableTransactionObject<void>;

    governor(): NonPayableTransactionObject<string>;

    pendingGovernor(): NonPayableTransactionObject<string>;

    setPendingGovernor(
      _pendingGovernor: string
    ): NonPayableTransactionObject<void>;
  };
  events: {
    AcceptGovernor(cb?: Callback<AcceptGovernor>): EventEmitter;
    AcceptGovernor(
      options?: EventOptions,
      cb?: Callback<AcceptGovernor>
    ): EventEmitter;

    SetGovernor(cb?: Callback<SetGovernor>): EventEmitter;
    SetGovernor(
      options?: EventOptions,
      cb?: Callback<SetGovernor>
    ): EventEmitter;

    SetPendingGovernor(cb?: Callback<SetPendingGovernor>): EventEmitter;
    SetPendingGovernor(
      options?: EventOptions,
      cb?: Callback<SetPendingGovernor>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "AcceptGovernor", cb: Callback<AcceptGovernor>): void;
  once(
    event: "AcceptGovernor",
    options: EventOptions,
    cb: Callback<AcceptGovernor>
  ): void;

  once(event: "SetGovernor", cb: Callback<SetGovernor>): void;
  once(
    event: "SetGovernor",
    options: EventOptions,
    cb: Callback<SetGovernor>
  ): void;

  once(event: "SetPendingGovernor", cb: Callback<SetPendingGovernor>): void;
  once(
    event: "SetPendingGovernor",
    options: EventOptions,
    cb: Callback<SetPendingGovernor>
  ): void;
}
