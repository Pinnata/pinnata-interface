import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useParams } from "react-router-dom";
import styled from '@emotion/styled';
import { Spinner } from "@theme-ui/components";
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
import Background from 'src/images/logo.png';
import { humanFriendlyWei } from "src/utils/eth";
import { fromWei } from "web3-utils";
import { getToken } from "src/utils/token";


export const Supply: React.FC = () => {

  const { getConnectedKit } = useContractKit();
  const [amount, setAmount] = React.useState("1");
  const [approveLoading, setApproveLoading] = React.useState(false);
  const [supplyLoading, setSupplyLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(true); 
  const { tokenAddress } = useParams<{ tokenAddress: string}>();
  const [erc, refetchERC] = useERC(tokenAddress, safeBoxMap.get(getAddress(tokenAddress))!);

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
    
  const token = getToken(tokenAddress); 

return (
  <Wrapper>
    <Header>Supply</Header>
    <InfoCard>
      <InfoHeader>Supply tokens</InfoHeader>
      <InputContainer>
        <div className='flex'>
          <Desc>I’d like to supply</Desc>
          <Balance>Balance {erc ? humanFriendlyWei(erc.balance) : "0.000"}</Balance>
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
            if (erc) {
              const cost = fromWei(erc.balance);
              setAmount(cost);
            }
          }}
          >MAX</Max>
        </Content>
        <Line />
        <Description>
          {"You will recieve Dahlia interest-bearing ".concat(token!.symbol)}
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

export default Supply;

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
