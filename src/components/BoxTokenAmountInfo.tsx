import { Flex } from "theme-ui"
import { Token } from "src/utils/token";
import { TokenAmountInfo } from "src/components/TokenAmountInfo"

interface Props {
  token: Token;
  amount: string;
}

export const BoxTokenAmountInfo: React.FC<Props> = ({ token, amount }: Props) => {
  return (
    <Flex
          sx={{
            alignItems: "center",
            mr: 4,
            padding:2,
            borderStyle: "solid",
            borderRadius: "10px",
          }}
        >
          <TokenAmountInfo token={token} amount={amount} />
    </Flex>
  );
};
