import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import IERC20_ABI from "src/abis/dahlia_contracts/IERC20.json"
import { IERC20 } from "src/generated/IERC20";
import { useAsyncState } from "src/hooks/useAsyncState";
import { isAddress, toBN, AbiItem } from "web3-utils";
import { getAddress } from "ethers/lib/utils";

export const useERC = (tokenAddress: string, allowAddress?: string) => {
  const { kit, address } = useContractKit();
  const call = React.useCallback(async () => {
    if (!tokenAddress || !isAddress(tokenAddress) || !address) {
      return null;
    }
    const ERCToken = (new kit.web3.eth.Contract(
      IERC20_ABI.abi as AbiItem[],
      getAddress(tokenAddress),
    ) as unknown) as IERC20;

    const allowance = allowAddress ? toBN(
      await ERCToken.methods.allowance(address, allowAddress).call()
    ) : toBN("0");
    const balance = toBN(await ERCToken.methods.balanceOf(address).call());
    return { allowance, balance };
  }, [kit, address, tokenAddress, allowAddress]);
  return useAsyncState(null, call);
};
