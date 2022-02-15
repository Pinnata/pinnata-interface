import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useAsyncState } from "src/hooks/useAsyncState";
import { isAddress, toBN, AbiItem, fromWei } from "web3-utils";
import { getAddress } from "ethers/lib/utils";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import PROXYORACLE_ABI from "src/abis/dahlia_contracts/ProxyOracle.json";
import COREORACLE_ABI from "src/abis/dahlia_contracts/CoreOracle.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { ProxyOracle } from "src/generated/ProxyOracle";
import { CoreOracle } from "src/generated/CoreOracle";
import {
  Bank,
  scale,
  priceScale,
  COLLATERAL_TOKENS,
} from "src/config";
import { IERC20Wrapper } from "src/generated/IERC20Wrapper";
import IERC20W_ABI from "src/abis/dahlia_contracts/IERC20Wrapper.json";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";
import { CErc20Immutable } from "src/generated/CErc20Immutable";

export const useTVL = () => {
  const { kit, network } = useContractKit();

  const bank = React.useMemo(
    () =>
      new kit.web3.eth.Contract(
        BANK_ABI.abi as AbiItem[],
        getAddress(Bank[network.chainId])
      ) as unknown as HomoraBank,
    [kit, network]
  );
  const call = React.useCallback(async () => {
    const oracle = await bank.methods.oracle().call();

    const proxyOracle = new kit.web3.eth.Contract(
      PROXYORACLE_ABI.abi as AbiItem[],
      oracle
    ) as unknown as ProxyOracle;

    const coreOracle = new kit.web3.eth.Contract(
      COREORACLE_ABI.abi as AbiItem[],
      await proxyOracle.methods.source().call()
    ) as unknown as CoreOracle;
    let sum = toBN(9);
    const nextPositionId = await bank.methods.nextPositionId().call();
    let batch = [];
    for (let i = 1; i < Number(nextPositionId); i += 1) {
      batch.push(bank.methods.getPositionInfo(i).call());
    }
    const results = await Promise.all(batch);


    // for (let i = 0; i < Number(nextPositionId) - 1; i += 1) {
    //   const positionInfo = results[i];
    //   const wrapper = new kit.web3.eth.Contract(
    //     IERC20W_ABI.abi as AbiItem[],
    //     positionInfo!.collToken
    //   ) as unknown as IERC20Wrapper;
    //   const underlying = await wrapper.methods
    //     .getUnderlyingToken(positionInfo?.collId!)
    //     .call();
    //   const price = toBN(await coreOracle.methods.getCELOPx(underlying).call());
    //   sum = sum.add(price.mul(toBN(positionInfo?.collateralSize!)));
    // }
    // for (let i = 0; i < COLLATERAL_TOKENS.length; i += 1) {
    //   const token = COLLATERAL_TOKENS[i]!;
    //   const bankInfo = await bank.methods.getBankInfo(token.address).call();
    //   const cToken = new kit.web3.eth.Contract(
    //     CERC20_ABI as AbiItem[],
    //     bankInfo.cToken
    //   ) as unknown as CErc20Immutable;
    //   const totalSupply = toBN(await cToken.methods.totalSupply().call());
    //   const totalBorrows = toBN(await cToken.methods.totalBorrows().call());
    //   const cash = totalSupply.sub(totalBorrows);
    //   console.log(token.address);

    //   const price = toBN(
    //     await coreOracle.methods.getCELOPx("0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC").call()
    //   );
    //   // sum = sum.add(price.mul(cash));
    // }

    const price = toBN(
      await coreOracle.methods.getCELOPx("0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC").call()
    );

    const usd = toBN(
      await coreOracle.methods
        .getCELOPx(
          COLLATERAL_TOKENS.filter((x) => x.symbol === "cUSD")[0]?.address!
        )
        .call()
    );

    return Number(fromWei(sum.div(usd))) / Number(fromWei(scale));
  }, [bank.methods, kit.web3.eth.Contract]);
  return useAsyncState(null, call, "cacheTVL");
};
