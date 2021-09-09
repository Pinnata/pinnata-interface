import React from "react";
import {
  Button,
  Card,
  Flex,
} from "theme-ui";
import { useContractKit } from "@celo-tools/use-contractkit";
import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import { poolState } from "src/pages/Farm/newFarm/NewFarm";
import { BlockText } from "src/components/BlockText";
import { TokenAmountInfo } from "src/components/TokenAmountInfo";
import { fromWei, toWei, toBN, AbiItem } from "web3-utils";
import { getAddress } from "ethers/lib/utils";
import { useAsyncState } from "src/hooks/useAsyncState";
import BN from 'bn.js';
import { Slider } from "rsuite";
import UNI_PAIR from "src/abis/dahlia_contracts/dependencies/ubeswap/ubeswap@mainnet-v1/IUniswapV2Pair.json"
import { IUniswapV2Pair } from "src/generated/IUniswapV2Pair";
import { removePage, removePageState, removePositionState } from "./remove";

interface removeProps {
  existingBalance: BN[] | null; 
  remove: BN[] | null;
  removeLp: BN | null;
}

const emptyRemoveState : removeProps = {
  existingBalance: null,
  remove: null,
  removeLp: null,
}

export const removeRemoveState = atom({
  key: 'removeRemoveState',
  default: emptyRemoveState
})

export const RemoveTokens: React.FC = () => {
  const [pool] = useRecoilState(poolState);
  const setPage = useSetRecoilState(removePageState)
  const [per, setPer] = React.useState(50); 
  const [position] = useRecoilState(removePositionState); 
  const setRemove = useSetRecoilState(removeRemoveState)

  const { kit } = useContractKit();

  const lp = React.useMemo(() => (new kit.web3.eth.Contract(
    UNI_PAIR.abi as AbiItem[],
    pool.lp,
  ) as unknown) as IUniswapV2Pair, [kit.web3.eth.Contract, pool.lp]); 

  const call = React.useCallback(async () => {
    try {
        const totalSupply = toBN(await lp.methods.totalSupply().call());
        let reserve0: BN;
        let reserve1: BN ; 
        const getReserves = await lp.methods.getReserves().call();
        const balance = toBN(position.collateralSize!); 
        if (getAddress(await lp.methods.token0().call()) === getAddress(pool.tokens[0]!.address)) {
          reserve0 = toBN(getReserves.reserve0);
          reserve1 = toBN(getReserves.reserve1);
        } else {
          reserve0 = toBN(getReserves.reserve1);
          reserve1 = toBN(getReserves.reserve0);
        }
        return [reserve0, reserve1].map((reserve) => reserve.mul(balance).div(totalSupply))
    } catch (error) {
        console.log(error)
    }
}, [lp, pool.tokens, position])

  const [info] = useAsyncState(null, call);

const continueButton = (
  <Button
    onClick={() => {
      setRemove({
        existingBalance: info!,
        remove: (info!.map((x) => x.mul(toBN(toWei((per/100).toString()))).div(toBN(10).pow(toBN(18))))),
        removeLp: (toBN(position.collateralSize!).mul(toBN(toWei((per/100).toString()))).div(toBN(10).pow(toBN(18)))),
      })
      setPage(removePage.Payback); 
    }}
    >
      Continue
    </Button>
)

  return (
    <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
      <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
        <Flex sx={{flexDirection: "column", gap: "25px", mb: 10}}>
          <BlockText variant="primary">Your Position Balance</BlockText>
          <Flex sx={{ justifyContent: "left", gap: "8px", alignItems: "center"}}>
            {info && pool.tokens.map((tok, index) => 
            <Flex
            sx={{
              alignItems: "center",
              mr: 4,
              padding:2,
              borderStyle: "solid",
              borderRadius: "10px",
            }}
          >
              <TokenAmountInfo key={tok.address} token={tok} amount={fromWei(info![index]!)} />       
            </Flex>
          )}
          </Flex>
        </Flex>
        <Flex sx={{mb: 2, mt: "25px"}}>
          <BlockText variant="primary">I'd like to remove</BlockText>
        </Flex>
        <Flex sx={{ width: "100%", alignItems: "center", gap: "12px"}}>

          <Slider
            progress
            defaultValue={50}
            style={{width: "100%"}}
            step={.01}
            max={Number(100)}
            onChange={(value) => setPer(value)}
          />
          <BlockText>{per}%</BlockText>    
        </Flex> 
        <Flex sx={{flexDirection: "column", gap: "25px", mb: 10}}>
          <BlockText variant="primary">You receive</BlockText>
          <Flex sx={{ justifyContent: "left", gap: "8px", alignItems: "center"}}>
            {info && pool.tokens.map((tok, index) => 
            <Flex
            sx={{
              alignItems: "center",
              mr: 4,
              padding:2,
              borderStyle: "solid",
              borderRadius: "10px",
            }}
          >
              <TokenAmountInfo key={tok.address} token={tok} amount={String(Number(fromWei(info![index]!)) * (per/100))} />       
            </Flex>
          )}
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
          {
          (per === 0) ? (
            <Button disabled>Enter a valid amount</Button>
          ) : (
            continueButton
          )}
        </Flex>
      </Card>
    </Flex>
  );
};
