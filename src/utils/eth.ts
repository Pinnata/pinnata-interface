import { fromWei } from "web3-utils";
import BN from "bn.js";
import { humanFriendlyNumber } from "src/utils/number";

export const humanFriendlyWei = (wei: BN | string) => {
  return humanFriendlyNumber(fromWei(wei));
};
