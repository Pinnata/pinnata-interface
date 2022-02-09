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

  const tempAddress = "0xb4B2E8c6c91e8c1662Bf5aE9aD6e9649aE84b895";

  const bank = React.useMemo(
    () =>
      new kit.web3.eth.Contract(
        BANK_ABI.abi as AbiItem[],
        getAddress(Bank[network.chainId])
      ) as unknown as HomoraBank,
    [kit]
  );
  const call = React.useCallback(async () => {
    try {
      const walletToPositions: {[id: string]: number[]} = {"0xE4900911eDE976942102D273cF724674DeB70712":[1,62],
                            "0x59A6AbC89C158ef88d5872CaB4aC3B08474883D9":[2,3,4,10,44,65],
                            "0xB85ae9ef84542BBdead9D4cA9ee8d237b214d13a":[5],
                            "0xE99f3CA693c9E96B01F4158E252A3041b4d74A59":[6],
                            "0x9741c95A03F2e2033560A6d2a140D5D23DBDDdd4":[7,43,46],
                            "0xb4B2E8c6c91e8c1662Bf5aE9aD6e9649aE84b895":[8,14,27,29,30],
                            "0x738173e1cDf4A4c785dc63C6987a1Fd3bBfB3Aff":[9,15],
                            "0x1F7065133cE6a138edc59cC67D19A8e203194DE5":[11],
                            "0xD9AbE4890507bC7B039031f06E44BC95A94866Ee":[12,18,56]};
      const positions = [470,475,480,485,490,495,500,505,510,515,520,525];
      console.log(positions);
      const info: any[] = [];
      let batch: Promise<any>[] = [];
      positions?.forEach((positionId) => {
        batch.push(bank.methods.getPositionInfo(positionId).call());
      })
      console.log(batch);
      await Promise.all(batch).then( async (positionInfoList) => {
        console.log(positionInfoList)
        positionInfoList.forEach(async (positionInfo, index) => {
          console.log(positionInfo)
          const wrapper = new kit.web3.eth.Contract(
            IERC20W_ABI.abi as AbiItem[],
            positionInfo!.collToken
          ) as unknown as IERC20Wrapper;
          for (let farm of FARMS) {
            
              info.push({
                collId: positionInfo!.collId,
                collateralSize: positionInfo!.collateralSize,
                collToken: positionInfo!.collToken,
                positionId: positions[index],
                farm: farm,
              });
              break;
            
          }
        }); 
      });
      return info;
    } catch (error) {
      console.log(error);
    }
  }, [bank.methods, tempAddress, kit.web3.eth.Contract]);

  const [info] = useAsyncState(null, call);

  console.log(info)
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
