
import { useContractKit } from "@celo-tools/use-contractkit";

import UNI_PAIR from "src/abis/dahlia_contracts/dependencies/ubeswap/ubeswap@mainnet-v1/IUniswapV2Pair.json";
import { IUniswapV2Pair } from "src/generated/IUniswapV2Pair";
import { useAsyncState } from "src/hooks/useAsyncState";
import { isAddress, toBN, AbiItem, fromWei } from "web3-utils";
import { getAddress } from "ethers/lib/utils";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import PROXYORACLE_ABI from "src/abis/dahlia_contracts/ProxyOracle.json";
import COREORACLE_ABI from "src/abis/dahlia_contracts/CoreOracle.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { ProxyOracle } from "src/generated/ProxyOracle";
import { CoreOracle } from "src/generated/CoreOracle";
import MINICHEF_ABI from "src/abis/sushi/MiniChefV2.json";
import { MiniChefV2 } from "src/generated/MiniChefV2";
import WMINICHEF_ABI from "src/abis/dahlia_contracts/WMiniChefV2.json";
import { WMiniChefV2 } from "src/generated/WMiniChefV2";
import COMPLEXREWARDERTIME from "src/abis/sushi/ComplexRewarderTime.json";
import { ComplexRewarderTime } from "src/generated/ComplexRewarderTime";
import { Bank, FarmType, sushiLPadd } from "src/config";

export enum TokenType {
  Oracle,
  Sushi
}

// export const price = async (token: string, tokenType: TokenType, bank: HomoraBank) => {
//   const { kit, network } = useContractKit();
//   const scale = toBN(2).pow(toBN(112));

//   const oracle = await bank.methods.oracle().call();

//   const proxyOracle = new kit.web3.eth.Contract(
//     PROXYORACLE_ABI.abi as AbiItem[],
//     oracle
//   ) as unknown as ProxyOracle;

//   const coreOracle = new kit.web3.eth.Contract(
//     COREORACLE_ABI.abi as AbiItem[],
//     (await proxyOracle.methods.source().call())
//   ) as unknown as CoreOracle;

//   if (tokenType === TokenType.Oracle) {
//     return toBN(await coreOracle.methods.getCELOPx(token).call())
//   } else {
//     const sushiLP = (new kit.web3.eth.Contract(
//       UNI_PAIR.abi as AbiItem[],
//       sushiLPadd,
//     ) as unknown) as IUniswapV2Pair;

//     let reserveS: any;
//     let reserveC: any;
//     const getReserves = await sushiLP.methods.getReserves().call();
//     if (
//       getAddress(await sushiLP.methods.token0().call()) ===
//       getAddress(token)
//     ) {
//     reserveS = toBN(getReserves.reserve0);
//     reserveC = toBN(getReserves.reserve1);
//     } else {
//     reserveS = toBN(getReserves.reserve1);
//     reserveC = toBN(getReserves.reserve0);
//     }
//     return reserveC.mul(scale).div(reserveS);
//   }
// };
