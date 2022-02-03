import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import { shortenAddress } from "src/utils/address";
import { Wallet } from "phosphor-react";

export const ConnectWallet: React.FC = () => {
  const { address, connect } = useContractKit();
  return (
    <div
      className="hover:opacity-75 border p-2 cursor-pointer bg-gradient-to-br from-blue-700 to-green-300 rounded-3xl"
      // className="from-blue-700 p-2 cursor-pointer to-green-300 text-white border-blue-700 bg-gradient-to-r hover:to-blue-700 hover:from-green-300 hover:text-white active:bg-blue-700 font-bold uppercase rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      onClick={async () => {
        try {
          await connect();
        } catch (e) {
          console.warn(e);
        }
      }}
    >
      <div className="flex items-center justify-center">
        <Wallet className="text-white" size={28} />
        <p className="font-bold ml-2 tracking-tight text-white text-center">
          {address ? shortenAddress(address) : "Connect Wallet"}
        </p>
      </div>
    </div>
  );
};
