import styled from "@emotion/styled";
import { Token } from "src/utils/token";
import { Text } from "theme-ui";
import Lp from "src/images/LP.png";

interface Props {
  token: Token;
}

export const TokenInfo: React.FC<Props> = ({ token }: Props) => {
  return (
    <div className="flex items-center justify-center p-2">
      <img
        className="w-10 rounded-full shadow-md"
        src={token.logoURL === "lp" ? Lp : token.logoURL}
        alt="token_logo"
      />
      <p className="ml-2 font-bold tracking-tighter text-3xl text-gray-800">{token.symbol}</p>
    </div>
  );
};
