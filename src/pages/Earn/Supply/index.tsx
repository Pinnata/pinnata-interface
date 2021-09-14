import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useParams } from "react-router-dom";
import { DEFAULT_GAS_PRICE, safeBoxMap } from "src/config";
import { AbiItem, toBN, toWei } from "web3-utils";
import { toastTx } from "src/utils/toastTx";
import { toast } from "react-toastify";
import { MaxUint256 } from "@ethersproject/constants";
import ERC20_ABI from "src/abis/fountain_of_youth/ERC20.json";
import SAFEBOX_ABI from "src/abis/dahlia_contracts/SafeBox.json";
import { ERC20 } from "src/generated/ERC20";
import { SafeBox } from "src/generated/SafeBox";
import { useERC } from "src/hooks/useERC";
import { getAddress } from "ethers/lib/utils";
import { getToken } from "src/utils/token";
import {
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Text
} from "theme-ui";
import { TokenInputForm } from "src/components/TokenInputForm";
import  { useHistory } from "react-router-dom"
import { CaretLeft } from "phosphor-react";



export const Supply: React.FC = () => {

  const { getConnectedKit } = useContractKit();
  const [amount, setAmount] = React.useState("1");
  const [approveLoading, setApproveLoading] = React.useState(false);
  const [supplyLoading, setSupplyLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(true); 
  const { tokenAddress } = useParams<{ tokenAddress: string}>();
  const [erc, refetchERC] = useERC(tokenAddress, safeBoxMap.get(getAddress(tokenAddress))!);
  const history = useHistory();

  const approveButton = (
    <Button
      onClick={async () => {
        const kit = await getConnectedKit();
        // kit is connected to a wallet
        try {
          setApproveLoading(true);
          const ERCToken = (new kit.web3.eth.Contract(
            ERC20_ABI as AbiItem[],
            tokenAddress
          ) as unknown) as ERC20; 
          const tx = await ERCToken.methods
            .approve(safeBoxMap.get(getAddress(tokenAddress))!, MaxUint256.toString())
            .send({
              from: kit.defaultAccount,
              gasPrice: DEFAULT_GAS_PRICE,
              gas: 10000000,
            });
          toastTx(tx.transactionHash);
          refetchERC();
        } catch (e) {
          toast(e.message);
        } finally {
          setApproveLoading(false);
        }
      }}
    >
      Approve
    </Button>
  );

  const supplyButton = (
    <Button
      onClick={async () => {
        const kit = await getConnectedKit();
        // kit is connected to a wallet
        const safeBox = (new kit.web3.eth.Contract(
          SAFEBOX_ABI.abi as AbiItem[],
          safeBoxMap.get(getAddress(tokenAddress))!,
        ) as unknown) as SafeBox;
        try {
          setSupplyLoading(true);
          const tx = await safeBox.methods
            .deposit(
              toWei(amount)
            ).send({
              from: kit.defaultAccount,
              gasPrice: DEFAULT_GAS_PRICE,
              gas: 10000000,
            });
          toastTx(tx.transactionHash);
          refetchERC();
        } catch (e) {
          toast(e.message);
        } finally {
          setSupplyLoading(false);
          setAmount("0")
        }
      }}
    >
      Deposit
    </Button>
  );

  const loading = approveLoading || supplyLoading || buttonLoading;
  let button = approveButton;
  if (erc) {
    const fmtCost = amount === "" ? "0" : amount;
    const amountBN = toBN(toWei(fmtCost));
    if (Number(amount) <= 0) {
      button = <Button disabled>Enter a valid amount</Button>
    } else if (erc.balance.lt(amountBN)) {
      button = <Button disabled={true}>Insufficient funds</Button>;
    } else if (erc.allowance.gt(amountBN)) {
      button = supplyButton;
    }
    if (buttonLoading) setButtonLoading(false); 
  }
    
  const token = getToken(tokenAddress)!; 

return (
  <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
      <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
      <Flex
          onClick={() => history.goBack()}
          sx={{ alignItems: "center", cursor: "pointer" }}
          mb={4}
        >
          <CaretLeft size={28} />
          <Text>Back</Text>
        </Flex>
        <Flex mb={4}>
          <Heading as="h2" mr={2}>
            Supply
          </Heading>
        </Flex>
        <Flex sx={{flexDirection: "column", gap: "25px", mb: 10}}>
            <TokenInputForm key={token.address} token={token} amount={amount}
             setAmount={setAmount} 
             balance={erc ? erc.balance! : null}
            />
        </Flex>
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
          {loading ? (
              <Spinner />
            ) : (
              button
            )}
        </Flex>
      </Card>
    </Flex>
);
};