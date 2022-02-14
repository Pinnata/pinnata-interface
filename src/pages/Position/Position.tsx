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

const jsonURL = 'https://pinnata.s3.us-west-1.amazonaws.com/positions.json';

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
  const call = React.useCallback(async () => {
    try {
      let positions: number[] = [];
      await fetch(jsonURL).then(async function(res) {
        const jsonText = await res.text();
        const json = JSON.parse(jsonText);
        positions = json[address ?? ''];
    },
    function(rej) {
        console.log("promise rejected", rej);
        throw 'promise rejected';
    })
      const info: any[] = [];
      let batch: Promise<any>[] = [];
      positions?.forEach((positionId) => {
        batch.push(bank.methods.getPositionInfo(positionId).call());
      })
      await Promise.all(batch).then( async (positionInfoList) => {
        await positionInfoList.forEach(async (positionInfo, index) => {
          for (let farm of FARMS) {
            if (
              getAddress(positionInfo!.collToken) === farm.wrapper && positionInfo?.collateralSize !== '0'){
              info.push({
                collId: positionInfo!.collId,
                collateralSize: positionInfo!.collateralSize,
                collToken: positionInfo!.collToken,
                positionId: positions[index],
                farm: farm,
              });
              break;
            }
          }
        }); 
      });
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
