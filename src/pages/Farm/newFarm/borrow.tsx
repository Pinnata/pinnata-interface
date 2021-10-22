import React from "react";
import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
} from "theme-ui";
import { CaretLeft } from "phosphor-react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import { farmPageState, farmPage, poolState } from "src/pages/Farm/newFarm/NewFarm";
import { BlockText } from "src/components/BlockText";
import { Token } from "src/utils/token";
import { lpToken } from "src/config";
import { TokenAmountInfo } from "src/components/TokenAmountInfo";
import { newSupplyState } from "src/pages/Farm/newFarm/supply";
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
import { CErc20Immutable } from "src/generated/CErc20Immutable";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";
import { priceImpact } from "src/utils/swap";
import UNI_PAIR from "src/abis/dahlia_contracts/dependencies/ubeswap/ubeswap@mainnet-v1/IUniswapV2Pair.json"
import { IUniswapV2Pair } from "src/generated/IUniswapV2Pair";


interface newBorrowProps {
  tokenBorrow: any[] | null;
  supplyValue: number | null;
  borrowValue: number | null;
  debtRatio: number | null;
  lever: number | null;
  impact: number | null; 
  apy: number | null;
}

const emptyNewBorrowState : newBorrowProps = {
  tokenBorrow: null,
  supplyValue: null,
  borrowValue: null,
  debtRatio: null,
  lever: null,
  impact: null,
  apy: null,
}

export const newBorrowState = atom({
  key: 'newBorrowState',
  default: emptyNewBorrowState
})

export const Borrow: React.FC = () => {
  const scale = toBN(2).pow(toBN(112)); 
  const [pool] = useRecoilState(poolState);
  const setPage = useSetRecoilState(farmPageState)
  const [supply] = useRecoilState(newSupplyState); 
  const setBorrow = useSetRecoilState(newBorrowState); 
  const [init, setInit] = React.useState(false)

  const lpTok: Token = new Token({
    ...lpToken,
    address: pool.lp,
  });

  const { kit } = useContractKit();
  const [amounts, setAmounts] = React.useState<(String[] | null)>(null)

  const bank = React.useMemo(() => (new kit.web3.eth.Contract(
    BANK_ABI.abi as AbiItem[],
    getAddress(Bank[44787])
  ) as unknown) as HomoraBank, [kit]); 

  const lp = React.useMemo(() => (new kit.web3.eth.Contract(
    UNI_PAIR.abi as AbiItem[],
    pool.lp,
  ) as unknown) as IUniswapV2Pair, [kit.web3.eth.Contract, pool.lp]); 

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
        const prices: any[] = [];
        const availableBorrows: any[] = []
        const borrows: any[] = [];
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

        for (let token of pool.tokens) {
          const bankInfo =  await bank.methods.getBankInfo(token.address).call();
          const cToken = (new kit.web3.eth.Contract(
            CERC20_ABI as AbiItem[],
            bankInfo.cToken,
          ) as unknown) as CErc20Immutable;
          const totalSupply = toBN(await cToken.methods.totalSupply().call());
          const totalBorrows = toBN(await cToken.methods.totalBorrows().call());
          const totalReserves = toBN(await cToken.methods.totalReserves().call());
          availableBorrows.push(totalSupply.sub(totalBorrows).sub(totalReserves)); 
          const blocksPerYear = toBN(6311520); 
          const borrowRate = toBN(await cToken.methods.borrowRatePerBlock().call()).mul(blocksPerYear);
          borrows.push(borrowRate);
          const factor = await proxyOracle.methods.tokenFactors(token!.address).call();
          factors.push(factor);
          const price = await coreOracle.methods.getCELOPx(token!.address).call();
          prices.push(toBN(price));
        }
        const lpPrice = await coreOracle.methods.getCELOPx(pool.lp).call();
        const lpFactor = await proxyOracle.methods.tokenFactors(pool.lp).call();

        const weightedSuppliedCollateralValue = supply.tokenSupply!.map((x, i) => Number(fromWei(x))
          * (Number(fromWei(prices[i]!)) / Number(fromWei(scale))) * (Number(lpFactor.collateralFactor) / 10000))
          .reduce((sum, current) => sum + current, 0) + Number(fromWei(supply.lpSupply!))
          * (Number(fromWei(lpPrice)) / Number(fromWei(scale))) * (Number(lpFactor.collateralFactor) / 10000)

        const borrowMax = prices.map((x, i) => weightedSuppliedCollateralValue / 
          ((Number(fromWei(x)) / Number(fromWei(scale))) * ((Number(factors[i]?.borrowFactor) - Number(lpFactor.collateralFactor)) / 10000)))

        const maxAmounts = borrowMax.map((x, index) => String(Math.min(x, Number(fromWei(availableBorrows[index]!)))));

        let reserve0: BN;
        let reserve1: BN ; 
        const getReserves = await lp.methods.getReserves().call();
        if (getAddress(await lp.methods.token0().call()) === getAddress(pool.tokens[0]!.address)) {
          reserve0 = toBN(getReserves.reserve0);
          reserve1 = toBN(getReserves.reserve1);
        } else {
          reserve0 = toBN(getReserves.reserve1);
          reserve1 = toBN(getReserves.reserve0);
        }

        if (!init) {
          setInit(true);
          setAmounts(maxAmounts.map((x) => Number(x) === 0 ? "0" : String((Number(x) / 3).toFixed(3))));
        }
        return {
          tokenFactor: factors,
          celoPrices: prices,
          lpFactor,
          lpPrice,
          maxAmounts,
          reserve0,
          reserve1,
          borrows,
        };
    } catch (error) {
        console.log(error)
    }
    
}, [bank.methods, kit.web3.eth.Contract, pool.lp, pool.tokens, supply.tokenSupply, supply.lpSupply, scale, lp.methods, init])

