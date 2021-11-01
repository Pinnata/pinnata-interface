import styled from "@emotion/styled";
import { Token } from "src/utils/token";
import { Text } from "theme-ui";

interface Props {
  token: Token;
}

export const RewardsTokenInfo: React.FC<Props> = ({ token }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <img className="w-10" src={token.logoURL} alt="token_logo" />
      <Text>{token.symbol}</Text>
    </div>
  );
};
