import styled from "@emotion/styled";
import { Token } from "src/utils/token";
import { Text } from "theme-ui";

interface Props {
  token: Token;
}

export const RewardsTokenInfo: React.FC<Props> = ({ token }: Props) => {
  return (
    <div className="flex items-center -mb-1 justify-center">
      <img
        className="w-8 shadow-md rounded-full"
        key={token.address}
        src={token.logoURL}
        alt={`Icon of token ${token.name} (${token.symbol})`}
      />
      <p className="ml-2 text-base">{token.name}</p>
    </div>
  );
};


