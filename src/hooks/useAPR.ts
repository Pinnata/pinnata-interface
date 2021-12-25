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
import MINICHEF_ABI from "src/abis/sushi/MiniChefV2.json";
import { MiniChefV2 } from "src/generated/MiniChefV2";
import WMINICHEF_ABI from "src/abis/dahlia_contracts/WMiniChefV2.json";
import { WMiniChefV2 } from "src/generated/WMiniChefV2";
import COMPLEXREWARDERTIME from "src/abis/sushi/ComplexRewarderTime.json";
import MULTISTAKING from "src/abis/dahlia_contracts/MockMoolaStakingRewards.json"
import { MockMoolaStakingRewards } from "src/generated/MockMoolaStakingRewards";
import WMSTAKING from "src/abis/dahlia_contracts/WMStakingRewards.json"
import { WMStakingRewards } from "src/generated/WMStakingRewards";
import { ComplexRewarderTime } from "src/generated/ComplexRewarderTime";
import { Bank, FarmType, sushiLPadd } from "src/config";

const enum TokenType {
  Oracle,
  Sushi
}

export const useAPR = (lp: string, wrapper: string, type: FarmType) => {
  const { kit, network } = useContractKit();
  const scale = toBN(2).pow(toBN(112));
  const secondsPerYear = toBN(31540000);
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
    const oracle = await bank.methods.oracle().call();
    
    const proxyOracle = new kit.web3.eth.Contract(
      PROXYORACLE_ABI.abi as AbiItem[],
      oracle
    ) as unknown as ProxyOracle;
  
    const coreOracle = new kit.web3.eth.Contract(
      COREORACLE_ABI.abi as AbiItem[],
      (await proxyOracle.methods.source().call())
    ) as unknown as CoreOracle;

    const sushiLP = (new kit.web3.eth.Contract(
      UNI_PAIR.abi as AbiItem[],
      sushiLPadd,
    ) as unknown) as IUniswapV2Pair;

    const price = async (token: string, tokenType: TokenType) => {
      if (tokenType === TokenType.Oracle) {
        return toBN(await coreOracle.methods.getCELOPx(token).call())
      } else {
        let reserveS: any;
        let reserveC: any;
        const getReserves = await sushiLP.methods.getReserves().call();
        if (
          getAddress(await sushiLP.methods.token0().call()) ===
          getAddress(token)
        ) {
        reserveS = toBN(getReserves.reserve0);
        reserveC = toBN(getReserves.reserve1);
        } else {
        reserveS = toBN(getReserves.reserve1);
        reserveC = toBN(getReserves.reserve0);
        }
        return reserveC.mul(scale).div(reserveS);
      }
    };

    const pairLP = (new kit.web3.eth.Contract(
      UNI_PAIR.abi as AbiItem[],
      lp,
    ) as unknown) as IUniswapV2Pair;

    if (type === FarmType.SushiSwap) {

      const wminichef = new kit.web3.eth.Contract(
          WMINICHEF_ABI.abi as AbiItem[],
          wrapper,
      ) as unknown as WMiniChefV2;
  
      const minichef = new kit.web3.eth.Contract(
          MINICHEF_ABI.abi as AbiItem[],
          (await wminichef.methods.chef().call()),
      ) as unknown as MiniChefV2;
  
      const rewarder = new kit.web3.eth.Contract(
        COMPLEXREWARDERTIME.abi as AbiItem[],
        (await minichef.methods.rewarder('3').call()),
      ) as unknown as ComplexRewarderTime;
      const lpPrice = await price(lp, TokenType.Oracle)
      const amountDeposited = toBN(await pairLP.methods.balanceOf(await wminichef.methods.chef().call()).call())
  
      let valueDeposited = amountDeposited.mul(lpPrice).div(scale)
      const sushiPerSecond = toBN(await minichef.methods.sushiPerSecond().call());
      const totalAlloc = toBN(await minichef.methods.totalAllocPoint().call())
      const { allocPoint } = await minichef.methods.poolInfo('3').call()
      const length = await minichef.methods.poolLength().call()
      const sushiReward = toBN(allocPoint).mul(sushiPerSecond).mul(secondsPerDay).mul(toBN(365)).div(totalAlloc);
      const sushi = await minichef.methods.SUSHI().call();
      const sushiPrice = await price(sushi, TokenType.Sushi)
      const celo = sushiReward.mul(sushiPrice).div(scale)
      let sum = 0
      for (let i = 0; i < Number(length); i += 1) {
        let info = await rewarder.methods.poolInfo(String(i)).call()
        sum += Number(info.allocPoint)
      }
      const rewardPerSecond = toBN(await rewarder.methods.rewardPerSecond().call());
      const rewardInfo = await rewarder.methods.poolInfo('3').call()
      const externalRewards = toBN(rewardInfo.allocPoint).mul(rewardPerSecond).mul(secondsPerYear).div(toBN(sum));
      let apr = (celo.add(externalRewards).mul(toBN(10).pow(toBN(18))).div(valueDeposited))
      return Number(fromWei(apr)) * 100;
    } else {
      let externalRewards = toBN(0)
      const wmstaking = (new kit.web3.eth.Contract(
        WMSTAKING.abi as AbiItem[],
        wrapper,
      ) as unknown) as WMStakingRewards
      let stakingAddress = await wmstaking.methods.staking().call()
      const depth = Number(await wmstaking.methods.depth().call())
      let amountDeposited = toBN(0)
      let staking = (new kit.web3.eth.Contract(
        MULTISTAKING.abi as AbiItem[],
        stakingAddress,
      ) as unknown) as MockMoolaStakingRewards;

      for (let i = 0; i < depth; i += 1) {
        if (i < depth - 1) {
          stakingAddress = await staking.methods.externalStakingRewards().call()
          staking = (new kit.web3.eth.Contract(
            MULTISTAKING.abi as AbiItem[],
            stakingAddress,
          ) as unknown) as MockMoolaStakingRewards;
          const rewardToken = await staking.methods.rewardsToken().call()
          const rate = toBN(await staking.methods.rewardRate().call())
          const rewardPrice = await price(rewardToken, TokenType.Oracle)
          externalRewards = externalRewards.add(rewardPrice.mul(rate).mul(secondsPerYear))
        } else {
          amountDeposited = toBN(await pairLP.methods.balanceOf(stakingAddress).call())
        }
      }
      let valueDeposited = (await price(lp, TokenType.Oracle)).mul(amountDeposited)
      let apr = externalRewards.mul(toBN(10).pow(toBN(18))).div(valueDeposited)
      return Number(fromWei(apr)) * 100;
    }
  }, [bank, kit.web3.eth.Contract, lp, scale, secondsPerDay, secondsPerYear, wrapper]);
  return useAsyncState(null, call);
};
