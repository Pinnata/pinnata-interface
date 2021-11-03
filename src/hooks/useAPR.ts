import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

import UNI_PAIR from "src/abis/dahlia_contracts/dependencies/ubeswap/ubeswap@mainnet-v1/IUniswapV2Pair.json";
import { IUniswapV2Pair } from "src/generated/IUniswapV2Pair";
import { useAsyncState } from "src/hooks/useAsyncState";
import { isAddress, toBN, AbiItem, fromWei } from "web3-utils";
import { getAddress } from "ethers/lib/utils";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import PROXYORACLE_ABI from "src/abis/dahlia_contracts/ProxyOracle.json";
import COREORACLE_ABI from "src/abis/dahlia_contracts/CoreOracle.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { ProxyOracle } from "src/generated/ProxyOracle";
import { CoreOracle } from "src/generated/CoreOracle";
import { Bank } from "src/config";

export const useAPR = (lp: string, minichef: string) => {
  const { kit, network } = useContractKit();
  const scale = toBN(2).pow(toBN(112));


  const bank = React.useMemo(
    () =>
      new kit.web3.eth.Contract(
        BANK_ABI.abi as AbiItem[],
        getAddress(Bank[network.chainId])
      ) as unknown as HomoraBank,
    [kit, network]
  );

  const call = React.useCallback(async () => {
    if (!lp || !isAddress(lp) || !minichef || !isAddress(minichef)) {
      return null;
    }
    const LP = (new kit.web3.eth.Contract(
      UNI_PAIR.abi as AbiItem[],
      getAddress(lp),
    ) as unknown) as IUniswapV2Pair;

    const oracle = await bank.methods.oracle().call();
    const proxyOracle = new kit.web3.eth.Contract(
      PROXYORACLE_ABI.abi as AbiItem[],
      oracle
    ) as unknown as ProxyOracle;
    const source = await proxyOracle.methods.source().call();
    const coreOracle = new kit.web3.eth.Contract(
      COREORACLE_ABI.abi as AbiItem[],
      source
    ) as unknown as CoreOracle;
    
    const lpPrice = toBN(await coreOracle.methods.getCELOPx(lp).call())
    const totalSupply = toBN(await LP.methods.totalSupply().call());

    const valueDeposited = Number(fromWei(totalSupply)) *
    (Number(fromWei(lpPrice)) / Number(fromWei(scale)))


    console.log(valueDeposited)
    return null;
  }, [bank.methods, kit.web3.eth.Contract, lp, minichef]);
  return useAsyncState(null, call);
};
