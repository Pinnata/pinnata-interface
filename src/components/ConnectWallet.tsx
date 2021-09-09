import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import { Card, Text, Flex } from "theme-ui";
import { shortenAddress } from "src/utils/address";
import { Wallet } from "phosphor-react";

export const ConnectWallet: React.FC = () => {
  const { address, connect } = useContractKit();
  return (
    <Card
      sx={{ cursor: "pointer", height: "fit-content" }}
      onClick={async () => {
        try {
          await connect();
        } catch (e) {
          console.warn(e);
        }
      }}
      px={3}
    >
      <Flex sx={{ alignItems: "center" }}>
        <Wallet size={28} />
        <Text ml={3}>
          {address ? shortenAddress(address) : "Connect Wallet"}
        </Text>
      </Flex>
    </Card>
  );
};
