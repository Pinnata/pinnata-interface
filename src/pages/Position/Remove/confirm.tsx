import React from "react";
import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  Spinner,
} from "theme-ui";
import { DEFAULT_GAS_PRICE } from "src/config";
import { CaretLeft } from "phosphor-react";
import { useContractKit } from "@celo-tools/use-contractkit";
import {  useSetRecoilState, useRecoilState } from 'recoil';
import { BlockText } from "src/components/BlockText";
import { Bank } from "src/config";
import { TokenAmountInfo } from "src/components/TokenAmountInfo";
import { fromWei, AbiItem } from "web3-utils";
import { toastTx } from "src/utils/toastTx";
import { toast } from "react-toastify";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import UNI_SPELL from "src/abis/dahlia_contracts/UniswapV2SpellV1.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { UniswapV2SpellV1 } from "src/generated/UniswapV2SpellV1";
import { getAddress } from "ethers/lib/utils";
import { humanFriendlyNumber } from "src/utils/number";
import { poolState } from "src/pages/Farm/newFarm/NewFarm";
import { removePage, removePageState, removePositionState } from "./remove";
import { removeRemoveState } from "./removeTokens";
import { removePaybackState } from "./payback";
import { useHistory } from "react-router-dom";


export const Confirm: React.FC = () => {
  const { getConnectedKit } = useContractKit();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [done, setDone] = React.useState(false); 
  const [pool] = useRecoilState(poolState);
  const setPage = useSetRecoilState(removePageState);
  const [position] = useRecoilState(removePositionState); 
  const [remove] = useRecoilState(removeRemoveState);
  const [payback] = useRecoilState(removePaybackState);
  const history = useHistory(); 

  const confirmButton = (
    <Button
      onClick={async () => {
        const kit = await getConnectedKit();
        // kit is connected to a wallet
        try {
          setConfirmLoading(true);
          const bank = (new kit.web3.eth.Contract(
            BANK_ABI.abi as AbiItem[],
            getAddress(Bank[44787])
            ) as unknown) as HomoraBank;
          const spell = (new kit.web3.eth.Contract(
            UNI_SPELL.abi as AbiItem[],
            getAddress(pool.spell),
          ) as unknown) as UniswapV2SpellV1;
          const bytes = spell.methods.removeLiquidityWStakingRewards(
            pool.tokens[0]!.address, 
            pool.tokens[1]!.address, 
            [
              remove.removeLp!.toString(),
              0, 
              payback.payback![0]!.toString(),
              payback.payback![1]!.toString(),
              0, 0, 0
            ],
            pool.wrapper,
          ).encodeABI()
          const tx = await bank.methods
            .execute(
                position.positionId!,
                pool.spell,
                bytes,
            ).send({
              from: kit.defaultAccount,
              gasPrice: DEFAULT_GAS_PRICE,
            });
          toastTx(tx.transactionHash);
        } catch (e) {
          toast(e.message);
        } finally {
          setConfirmLoading(false);
          setDone(true); 
        }
      }}
    >
      Confirm
    </Button>
  );

  return (
    <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
      <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
        <Flex
          onClick={() => {
            setPage(removePage.Payback);
          }}
          sx={{ alignItems: "center", cursor: "pointer" }}
          mb={4}
        >
          <CaretLeft size={28} />
          <Text>Back</Text>
        </Flex>
        <Flex mb={4}>
          <Heading as="h2" mr={2}>
            Position Breakdown
          </Heading>
        </Flex>
        <Flex sx={{flexDirection: "column", gap: "25px", mb: 10}}>
          <BlockText variant="primary">Remove from position</BlockText>
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
          <BlockText variant="primary">Payback borrows</BlockText>
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
              <TokenAmountInfo key={tok.address} token={tok} amount={fromWei(payback.payback![index]!)} />       
            </Flex>
          )}
          </Flex>
        </Flex>
        <Flex sx={{flexDirection: "column", gap: "25px", mb: 10}}>
          <BlockText variant="primary">You receive</BlockText>
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
              <TokenAmountInfo key={tok.address} token={tok} amount={fromWei(remove.remove![index]!.sub(payback.payback![index]!))} />       
            </Flex>
          )}
          </Flex>
        </Flex>
        <Flex sx={{flexDirection: "column", gap: "25px", mb: 10}}>
          <BlockText variant="primary">Position Statistics</BlockText>
          <Flex sx={{ justifyContent: "left", gap: "8px", flexDirection: "column"}}>
            <BlockText>{"New Est. Debt Ratio: ".concat(humanFriendlyNumber(payback.debtRatio!)).concat("/100")}</BlockText>
            <BlockText mb={2}>{"New Leverage: ".concat(humanFriendlyNumber(payback.lever!)).concat("x")}</BlockText>
            <BlockText>{"Farming Apy: ".concat(humanFriendlyNumber(payback.apy!*100)).concat("%")}</BlockText>

          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
            {confirmLoading ? (
              <Spinner />
            ) : (
              <Flex sx={{ justifyContent: "center", gap: "6px"}} >
                {done ? <Button onClick={() => {
                  history.push('/positions');
                  setPage(removePage.Remove); 
                }}>Return</Button> : confirmButton}
              </Flex>                
            )}
        </Flex>
      </Card>
    </Flex>
  );
};
