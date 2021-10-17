import { toast } from "react-toastify";
import { Text } from "theme-ui";
import { BlockscoutTxLink } from "src/components/BlockscoutTxLink";

export const toastTx = (tx: string) => {
  toast(
    <>
      <Text color="#8d8d8d">Transaction completed! </Text>
      <BlockscoutTxLink tx={tx}>View on Blockscout</BlockscoutTxLink>
    </>
  );
};
