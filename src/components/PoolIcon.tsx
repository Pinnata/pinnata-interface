import styled from "@emotion/styled";
import React from "react";
import { Token } from "src/utils/token";

interface Props {
  tokens: readonly Token[];
}

export const PoolIcon: React.FC<Props> = ({ tokens }: Props) => {
  return (
    <Wrapper>
      {tokens.map((tok) => (
        <img
          key={tok.address}
          src={tok.logoURL}
          alt={`Icon of token ${tok.name} (${tok.symbol})`}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 0;
  align-items: center;
  height: 24px;
  img {
    height: 100%;
    border-radius: 12px;
  }
`;
