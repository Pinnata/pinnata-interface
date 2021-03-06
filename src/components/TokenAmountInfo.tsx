import styled from "@emotion/styled";
import { Token } from "src/utils/token";
import { humanFriendlyNumber } from "src/utils/number"
import { BlockText } from "src/components/BlockText"
// import Lp from "./../images/LP.png";


interface Props {
  token: Token;
  amount: string;
}

export const TokenAmountInfo: React.FC<Props> = ({ token, amount }: Props) => {
  return (
    <Wrapper>
      <img src={token.logoURL === 'lp' ? "/images/LP.png" : token.logoURL} alt='token_logo'/>
      <BlockText>{humanFriendlyNumber(amount).concat(" ").concat(token.symbol)}</BlockText>
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
  span {

  }
`;