import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useContractKit } from "@celo-tools/use-contractkit";
import { AbiItem, toBN, fromWei } from "web3-utils";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import PROXYORACLE_ABI from "src/abis/dahlia_contracts/ProxyOracle.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { ProxyOracle } from "src/generated/ProxyOracle";
import { Bank, DEFAULT_GAS_PRICE } from "src/config";
import React from "react";
import { getAddress } from "ethers/lib/utils";
import { FarmInfo } from "src/components/FarmInfo";
import { Flex, Button } from "theme-ui";
import { poolProps, poolState } from "src/pages/Farm/newFarm/NewFarm";
import UNI_SPELL from "src/abis/dahlia_contracts/UniswapV2SpellV1.json";
import { UniswapV2SpellV1 } from "src/generated/UniswapV2SpellV1";
import { MaxUint256 } from "@ethersproject/constants";
import { toastTx } from "src/utils/toastTx";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Spinner, Text } from "theme-ui"
import { CoreOracle } from "src/generated/CoreOracle";
import COREORACLE_ABI from "src/abis/dahlia_contracts/CoreOracle.json";
import { useAsyncState } from "src/hooks/useAsyncState";
import { humanFriendlyNumber } from "src/utils/number";
import { IERC20Wrapper } from 'src/generated/IERC20Wrapper';
import IERC20W_ABI from "src/abis/dahlia_contracts/IERC20Wrapper.json";
import { CErc20Immutable } from "src/generated/CErc20Immutable";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";
import BN from 'bn.js';


interface Props {
  pool: poolProps,
  positionId: number,
  collateralSize: string, 
  collId: string,
  collToken: string,
}

