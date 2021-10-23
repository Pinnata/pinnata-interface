import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import { Card, Text, Flex } from "theme-ui";
import { shortenAddress } from "src/utils/address";
import { Wallet } from "phosphor-react";

export const ConnectWallet: React.FC = () => {
  const { address, connect } = useContractKit();
  return (
    <div
      className="hover:opacity-75 border p-2 cursor-pointer"
      onClick={async () => {
        try {
          await connect();
        } catch (e) {
          console.warn(e);
        }
      }}
    >
      <div className="flex items-center">
        <Wallet size={28} />
        <p className="font-bold ml-2 tracking-tight">
          {address ? shortenAddress(address) : "Connect Wallet"}
        </p>
      </div>
    </div>
  );
};
