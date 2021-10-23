import styled from "@emotion/styled";
import { Token } from "src/utils/token";
import { Text } from "theme-ui";


interface Props {
  token: Token;
}

export const RewardsTokenInfo: React.FC<Props> = ({ token }: Props) => {
  return (
    <Wrapper>
      <img src={token.logoURL} alt='token_logo'/>
      <Text>{token.symbol}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 24px;
    height: 24px;
    border-radius: 16px;
  }
`;