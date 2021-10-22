import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useParams } from "react-router-dom";
import { DEFAULT_GAS_PRICE, safeBoxMap, Bank, Alfajores } from "src/config";
import { AbiItem, toBN, toWei, fromWei } from "web3-utils";
import { toastTx } from "src/utils/toastTx";
import { toast } from "react-toastify";
import SAFEBOX_ABI from "src/abis/dahlia_contracts/SafeBox.json";
import { SafeBox } from "src/generated/SafeBox";
import { getAddress } from "ethers/lib/utils";
import { useSafeBox } from "src/hooks/useSafeBox";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import { HomoraBank } from "src/generated/HomoraBank";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";
import { CErc20Immutable } from "src/generated/CErc20Immutable";
import { useAsyncState } from "src/hooks/useAsyncState";
import { getToken } from "src/utils/token";
import { CaretLeft } from "phosphor-react";
import {
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Text
} from "theme-ui";
import  { useHistory } from "react-router-dom"
import { BoxTokenAmountInfo } from "src/components/BoxTokenAmountInfo";
import { TokenInputForm } from "src/components/TokenInputForm";
import { BlockText } from "src/components/BlockText";

export const Withdraw: React.FC = () => {
  // TODO: does the number of decimals factor in? 
  const { kit, getConnectedKit } = useContractKit();
  const [amount, setAmount] = React.useState("1");
  const [withdrawLoading, setWithdrawLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(true); 
  const { tokenAddress } = useParams<{ tokenAddress: string}>();
  const [safeBox, refetchSafeBox] = useSafeBox(safeBoxMap.get(tokenAddress)!);
  const history = useHistory(); 

  const bank = React.useMemo(() => (new kit.web3.eth.Contract(
    BANK_ABI.abi as AbiItem[],
    getAddress(Bank[44787])
  ) as unknown) as HomoraBank, [kit]); 

  const call = React.useCallback(async () => {
    try {
        const bankInfo =  await bank.methods.getBankInfo(tokenAddress).call();
        const cToken = (new kit.web3.eth.Contract(
          CERC20_ABI as AbiItem[],
          bankInfo.cToken,
        ) as unknown) as CErc20Immutable;
        const exchangeRate = await cToken.methods.exchangeRateStored().call();
        return {
          exchange: toBN(exchangeRate),
        }
    } catch (error) {
        console.log(error)
    }
  }, [bank, tokenAddress, kit])

  const [info] = useAsyncState(null, call);
  
  const exchangeRate = info ? Number(fromWei(info.exchange)) : 1

  const withdrawButton = (
    <Button
      onClick={async () => {
        const kit = await getConnectedKit();
        // kit is connected to a wallet
        const safeBox = (new kit.web3.eth.Contract(
          SAFEBOX_ABI.abi as AbiItem[],
          safeBoxMap.get(getAddress(tokenAddress))!,
        ) as unknown) as SafeBox;
        try {
          setWithdrawLoading(true);
          const tx = await safeBox.methods
            .withdraw(
              toWei(amount)
            ).send({
              from: kit.defaultAccount,
              gasPrice: DEFAULT_GAS_PRICE,
            });
          toastTx(tx.transactionHash);
          refetchSafeBox();
        } catch (e: any) {
          toast(e.message);
        } finally {
          setWithdrawLoading(false);
          setAmount("0");
        }
      }}
    >
      Withdraw
    </Button>
  );

  const loading =  withdrawLoading || buttonLoading;
  let button = withdrawButton;
  if (safeBox) {
    const fmtCost = amount === "" ? "0" : amount;
    const amountBN = toBN(toWei(fmtCost));
    if (Number(amount) <= 0) {
      button = <Button disabled>Enter a valid amount</Button>
    } else if (safeBox.balance.lt(amountBN)) {
      button = <Button disabled={true}>Insufficient funds</Button>;
    }
    if (buttonLoading) setButtonLoading(false)
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
            Withdraw
          </Heading>
        </Flex>
        <TokenInputForm key={token.address} dahlia token={token} amount={amount}
            setAmount={setAmount} 
            balance={safeBox ? safeBox.balance : null}
          />
        {/* <Flex sx={{mt: "25px"}}>
          <BlockText variant="primary">You will receive</BlockText>
        </Flex> */}
        <Flex sx={{ justifyContent: "center", gap: "10px", mt: 6, alignItems: "center"}}>
          <BlockText variant="primary">You will receive</BlockText>
          <BoxTokenAmountInfo token={token} amount={String(Number(amount) * exchangeRate)} />
        </Flex>
        <Flex sx={{ justifyContent: "center", alignItems: "center",  mt: 6 }}>
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