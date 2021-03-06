import { fromWei } from "web3-utils";
import { humanFriendlyNumber } from "src/utils/number";

export const humanFriendlyWei = (wei: any | string) => {
  return humanFriendlyNumber(fromWei(wei));
};
