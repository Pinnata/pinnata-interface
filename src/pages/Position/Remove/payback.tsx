import React from "react";
import {
  Button,
  Card,
  Flex,
  Text,
} from "theme-ui";
import { CaretLeft } from "phosphor-react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import { poolState } from "src/pages/Farm/newFarm/NewFarm";
import { BlockText } from "src/components/BlockText";
import { TokenAmountInfo } from "src/components/TokenAmountInfo";
import { fromWei, toWei, toBN, AbiItem } from "web3-utils";
import { TokenSlider } from "src/components/TokenSlider";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import PROXYORACLE_ABI from "src/abis/dahlia_contracts/ProxyOracle.json";
import COREORACLE_ABI from "src/abis/dahlia_contracts/CoreOracle.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { ProxyOracle } from "src/generated/ProxyOracle";
import { CoreOracle } from "src/generated/CoreOracle";
import { Bank } from "src/config";
import { getAddress } from "ethers/lib/utils";
import { useAsyncState } from "src/hooks/useAsyncState";
import { humanFriendlyNumber } from "src/utils/number";
import BN from 'bn.js';
import { removePage, removePageState, removePositionState } from "./remove";
import { removeRemoveState } from "./removeTokens"
import { CErc20Immutable } from "src/generated/CErc20Immutable";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";

interface paybackProps {
  payback: BN[] | null;
  debtRatio: number | null; 
  lever: number | null;
  apy: number | null;
}

const emptyPaybackState : paybackProps = {
  payback: null,
  debtRatio: null,
  lever: null,
  apy: null,
}

export const removePaybackState = atom({
  key: 'removepaybackState',
  default: emptyPaybackState
})

