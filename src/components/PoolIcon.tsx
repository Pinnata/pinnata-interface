import React from "react";
import { Token } from "src/utils/token";

interface Props {
  tokens: readonly Token[];
}

export const PoolIcon: React.FC<Props> = ({ tokens }: Props) => {
  return (
    <div className="flex">
      {tokens.map((tok) => (
        <img
          className="w-10 rounded-full shadow-md mb-2 -ml-2"
          key={tok.address}
          src={tok.logoURL}
          alt={`Icon of token ${tok.name} (${tok.symbol})`}
        />
      ))}
    </div>
  );
};
