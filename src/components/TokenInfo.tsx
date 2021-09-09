import styled from "@emotion/styled";
import { Token } from "src/utils/token";

interface Props {
  token: Token;
}

export const TokenInfo: React.FC<Props> = ({ token }: Props) => {
  return (
    <Wrapper>
      <img src={token.logoURL} />
      <span>{token.symbol}</span>
    </Wrapper>
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