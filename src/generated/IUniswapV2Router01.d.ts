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

export interface IUniswapV2Router01 extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): IUniswapV2Router01;
  clone(): IUniswapV2Router01;
  methods: {
    addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: number | string | BN,
      amountBDesired: number | string | BN,
      amountAMin: number | string | BN,
      amountBMin: number | string | BN,
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<{
      amountA: string;
      amountB: string;
      liquidity: string;
      0: string;
      1: string;
      2: string;
    }>;

    factory(): NonPayableTransactionObject<string>;

    getAmountIn(
      amountOut: number | string | BN,
      reserveIn: number | string | BN,
      reserveOut: number | string | BN
    ): NonPayableTransactionObject<string>;

    getAmountOut(
      amountIn: number | string | BN,
      reserveIn: number | string | BN,
      reserveOut: number | string | BN
    ): NonPayableTransactionObject<string>;

    getAmountsIn(
      amountOut: number | string | BN,
      path: string[]
    ): NonPayableTransactionObject<string[]>;

    getAmountsOut(
      amountIn: number | string | BN,
      path: string[]
    ): NonPayableTransactionObject<string[]>;

    quote(
      amountA: number | string | BN,
      reserveA: number | string | BN,
      reserveB: number | string | BN
    ): NonPayableTransactionObject<string>;

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: number | string | BN,
      amountAMin: number | string | BN,
      amountBMin: number | string | BN,
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<{
      amountA: string;
      amountB: string;
      0: string;
      1: string;
    }>;

    removeLiquidityWithPermit(
      tokenA: string,
      tokenB: string,
      liquidity: number | string | BN,
      amountAMin: number | string | BN,
      amountBMin: number | string | BN,
      to: string,
      deadline: number | string | BN,
      approveMax: boolean,
      v: number | string | BN,
      r: string | number[],
      s: string | number[]
    ): NonPayableTransactionObject<{
      amountA: string;
      amountB: string;
      0: string;
      1: string;
    }>;

    swapExactTokensForTokens(
      amountIn: number | string | BN,
      amountOutMin: number | string | BN,
      path: string[],
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<string[]>;

    swapTokensForExactTokens(
      amountOut: number | string | BN,
      amountInMax: number | string | BN,
      path: string[],
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<string[]>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
