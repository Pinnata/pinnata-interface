import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import SAFEBOX_ABI from "src/abis/dahlia_contracts/SafeBox.json"
import { SafeBox } from "src/generated/SafeBox";
import { useAsyncState } from "src/hooks/useAsyncState";
import { isAddress, toBN, AbiItem } from "web3-utils";

export const useSafeBox = (tokenAddress: string) => {
  const { kit, address } = useContractKit();
  const call = React.useCallback(async () => {
    if (!tokenAddress || !isAddress(tokenAddress) || !address) {
      return null;
    }
    const safeBox = (new kit.web3.eth.Contract(
      SAFEBOX_ABI.abi as AbiItem[],
      tokenAddress,
    ) as unknown) as SafeBox;
    const balance = toBN(await safeBox.methods.balanceOf(address).call());
    return { balance };
  }, [kit, address, tokenAddress]);
  return useAsyncState(null, call);
};
