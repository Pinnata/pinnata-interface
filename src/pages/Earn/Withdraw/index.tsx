import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled"
import { DEFAULT_GAS_PRICE, safeBoxMap, Bank } from "src/config";
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
import Background from 'src/images/logo.png';
import { humanFriendlyWei } from "src/utils/eth";
import { Spinner } from "@theme-ui/components";
import { getToken } from "src/utils/token";


export const Withdraw: React.FC = () => {
  // TODO: does the number of decimals factor in? 
  const { kit, getConnectedKit, network } = useContractKit();
  const [amount, setAmount] = React.useState("1");
  const [withdrawLoading, setWithdrawLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(true); 
  const { tokenAddress } = useParams<{ tokenAddress: string}>();
  const [safeBox, refetchSafeBox] = useSafeBox(safeBoxMap.get(tokenAddress)!);

  const bank = React.useMemo(() => (new kit.web3.eth.Contract(
    BANK_ABI.abi as AbiItem[],
    getAddress(Bank[network.chainId])
  ) as unknown) as HomoraBank, [kit, network]); 

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
        } catch (e) {
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
    
  const token = getToken(tokenAddress); 

  return (
    // <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
    //   <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
    //     <Flex
    //       onClick={() => history.goBack()}
    //       sx={{ alignItems: "center", cursor: "pointer" }}
    //       mb={4}
    //     >
    //       <CaretLeft size={28} />
    //       <Text>Back</Text>
    //     </Flex>
    //     <Flex mb={4}>
    //       <Heading as="h2" mr={2}>
    //         Withdraw
    //       </Heading>
    //     </Flex>
    //       <TokenInputForm key={token[0]!.address} token={token[0]!} amount={String(Number(amount) * exchangeRate)} dahlia
    //          setAmount={setAmount} 
    //          balance={safeBox ? safeBox.balance : null}
    //         />
    //     <Flex sx={{ justifyContent: "center", mt: 6, gap: "8px", alignItems: "center"}}>
    //       <span>Receive</span>
    //       <BoxTokenAmountInfo token={token[0]!} amount={amount} />
    //     </Flex>
    //     <Flex sx={{ justifyContent: "center", mt: 6 }}>
    //         {loading ? (
    //           <Spinner />
    //         ) : (
    //           button
    //         )}
    //     </Flex>
    //   </Card>
    // </Flex>
    <Wrapper>
    <Header>Withdraw</Header>
    <InfoCard>
      <InfoHeader>Withdraw tokens</InfoHeader>
      <InputContainer>
        <div className='flex'>
          <Desc>I’d like to withdraw</Desc>
          <Balance>Balance {safeBox ? humanFriendlyWei(safeBox.balance) : "0.000"}</Balance>
        </div>
        <Content>
          <div className='flex'>
            <Image src={token!.logoURL} alt='celo' />
          </div>
          <Num
            value={amount}
              onChange={(e: React.FormEvent<HTMLInputElement>) => setAmount((e.target as any).value)}
          ></Num>
          <Max onClick={() => {
            if (safeBox) {
              const cost = fromWei(safeBox.balance);
              setAmount(cost);
            }
          }}
          >MAX</Max>
        </Content>
        <Line />
        <Description>
          {"You will recieve ".concat(String(Number(amount) * exchangeRate)).concat(" ").concat(token!.symbol)}
        </Description>
        <FlexImage>
          <img src={Background} alt='background' />
        </FlexImage>
        <FlexContainer>
        {loading ? (
          <Spinner />
        ) : (
          button
        )}
        </FlexContainer>
      </InputContainer>
    </InfoCard>
  </Wrapper>
  );
};

const FlexContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
padding-top: 1rem;
padding-bottom: 2rem;
`;

const Button = styled.button`
width: 268px;
height: 58px;
background: #1c2127;
border: 1px solid #80ffdb;
box-shadow: 0px 0px 12px rgba(128, 255, 219, 0.36);
border-radius: 5px;
font-weight: 600;
font-size: 22px;
color: var(--main-color);
display: flex;
align-items: center;
justify-content: center;
`;

const FlexImage = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 150px;
img {
  width: 174px;
  height: auto;
}
`;

const Description = styled.p`
font-size: 16px;
color: #72828a;
font-weight: 400;
padding: 0;
margin: 1.5rem 0 0.5rem;
text-align: left;
`;

const Line = styled.div`
width: 100%;
height: 1px;
/* background: #72828a25; wrong code*/
margin: 1rem auto 0.5rem;
`;

const Image = styled.img`
width: 30px;
height: auto;
padding-bottom: 0;
`;

const Num = styled.input`
color: var(--white);
font-size: 18px;
font-weight: 400;
display: flex;
align-items: center;
height: 100%;
border: none;
outline: none;
background: none;
padding: 0;
margin: 0;
`;

const Max = styled.h3`
color: var(--main-color);
font-weight: 600;
font-size: 14px;
margin-left: auto;
display: flex;
align-items: center;
justify-content: center;
width: 84px;
height: 35px;
color: var(--main-color);
background: #1c2127;
border: 1px solid #80ffdb;
box-shadow: 0px 0px 12px rgba(128, 255, 219, 0.36);
border-radius: 5px;
`;

const InputContainer = styled.div`
width: calc(100% - 4rem);
margin: 0.5rem auto 2rem;
display: block;
text-align: right;
.flex {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
`;

const Balance = styled.h3`
font-size: 16px;
color: var(--fourth-color);
padding: 0;
margin: 0;
margin-bottom: 0.5rem;
`;

const Content = styled.div`
width: 100%;
height: 50px;
border-radius: 5px;
display: grid;
grid-template-columns: 0.7fr 3fr 1fr;
grid-template-rows: 1fr;
.flex {
  display: flex;
  align-items: center;
}
`;

const Desc = styled.h2`
font-size: 18px;
color: var(--white);
font-weight: 400;
`;

const Wrapper = styled.section`
width: 45vw;
min-height: 57vh;
display: block;
margin: 3rem auto 6rem;
`;

const Header = styled.h1`
font-size: 36px;
font-weight: 700;
color: var(--main-color);
padding: 0;
margin: 0;
margin-bottom: 2rem;
text-align: center;
`;

const InfoCard = styled.article`
width: 100%;
min-height: 40vh;
display: block;
background: var(--third-color);
border-radius: 5px;
box-shadow: 0px 0px 12px rgba(128, 255, 219, 0.36);
`;

const InfoHeader = styled.h2`
font-size: 24px;
font-weight: 600;
color: var(--main-color);
padding: 0;
padding-left: 2rem;
padding-top: 1rem;
margin: 2rem 0;
`;
