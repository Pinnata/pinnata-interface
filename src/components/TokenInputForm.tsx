import { Token } from "src/utils/token";
import {
    Box,
    Flex,
    Input,
    Text,
  } from "theme-ui";
import { humanFriendlyWei } from "src/utils/eth";
import { fromWei } from "web3-utils";
import { TokenInfo } from "src/components/TokenInfo";
import BN from 'bn.js';
import { DahliaTokenInfo } from "./DahliaTokenInfo";

interface Props {
  token: Token;
  amount: string;
  setAmount: any;
  balance: BN | null;
  dahlia?: boolean;
}

export const TokenInputForm: React.FC<Props> = ({ token, amount, setAmount, balance, dahlia }: Props) => {
  return (
    <Flex sx={{ alignItems: "center" }}>
    <Box sx={{ width: "100%" }} mr={2}>
      <Flex sx={{ justifyContent: "flex-end", mb: 1 }}>
        <Text
          sx={{ color: "primaryText", cursor: "pointer" }}
          variant="form"
          onClick={() => {
            if (balance) {
              const cost = fromWei(balance);
              setAmount(cost);
            }
          }}
        >
          max: {balance ? humanFriendlyWei(balance) : "0"}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center"}}>
        <Input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          mr={2}
        />
        { dahlia ? <DahliaTokenInfo token={token} /> 
        :
        <TokenInfo token={token} />
        }
      </Flex>     
    </Box>
  </Flex>
  )
};
