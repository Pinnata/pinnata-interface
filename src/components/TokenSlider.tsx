import { Token } from "src/utils/token";
import React from "react";
import { Box, Flex } from "theme-ui";
import { TokenAmountInfo } from "src/components/TokenAmountInfo";
import { Slider } from "rsuite";
import "rsuite/dist/styles/rsuite-default.min.css";

interface Props {
  token: Token;
  amount: string;
  setAmount: any;
  max: string;
}

export const TokenSlider: React.FC<Props> = ({
  token,
  amount,
  setAmount,
  max,
}: Props) => {
  const start: number = Number(max) / 3;
  React.useEffect(() => setAmount(String(start)), [setAmount, start]);
  return (
    <Flex sx={{ alignItems: "center" }}>
      <Box sx={{ width: "100%" }} mr={2}>
        <Flex sx={{ width: "100%", alignItems: "center" }}>
          <Slider
            progress
            defaultValue={start}
            style={{ width: "80%" }}
            step={0.001}
            max={Number(max)}
            onChange={(value) => setAmount(String(value))}
          />
          <TokenAmountInfo token={token} amount={amount} />
        </Flex>
      </Box>
    </Flex>
  );
};
