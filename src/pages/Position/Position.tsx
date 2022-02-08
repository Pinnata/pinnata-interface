import React, { useEffect, useState } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { AbiItem } from "web3-utils";
import { HomoraBank } from "src/generated/HomoraBank";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import { getAddress } from "ethers/lib/utils";
import { Bank } from "src/config";
import { useAsyncState } from "src/hooks/useAsyncState";
import { FARMS } from "src/config";
import { PositionEntry } from "src/pages/Position/PositionEntry";

import { IERC20Wrapper } from "src/generated/IERC20Wrapper";
import IERC20W_ABI from "src/abis/dahlia_contracts/IERC20Wrapper.json";
import { Spinner } from "theme-ui";

import { Container } from "theme-ui";
import { Header } from "src/components/Header";
import { Dictionary } from "@reduxjs/toolkit";

export type positionResult = {
  collToken: string;
  collId: string;
  collateralSize: string;
  farm: any;
  positionId: number;
}

export const Position = () => {
  const { kit, address, network } = useContractKit();

  const bank = React.useMemo(
    () =>
      new kit.web3.eth.Contract(
        BANK_ABI.abi as AbiItem[],
        getAddress(Bank[network.chainId])
      ) as unknown as HomoraBank,
    [kit]
  );
  const accountToIndices: Dictionary<number[]> = {};
  const call = React.useCallback(async () => {
    try {
      const info: positionResult[] = [];
      const nextPositionId = await bank.methods.nextPositionId().call();
      let batch = [];
      let i = 1;
      for (i; i < Number(nextPositionId); i += 1) {
        batch = [];
        let j = 0;
        for (j; j < 5; j+= 1){
          batch.push(bank.methods.getPositionInfo(i + j).call());
        }
        await bank.methods.getPositionInfo(i + j).call().then(async (result) => {
          accountToIndices[result.owner] = (accountToIndices[result.owner] ?? []).concat([i])
          
        })
      }
      console.log('accountToIndices ', accountToIndices);

      console.log(batch.length, batch)
      
      console.log('promiseResults: ', info);
      return info;
    } catch (error) {
      console.log(error);
    }
  }, [bank.methods, address, kit.web3.eth.Contract]);

  const [info] = useAsyncState(null, call);

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-green-100 w-full">
      <Container className="flex-grow">
        <Header />
        <section className="max-w-screen-xl mx-auto">
          <div className="w-full text-center md:pb-0 pb-2 pt-2">
            <h2 className="tracking-tightest font-bold text-gray-700 text-5xl my-2">
              Manage your positions with ease.
            </h2>
          </div>

          {info && info.length > 0 ? (
            <section className="md:flex md:m-4 md:justify-center w-full md:flex-wrap">
              {info.map((x) => (
                <PositionEntry
                  key={x.positionId}
                  collId={x.collId}
                  collateralSize={x.collateralSize}
                  positionId={x.positionId}
                  pool={x.farm!}
                  collToken={x.collToken}
                />
              ))}
            </section>
          ) : info && info.length === 0 ? (
            <div className="bg-gray-100 rounded-sm p-4 flex justify-center items-center h-24 w-full mt-6">
              <p className="font-bold tracking-tight text-3xl">
                You have no open positions at this time.
              </p>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          )}
        </section>
      </Container>
    </main>
  );
};
