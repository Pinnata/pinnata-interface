import { Flex } from "theme-ui";
import { Token } from "src/utils/token";
import { TokenAmountInfo } from "src/components/TokenAmountInfo";

interface Props {
  token: Token;
  amount: string;
}

export const BoxTokenAmountInfo: React.FC<Props> = ({
  token,
  amount,
}: Props) => {
  return (
    <p className="flex items-center font-bold">
      <TokenAmountInfo token={token} amount={amount} />
    </p>
  );
};
