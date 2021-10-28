import styled from "@emotion/styled";
import React from "react";
import { Token } from "src/utils/token";
import { Text } from "theme-ui";

interface Props {
  token: Token;
  apy: string;
}

export const TokenBorrowInfo: React.FC<Props> = ({ token, apy }: Props) => {
  return (
    <div className="flex items-center -mb-1 justify-center">
      <img
        className="w-8 shadow-md rounded-full"
        key={token.address}
        src={token.logoURL}
        alt={`Icon of token ${token.name} (${token.symbol})`}
      />
      <p className="ml-2 text-base">{apy}%</p>
    </div>
  );
};
