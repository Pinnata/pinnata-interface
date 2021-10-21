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
      className="hover:opacity-75"
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
        <p className="font-bold ml-2 tracking-tight">
          {address ? shortenAddress(address) : "Connect Wallet"}
        </p>
      </Flex>
    </Card>
  );
};