export const PositionEntry: React.FC<Props> = (props: Props) => {
  const { kit, getConnectedKit } = useContractKit();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const history = useHistory();
  const scale = toBN(2).pow(toBN(112)); 
  
  
  const bank = React.useMemo(() => (new kit.web3.eth.Contract(
    BANK_ABI.abi as AbiItem[],
    getAddress(Bank[44787])
    ) as unknown) as HomoraBank, [kit]); 
    
    const call = React.useCallback(async () => {
      try {
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
        const price = await coreOracle.methods.getCELOPx(props.pool.lp).call();
        const totalValue = Number(fromWei(props.collateralSize)) * (Number(fromWei(price)) / Number(fromWei(scale)))
        const ret = await bank.methods.getPositionDebts(props.positionId!).call();
        let debtValue: number = 0;
        let debtInterest: number = 0; 
        for (let i = 0; i < ret.tokens.length; i += 1) {
          const token = ret.tokens[i]!;
          const price = await coreOracle.methods.getCELOPx(token).call();
          debtValue += Number(fromWei(ret.debts[i]!)) * (Number(fromWei(price)) / Number(fromWei(scale)))
          const bankInfo =  await bank.methods.getBankInfo(token).call();
          const cToken = (new kit.web3.eth.Contract(
            CERC20_ABI as AbiItem[],
            bankInfo.cToken,
          ) as unknown) as CErc20Immutable;
          const blocksPerYear = toBN(6311520); 
          const borrowRate = toBN(await cToken.methods.borrowRatePerBlock().call()).mul(blocksPerYear);
          debtInterest += debtValue * Number(fromWei(borrowRate))
        }
        const numer = await bank.methods.getBorrowCELOValue(props.positionId).call(); 
        const denom = await bank.methods.getCollateralCELOValue(props.positionId).call();; 
        const debtRatio = Number(fromWei(numer)) / Number(fromWei(denom))
        return {
          debtValue,
          totalValue,
          debtRatio,
          debtInterest,
        };
    } catch (error) {
        console.log(error)
    }
}, [bank.methods, kit.web3.eth.Contract, props.collateralSize, props.pool.lp, props.positionId, scale])

  const [info] = useAsyncState(null, call);

  const closeButton = (
    <Button
      onClick={async () => {
        const kit = await getConnectedKit();
        try {
          setConfirmLoading(true);
          const bank = (new kit.web3.eth.Contract(
            BANK_ABI.abi as AbiItem[],
            getAddress(Bank[44787])
            ) as unknown) as HomoraBank;
          const spell = (new kit.web3.eth.Contract(
            UNI_SPELL.abi as AbiItem[],
            getAddress(props.pool.spell),
          ) as unknown) as UniswapV2SpellV1;
          const bytes = spell.methods.removeLiquidityWStakingRewards(
            props.pool.tokens[0]!.address, 
            props.pool.tokens[1]!.address, 
            [
              MaxUint256.toString(),
              0, 
              MaxUint256.toString(), 
              MaxUint256.toString(), 
              0, 
              0, 
              0
            ],
            props.pool.wrapper,
          ).encodeABI()
          const tx = await bank.methods
            .execute(
                props.positionId,
                props.pool.spell,
                bytes,
            ).send({
              from: kit.defaultAccount,
              gasPrice: DEFAULT_GAS_PRICE,
            });
          toastTx(tx.transactionHash);
        } catch (e: any) {
          toast(e.message);
        } finally {
          setConfirmLoading(false);
        }
      }}
    >
      Close
    </Button>
  );

  const harvestButton = (
  <Button
    onClick={async () => {
      const kit = await getConnectedKit();
      const bank = (new kit.web3.eth.Contract(
        BANK_ABI.abi as AbiItem[],
        getAddress(Bank[44787])
        ) as unknown) as HomoraBank;
      const spell = (new kit.web3.eth.Contract(
        UNI_SPELL.abi as AbiItem[],
        getAddress(props.pool.spell),
      ) as unknown) as UniswapV2SpellV1;
      try {
        setConfirmLoading(true);
        const bytes = spell.methods.harvestWStakingRewards(
          props.pool.wrapper,
        ).encodeABI()
        const tx = await bank.methods
          .execute(
              props.positionId,
              props.pool.spell,
              bytes,
          ).send({
            from: kit.defaultAccount,
            gasPrice: DEFAULT_GAS_PRICE,
          });
        toastTx(tx.transactionHash);
      } catch (e: any) {
        toast(e.message);
      } finally {
        setConfirmLoading(false);
      }
    }}
  >
  Harvest
</Button>
);

  const urlext = props.positionId + "/" + props.collId + "/" + props.collateralSize + "/" + props.pool.name + "/" + props.pool.wrapper + "/" + props.pool.spell + "/" + props.pool.lp + "/" + props.pool.apy + "/"
    + props.pool.tokens.map((tok) => tok.address)

  const apy = info ? (info.totalValue * (Number(props.pool.apy) / 100) - info.debtInterest) / (info.totalValue - info.debtValue) : 0; 

  return (
    <Row>
      <td>
      <FarmInfo props={props.pool} />
      </td>
      <td><Text>{info ? humanFriendlyNumber(info.debtValue) : "--"} Celo</Text></td>
      <td><Text>{info ? humanFriendlyNumber(info.totalValue) : "--"} Celo</Text></td>
      <td><Text>{info ? humanFriendlyNumber(info.debtRatio* 100).concat("%") : "--"}</Text></td>
      <td><Text>{info ? humanFriendlyNumber(apy * 100).concat("%") : "--"}</Text></td>
      <td
        css={css`
          text-align: right;
        `}
      >
          { confirmLoading ? <Spinner /> : (
        <Flex sx={{justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "6px"}}>

          <Flex sx={{justifyContent: "center", alighnItems: "center", gap: "6px"}}>
            <Button onClick={() => {
             history.push(`positions/add/${urlext}`)}
            }>
              Add
            </Button>
            <Button onClick={() => {
             history.push(`positions/remove/${urlext}`)}
            }>
              Remove
            </Button>
          </Flex>
          <Flex sx={{justifyContent: "center", alighnItems: "center", gap: "6px"}}>
            {closeButton}
            {harvestButton}
          </Flex>
          </Flex>
          )}
        
      </td>
    </Row>
  );
};

const Row = styled.tr`
  height: 96px;
`;