const [info] = useAsyncState(null, call);

if (!amounts!) return null; 

const individualBorrow = info ? amounts!.map((x, i) => Number(x) * (Number(fromWei(info?.celoPrices[i]!)) / Number(fromWei(scale)))) : []; 

const borrowValue = individualBorrow ? individualBorrow.reduce((sum, current) => sum + current, 0) : 0; 
const supplyValue = info ? supply.tokenSupply!.map((x, i) => Number(fromWei(x)) * (Number(fromWei(info?.celoPrices[i]!)) / Number(fromWei(scale)))).reduce((sum, current) => sum + current, 0) : 0; 
const lever =  1 + (borrowValue / supplyValue)

const apy = ((borrowValue + supplyValue) * 
  (Number(pool.apy)/100) - individualBorrow.map((x, i) => 
  x * Number(fromWei(info?.borrows[i]!))).reduce((sum, current) => sum + current, 0)) / supplyValue;

const impact = info ? priceImpact(supply.tokenSupply![0]!.add(toBN(Number(amounts[0]) * 10**18)), supply.tokenSupply![1]!.add(toBN(Number(amounts[1]) * 10**18)), info.reserve0, info.reserve1) : 0;

const numer = info ? amounts!.map((x, i) => Number(x) * (Number(fromWei(info?.celoPrices[i]!)) / Number(fromWei(scale))) * (Number(info.tokenFactor[i]?.borrowFactor) / 10000)).reduce((sum, current) => sum + current, 0) : 0; 
const denom = info ? amounts!.map((x, i) => (Number(x) + Number(fromWei(supply.tokenSupply![i]!)))
  * (Number(fromWei(info?.celoPrices[i]!)) / Number(fromWei(scale))) * (Number(info.lpFactor?.collateralFactor) / 10000))
  .reduce((sum, current) => sum + current, Number(fromWei(supply.lpSupply!))
  * (Number(fromWei(info?.lpPrice)) / Number(fromWei(scale))) * (Number(info.lpFactor?.collateralFactor) * (1 - impact) / 10000)) : 1; 
const debtRatio =  (numer/denom) * 100; 

const continueButton = (
  <Button
    onClick={() => {
      setBorrow({
        tokenBorrow: amounts!.map((x) => toBN(toWei(String(x)))),
        lever: lever, 
        debtRatio,
        borrowValue,
        supplyValue,
        impact,
        apy,
        });
      setPage(farmPage.Confirm); 
    }}
    >
      Continue
    </Button>
)

  return (
    <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
      <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
        <Flex
          onClick={() => {
            setPage(farmPage.Supply);
          }}
          sx={{ alignItems: "center", cursor: "pointer" }}
          mb={4}
        >
          <CaretLeft size={28} />
          <Text>Back</Text>
        </Flex>
        <Flex mb={4}>
          <Heading as="h2" mr={2}>
            Farm
          </Heading>
        </Flex>
        <Flex sx={{flexDirection: "column", gap: "25px", mb: 10}}>
          <BlockText variant="primary">I'm Supplying</BlockText>
          <Flex sx={{ justifyContent: "left", gap: "8px", alignItems: "center"}}>
            {pool.tokens.map((tok, index) => 
            <Flex
            sx={{
              alignItems: "center",
              mr: 4,
              padding:2,
              borderStyle: "solid",
              borderRadius: "10px",
            }}
          >
              <TokenAmountInfo key={tok.address} token={tok} amount={fromWei(supply.tokenSupply![index]!)} />       
            </Flex>
          )}
            <Flex
            sx={{
              alignItems: "center",
              mr: 4,
              padding:2,
              borderStyle: "solid",
              borderRadius: "10px",
            }}
            >
              <TokenAmountInfo key={lpTok.address} token={lpTok} amount={fromWei(supply.lpSupply!)} />       
            </Flex>
          </Flex>
        </Flex>
        <Flex sx={{mb: 2, mt: "25px"}}>
          <BlockText variant="primary">Borrows</BlockText>
        </Flex>
        <BlockText mb={2}>{"Est. Debt Ratio: ".concat(humanFriendlyNumber(debtRatio)).concat("/100")}</BlockText>
        <BlockText mb={2}>{"Leverage: ".concat(humanFriendlyNumber(lever)).concat("x")}</BlockText>
        <BlockText mb={2}>{"Price Impact: ".concat(humanFriendlyNumber(impact*100)).concat("%")}</BlockText>
        <BlockText mb={2}>{"Farming Apy: ".concat(humanFriendlyNumber(apy*100)).concat("%")}</BlockText>

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
