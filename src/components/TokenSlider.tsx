import { Token } from "src/utils/token";
import React from "react";
import {
    Box,
    Flex,
    Input,
    Text,
  } from "theme-ui";
import { humanFriendlyWei } from "src/utils/eth";
import { fromWei } from "web3-utils";
import { TokenInfo } from "src/components/TokenInfo";
import { TokenAmountInfo } from "src/components/TokenAmountInfo";
import BN from 'bn.js';
import { Slider } from "rsuite";
import "rsuite/dist/styles/rsuite-default.min.css";


interface Props {
  token: Token;
  amount: string;
  setAmount: any,
  max: string;
}

export const TokenSlider: React.FC<Props> = ({ token, amount, setAmount, max}: Props) => {
    const start: number = Number(max) / 3; 
    React.useEffect(() => setAmount(String(start)), []);
  return (
    <Flex sx={{ alignItems: "center" }}>
    <Box sx={{ width: "100%" }} mr={2}>
      <Flex sx={{ width: "100%", alignItems: "center"}}>
          <Slider
              progress
              defaultValue={start}
              style={{width: "100%"}}
              step={.001}
              max={Number(max)}
              onChange={(value) => setAmount(String(value))}
          />      
        <TokenAmountInfo token={token} amount={amount} />
      </Flex>   
    </Box>
  </Flex>
  )
};
