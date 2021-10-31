import React from "react";
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

export const Position = () => {
  const { kit, address } = useContractKit();

  const bank = React.useMemo(
    () =>
      new kit.web3.eth.Contract(
        BANK_ABI.abi as AbiItem[],
        getAddress(Bank[44787])
      ) as unknown as HomoraBank,
    [kit]
  );

  const call = React.useCallback(async () => {
    try {
      const info = [];
      const nextPositionId = await bank.methods.nextPositionId().call();
      let batch = [];
      for (let i = 1; i < Number(nextPositionId); i += 1) {
        batch.push(bank.methods.getPositionInfo(i).call());
      }
      const results = await Promise.all(batch);
      for (let i = 0; i < Number(nextPositionId); i += 1) {
        const positionId = i + 1;
        const positionInfo = results[i];
        if (
          positionInfo &&
          positionInfo!.owner.toLowerCase() === address!.toLowerCase()
        ) {
          const wrapper = new kit.web3.eth.Contract(
            IERC20W_ABI.abi as AbiItem[],
            positionInfo!.collToken
          ) as unknown as IERC20Wrapper;
          const underlying = await wrapper.methods
            .getUnderlyingToken(positionInfo!.collId)
            .call();
          for (let farm of FARMS) {
            if (
              getAddress(underlying) === farm.lp &&
              positionInfo!.collateralSize !== "0"
            ) {
              info.push({
                collId: positionInfo!.collId,
                collateralSize: positionInfo!.collateralSize,
                collToken: positionInfo!.collToken,
                positionId: positionId,
                farm: farm,
              });
              break;
            }
          }
        }
      }
      return info;
    } catch (error) {
      console.log(error);
    }
  }, [bank.methods, address, kit.web3.eth.Contract]);

  const [info] = useAsyncState(null, call);
  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="w-full text-center md:pb-0 pb-2 pt-2">
        <h2 className="tracking-tightest font-bold text-gray-700 text-5xl my-2">
          Manage your positions with ease.
        </h2>
      </div>

      {info ? (
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
      ) : (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      )}
    </section>
  );
};
