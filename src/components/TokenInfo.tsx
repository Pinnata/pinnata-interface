import styled from "@emotion/styled";
import { Token } from "src/utils/token";
import { Text } from "theme-ui";
import Lp from "src/images/LP.png";

interface Props {
  token: Token;
}

export const TokenInfo: React.FC<Props> = ({ token }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <img
        className="w-8 rounded-full shadow-md"
        src={token.logoURL === "lp" ? Lp : token.logoURL}
        alt="token_logo"
      />
      <p className="ml-2 font-bold">{token.symbol}</p>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
  }
`;
