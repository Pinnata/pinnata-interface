import React from "react";
import {
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
} from "theme-ui";
import { useERC } from "src/hooks/useERC";
import { useERCmulti } from "src/hooks/useERCmulti";
import { TokenInputForm } from "src/components/TokenInputForm";
import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import { farmPageState, farmPage, poolState } from "src/pages/Farm/newFarm/NewFarm";
import { BlockText } from "src/components/BlockText";
import { Token } from "src/utils/token";
import { toWei, toBN } from "web3-utils";
import { lpToken } from "src/config";
import BN from 'bn.js';

interface supplyProps {
  tokenSupply: BN[] | null;
  lpSupply: BN | null;
}

const emptyNewSupplyState : supplyProps = {
  tokenSupply: null,
  lpSupply: null,
}

export const newSupplyState = atom({
  key: 'newSupplyState',
  default: emptyNewSupplyState
})

export const Supply: React.FC = () => {
  const [pool] = useRecoilState(poolState);
  const setSupply = useSetRecoilState(newSupplyState); 
  const setPage = useSetRecoilState(farmPageState)
  const [buttonLoading, setButtonLoading] = React.useState(true); 

  const lpTok: Token = new Token({
    ...lpToken,
    address: pool!.lp,
  });
  const [erc] = useERC(lpTok.address);
  const [tokenStates] = useERCmulti(pool!.tokens)
  
  const [amounts, setAmounts] = React.useState(Array<string>(pool.tokens.length).fill("0"))

  React.useEffect(() => setAmounts(Array<string>(pool.tokens.length).fill("0")), [pool.tokens])

  const [lpAmount, setLPAmount] = React.useState("0")

  const continueButton = (
    <Button
      onClick={() => {
        console.log(amounts)
        setSupply({
          tokenSupply: amounts.map((x) => toBN(toWei(x))),
          lpSupply: toBN(toWei(lpAmount)),
        })
        setPage(farmPage.Borrow); 
      }}
      >
        Continue
      </Button>
  )

  const invalid = (<Button disabled>Enter a valid amount</Button>)
  const insufficient = (<Button disabled={true}>Insufficient funds</Button>);

  let button = continueButton;
  if (amounts.length === 0) return null;
  if (tokenStates) {
    for (let i = 0; i < tokenStates.length; i += 1) {
      if (tokenStates[i]){
        const fmtCost = amounts[i] === "" ? "0" : amounts[i]!;
        const amountBN = toBN(toWei(fmtCost))
        if (Number(fmtCost) < 0 || amounts[i] === "") {
          button = invalid;
        } else if (tokenStates[i]?.balance.lt(amountBN)) {
          button = insufficient;
        } 
      }
    }
    if (erc) {
      const fmtCost = lpAmount === "" ? "0" : lpAmount;
      const amountBN = toBN(toWei(lpAmount))
      if (Number(fmtCost) < 0 || lpAmount === "") {
        button = invalid;
      } else if (erc.balance.lt(amountBN)) {
        button = insufficient;
      }
      if (amounts.every((x) => x === "0") && lpAmount === "0") button = invalid; 
      if (buttonLoading) setButtonLoading(false); 
    }
  }

  return (
    <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
      <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
        <Flex mb={4}>
          <Heading as="h2" mr={2}>
            Farm
          </Heading>
        </Flex>
        <Flex sx={{flexDirection: "column", gap: "25px", mb: 10}}>
          <BlockText variant="primary">Supply</BlockText>
          {pool.tokens.map((tok, index) => 
            <TokenInputForm key={tok.address} token={tok} amount={amounts[index]!}
             setAmount={(s: string) => setAmounts(amounts.map((x, i) => i === index ? s : x))} 
             balance={tokenStates && tokenStates![index]! ? tokenStates![index]?.balance! : null}
            />
          )}
        </Flex>
        <Flex sx={{mt: "25px"}}>
          <BlockText variant="primary">Supply LP Token</BlockText>
        </Flex>
        <TokenInputForm token={lpTok} amount={lpAmount} setAmount={setLPAmount} balance={erc ? erc.balance : null}/>
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
          {buttonLoading ? (
              <Spinner />
            ) : (
              button
            )}
        </Flex>
      </Card>
    </Flex>
  );
};
