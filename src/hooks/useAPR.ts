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
import MINICHEF_ABI from "src/abis/dahlia_contracts/IMiniChefV2.json";
import { IMiniChefV2 } from "src/generated/IMiniChefV2";
import WMINICHEF_ABI from "src/abis/dahlia_contracts/WMiniChefV2.json";
import { WMiniChefV2 } from "src/generated/WMiniChefV2";
import { Bank } from "src/config";
import BN from "bn.js";


export const useAPR = (lp: string, wrapper: string) => {
  const { kit, network } = useContractKit();
  const scale = toBN(2).pow(toBN(112));
  const secondsPerDay = toBN(86400);


  const bank = React.useMemo(
    () =>
      new kit.web3.eth.Contract(
        BANK_ABI.abi as AbiItem[],
        getAddress(Bank[network.chainId])
      ) as unknown as HomoraBank,
    [kit, network]
  );

  const call = React.useCallback(async () => {
    if (!lp || !isAddress(lp) || !wrapper || !isAddress(wrapper)) {
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

    const wminichef = new kit.web3.eth.Contract(
        WMINICHEF_ABI.abi as AbiItem[],
        wrapper,
    ) as unknown as WMiniChefV2;

    const minichef = new kit.web3.eth.Contract(
        MINICHEF_ABI.abi as AbiItem[],
        (await wminichef.methods.chef().call()),
    ) as unknown as IMiniChefV2;
    
    const lpPrice = toBN(await coreOracle.methods.getCELOPx(lp).call())
    const totalSupply = toBN(await LP.methods.totalSupply().call());

    const valueDeposited = Number(fromWei(totalSupply)) *
    (Number(fromWei(lpPrice)) / Number(fromWei(scale)))
    const sushiPerSecond = toBN(await minichef.methods.sushiPerSecond().call());
    const totalAlloc = toBN(await minichef.methods.totalAllocPoint().call())
    const { allocPoint } = await minichef.methods.poolInfo('3').call()
    const sushiReward = toBN(allocPoint).mul(sushiPerSecond).mul(secondsPerDay).div(totalAlloc);
    const sushi = await minichef.methods.SUSHI().call();

    let reserveS: any;
    let reserveC: any;
    const getReserves = await LP.methods.getReserves().call();
    if (
    getAddress(await LP.methods.token0().call()) ===
    getAddress(sushi)
    ) {
    reserveS = toBN(getReserves.reserve0);
    reserveC = toBN(getReserves.reserve1);
    } else {
    reserveS = toBN(getReserves.reserve1);
    reserveC = toBN(getReserves.reserve0);
    }

    const celo = sushiReward.mul(reserveC).div(reserveS);

    console.log(Number(fromWei(celo)) / valueDeposited);

    return null;
  }, [bank.methods, kit.web3.eth.Contract, lp, wrapper]);
  return useAsyncState(null, call);
};