export const Payback: React.FC = () => {
  const [pool] = useRecoilState(poolState);
  const setPage = useSetRecoilState(removePageState);
  const [position] = useRecoilState(removePositionState); 
  const [remove] = useRecoilState(removeRemoveState);
  const setPayback = useSetRecoilState(removePaybackState);
  const [amounts, setAmounts] = React.useState<(String[] | null)>(null);
  const [init, setInit] = React.useState(false); 
  const zeroAdd = "0x0000000000000000000000000000000000000000"
  const scale = toBN(2).pow(toBN(112)); 

  const { kit } = useContractKit();

  const bank = React.useMemo(() => (new kit.web3.eth.Contract(
    BANK_ABI.abi as AbiItem[],
    getAddress(Bank[44787])
  ) as unknown) as HomoraBank, [kit]); 

  const call = React.useCallback(async () => {
    try {
      const factors : {
        borrowFactor: string;
        collateralFactor: string;
        liqIncentive: string;
        0: string;
        1: string;
        2: string;
      }[] = [];
      const prices: BN[] = [];
      const borrowRates: BN[] = [];
      const oracle = await bank.methods.oracle().call();
      const proxyOracle = (new kit.web3.eth.Contract(
        PROXYORACLE_ABI.abi as AbiItem[],
        oracle,
      ) as unknown) as ProxyOracle;
      const source = await proxyOracle.methods.source().call();
      const coreOracle = (new kit.web3.eth.Contract(
        COREORACLE_ABI.abi as AbiItem[],
        source,
      ) as unknown) as CoreOracle;
        const ret = await bank.methods.getPositionDebts(position.positionId!).call();
        const debts: BN[] = [];
        for (let i = 0; i < pool.tokens.length; i += 1) {
          const token = pool.tokens[i]!;
          const bankInfo =  await bank.methods.getBankInfo(token.address).call();
          const cToken = (new kit.web3.eth.Contract(
            CERC20_ABI as AbiItem[],
            bankInfo.cToken,
          ) as unknown) as CErc20Immutable;
          const blocksPerYear = toBN(6311520); 
          const borrowRate = toBN(await cToken.methods.borrowRatePerBlock().call()).mul(blocksPerYear);
          borrowRates.push(borrowRate);
          const factor = await proxyOracle.methods.tokenFactors(token.address).call();
          factors.push(factor);
          const price = await coreOracle.methods.getCELOPx(token.address).call();
          prices.push(toBN(price));
          for (let j = 0; j < ret.tokens.length; j += 1) {
            if (getAddress(token.address) === getAddress(ret.tokens[j]!)) {
              debts.push(toBN(ret.debts[j]!));
              break; 
            }      
          }
          if (debts.length === i) debts.push(toBN(0));
        }
        const existingWeightBorrowValue = await bank.methods.getBorrowCELOValue(position.positionId!).call();
        const weightedCollateralValue = await proxyOracle.methods.asCELOCollateral(pool.wrapper, position.collId!, toBN(position.collateralSize!).sub(remove.removeLp!).toString(), zeroAdd).call();

        const maxAmounts = debts.map((x, index) => x.lt(remove.remove![index]!) ? fromWei(x) : fromWei(remove.remove![index]!)); 

        console.log(remove.prevPosition, debts)

        const prevCollateral = remove.prevPosition?.map((x, i) => x.sub(debts[i]!))

        const lpPrice = await coreOracle.methods.getCELOPx(pool.lp).call();
        const lpFactor = await proxyOracle.methods.tokenFactors(pool.lp).call();

        if (!init) {
          setInit(true); 
          setAmounts(maxAmounts.map((x) => String((Number(x) / 3).toFixed(3))));
        }
        return {
          debts,
          maxAmounts,
          weightedCollateralValue,
          existingWeightBorrowValue,
          factors,
          prices,
          lpPrice,
          lpFactor,
          prevBorrow: debts,
          prevCollateral,
          borrowRates,
        };
    } catch (error) {
        console.log(error)
    }
}, [bank.methods, init, kit.web3.eth.Contract, pool.tokens, pool.wrapper, position.collId, position.collateralSize, position.positionId, remove.prevPosition, remove.remove, remove.removeLp])
  const [info] = useAsyncState(null, call);

  //TODO: account for removed coins
  const numer = info ? Number(fromWei(info.existingWeightBorrowValue)) - amounts!.map((x, i) => (Number(x) * (Number(fromWei(info?.prices[i]!)) / Number(fromWei(scale)))
  * (Number(info.factors[i]?.borrowFactor) / 10000)))
  .reduce((sum, current) => sum + current, 0) : 0; 
  const denom = info ? (Number(fromWei(position.collateralSize!)) - Number(fromWei(remove.removeLp!))) * (Number(fromWei(info?.lpPrice)) / Number(fromWei(scale))) * (Number(info.lpFactor.collateralFactor) / 10000) : 1; 
  const debtRatio =  denom === 0 && numer === 0 ? 0 : (numer/denom) * 100; 

  const individualBorrow = info ? amounts!.map((x, i) => ((Number(fromWei(info.prevBorrow[i]!)) - Number(x)) * Number(fromWei(info?.prices[i]!)) / Number(fromWei(scale)))): [];

  const borrowValue = individualBorrow ? individualBorrow.reduce((sum, current) => sum + current, 0) : 0; 
  const supplyValue = info ? ((Number(fromWei(position.collateralSize!)) - Number(fromWei(remove.removeLp!))) * Number(fromWei(info?.lpPrice)) / Number(fromWei(scale))) : 0; 
  const lever =  1 + (borrowValue / supplyValue)

  const apy = ((borrowValue + supplyValue) * (Number(pool.apy)/100) - individualBorrow.map((x, i) => 
  x * Number(fromWei(info?.borrowRates[i]!))).reduce((sum, current) => sum + current, 0)) / supplyValue;

  const continueButton = (
    <Button
      disabled={debtRatio > 99}
      onClick={() => {
        setPayback({
          payback: amounts!.map((x) => toBN(toWei(String(x)))),
          debtRatio,
          lever,
          apy,
        })
        setPage(removePage.Confirm); 
      }}
      >
        Continue
      </Button>
  )

    if (!info! || !amounts!) return null; 
  return (
    <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
      <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
        <Flex
          onClick={() => {
            setPage(removePage.Remove);
          }}
          sx={{ alignItems: "center", cursor: "pointer" }}
          mb={4}
        >
          <CaretLeft size={28} />
          <Text>Back</Text>
        </Flex>
        <Flex sx={{flexDirection: "column", gap: "25px", mb: 10}}>
          <BlockText variant="primary">I'm receiving</BlockText>
          <Flex sx={{ justifyContent: "left", gap: "8px", alignItems: "center"}}>
            {remove && pool.tokens.map((tok, index) => 
            <Flex
            sx={{
              alignItems: "center",
              mr: 4,
              padding:2,
              borderStyle: "solid",
              borderRadius: "10px",
            }}
          >
              <TokenAmountInfo key={tok.address} token={tok} amount={fromWei(remove.remove![index]!)} />       
            </Flex>
          )}
          </Flex>
        </Flex>
        <Flex sx={{flexDirection: "column", gap: "25px", mb: 10}}>
          <BlockText variant="primary">Your position debts</BlockText>
          <Flex sx={{ justifyContent: "left", gap: "8px", alignItems: "center"}}>
            {info && remove && pool.tokens.map((tok, index) => 
            <Flex
            sx={{
              alignItems: "center",
              mr: 4,
              padding:2,
              borderStyle: "solid",
              borderRadius: "10px",
            }}
          >
              <TokenAmountInfo key={tok.address} token={tok} amount={fromWei(info!.debts[index]!)} />       
            </Flex>
          )}
          </Flex>
        </Flex>
        <Flex sx={{mb: 2, mt: "25px"}}>
          <BlockText variant="primary">I'd like to repay</BlockText>
        </Flex>
        <BlockText mb={2}>{"New Est. Debt Ratio: ".concat(humanFriendlyNumber(debtRatio)).concat("/100")}</BlockText>
        <BlockText mb={2}>{"New Leverage: ".concat(humanFriendlyNumber(lever)).concat("x")}</BlockText>
        <BlockText mb={2}>{"New Farming Apy: ".concat(humanFriendlyNumber(apy*100)).concat("%")}</BlockText>
          {info && pool.tokens.map((tok, index) => 
            <TokenSlider key={tok.address} token={tok} amount={String(amounts![index])}
            setAmount={(s: string) => setAmounts(amounts!.map((x, i) => i === index ? s : x))} 
            max={info!.maxAmounts[index]!}
             />
          )}
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
        {
          (debtRatio > 99) ? (
            <Button disabled={true}>Debt ratio too high</Button>
          ) : (
            continueButton
          )}
        </Flex>
      </Card>
    </Flex>
  );
};
