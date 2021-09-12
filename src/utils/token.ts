import DEFAULT_TOKEN_LIST from "@ubeswap/default-token-list";
import { Token as UToken } from "@ubeswap/token-math";
import { TokenInfo } from "@uniswap/token-lists";
import { COLLATERAL_TOKENS } from "src/config";
import { getAddress } from "ethers/lib/utils";


export class Token implements UToken<Token> {
  public readonly logoURL: string;

  constructor(public readonly info: TokenInfo) {
    this.logoURL =
      info.logoURI ??
      DEFAULT_TOKEN_LIST.tokens.find((tok) => tok.address === info.address)
        ?.logoURI ??
      "";
  }

  get address(): string {
    return this.info.address;
  }

  get name(): string {
    return this.info.name;
  }

  get symbol(): string {
    return this.info.symbol;
  }

  get decimals(): number {
    return this.info.decimals;
  }

  public equals(other: Token): boolean {
    return this.address === other.address;
  }

  public toString(): string {
    return `Token(address=${this.address}, name=${this.name}, symbol=${this.symbol}, decimals=${this.decimals})`;
  }
}

export const getToken = (tokenAddress: string) => {
  let token = COLLATERAL_TOKENS.filter( ({ address }) => getAddress(address.toLowerCase()) === getAddress(tokenAddress.toLowerCase()))
  if (token.length !== 1) return null;
  return token[0];
}
