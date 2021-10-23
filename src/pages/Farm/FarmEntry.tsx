import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Button } from "theme-ui";
import { useHistory } from "react-router-dom";
import { AbiItem, toBN, fromWei } from "web3-utils";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";
import PROXYORACLE_ABI from "src/abis/dahlia_contracts/ProxyOracle.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { ProxyOracle } from "src/generated/ProxyOracle";
import { CErc20Immutable } from "src/generated/CErc20Immutable";
import { Bank, Alfajores } from "src/config";
import React from "react";
import { useAsyncState } from "src/hooks/useAsyncState";
import { getAddress } from "ethers/lib/utils";
import { humanFriendlyWei } from "src/utils/eth";
import { FarmInfo } from "src/components/FarmInfo";
import { Flex, Text } from "theme-ui";
import { TokenBorrowInfo } from "src/components/TokenBorrowInfo";
import { poolProps } from "src/pages/Farm/newFarm/NewFarm";
import { humanFriendlyNumber } from "src/utils/number";
import { RewardsTokenInfo } from "src/components/RewardsTokenInfo";

export const FarmEntry: React.FC<poolProps> = (props: poolProps) => {

  const { kit } = useContractKit();
  const history = useHistory();

  const bank = React.useMemo(() => (new kit.web3.eth.Contract(
    BANK_ABI.abi as AbiItem[],
    getAddress(Bank[44787])
  ) as unknown) as HomoraBank, [kit]); 

  const call = React.useCallback(async () => {
    try {
        const borrows = [];
        const factors = [];
        const oracle = await bank.methods.oracle().call();
        const proxyOracle = (new kit.web3.eth.Contract(
          PROXYORACLE_ABI.abi as AbiItem[],
          oracle,
        ) as unknown) as ProxyOracle;
        for (let i: number = 0; i < props.tokens.length; i += 1) {
          const bankInfo =  await bank.methods.getBankInfo(props.tokens[i]!.address).call();
          const factor = await proxyOracle.methods.tokenFactors(props.tokens[i]!.address).call();
          factors.push(factor);
          const cToken = (new kit.web3.eth.Contract(
            CERC20_ABI as AbiItem[],
            bankInfo.cToken,
          ) as unknown) as CErc20Immutable;
          const blocksPerYear = toBN(6311520); 
          const borrowRate = toBN(await cToken.methods.borrowRatePerBlock().call()).mul(blocksPerYear);
          borrows.push(borrowRate);
          }
          const lpFactor = await proxyOracle.methods.tokenFactors(props.lp).call();
        return {
          borrowRate: borrows,
          tokenFactor: factors,
          lpFactor,
        };
    } catch (error) {
        console.log(error)
    }
    
}, [bank.methods, kit.web3.eth.Contract, props.lp, props.tokens])

  const [info] = useAsyncState(null, call);

  const lever = (factor: {borrowFactor: string, collateralFactor: string}) => {
    return 1 + (Number(factor.collateralFactor) / (Number(factor.borrowFactor) - Number(factor.collateralFactor)))
  }

  const maxLever = info ? Math.max(...(info?.tokenFactor.map((x) => 
    lever({borrowFactor: x.borrowFactor, collateralFactor: info.lpFactor.collateralFactor})))!) : 0;

  const maxApy = info ? Math.max(...(info?.tokenFactor.map((x, i) => {
    const maxLever =  lever({borrowFactor: x.borrowFactor, collateralFactor: info.lpFactor.collateralFactor})
    const borrow = fromWei(info.borrowRate[i]!)
    console.log(Number(props.apy))
    console.log(Number(borrow.toString()))
    return maxLever * (Number(props.apy)/100) - (maxLever - 1) * Number(borrow.toString())
  }))) : 0
  console.log(maxApy, 'max')

  const urlext = props.name + "/" + props.wrapper + "/" + props.spell + "/" + props.lp + "/" + props.apy + "/"
    + props.tokens.map((tok) => tok.address)
  return (
    <Row>
      <td>
      <FarmInfo props={props} />
      </td>
      <td><Text>{info ? humanFriendlyNumber(maxApy * 100) : "--"}%</Text></td>
      <td><Text>{props.apy}%</Text></td>
      <td>
        <Flex sx={{ flexDirection: "column", alignItems: "center", gap: "6px"}}>
          {props.tokens.map((tok, index) => (
            <TokenBorrowInfo key={tok.address} token={tok} apy={info && info.borrowRate.length > 0 ? humanFriendlyWei(info.borrowRate[index]!.mul(toBN(100))): "--"} />
          ))}
        </Flex>
      </td>
      <td><Text>{String(maxLever).concat("x")}</Text></td>
      <td>
        <Flex sx={{ flexDirection: "column", alignItems: "center", gap: "6px"}}>
          {props.rewards.map((tok) => (
            <RewardsTokenInfo token={tok} />
          ))}
        </Flex>
      </td>
      <td
        css={css`
          text-align: right;
        `}
      >
        <Button onClick={() => 
           history.push(`farm/new/${urlext}`)}>
          Farm
        </Button>
      </td>
    </Row>
  );
};

const Row = styled.tr`
  height: 72px;
`;
