import { ChainId, Network, NetworkNames } from "@celo-tools/use-contractkit";
import { toWei } from "web3-utils";
import { Token } from "src/utils/token";
import { getAddress } from "ethers/lib/utils";


export const Bank = {
  [ChainId.CeloMainnet]: getAddress("0x000531a6B61550cfADb637a625A00236fcDD1bDB"),
  [ChainId.Alfajores]: getAddress("0x000531a6B61550cfADb637a625A00236fcDD1bDB"),
  [ChainId.Baklava]: getAddress("0x000531a6B61550cfADb637a625A00236fcDD1bDB"),
  [ChainId.EthereumMainnet]: '0',
  [ChainId.Kovan]: '0'
};

export const Alfajores: Network = {
  graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
  name: NetworkNames.Alfajores,
  rpcUrl: "https://alfajores-forno.celo-testnet.org",
  chainId: ChainId.Alfajores,
  explorer: "https://alfajores-blockscout.celo-testnet.org/",
}

export const lpToken = {
  address: "",
  name: "Ubeswap LP",
  symbol: "ULP",
  decimals: 18,
  chainId: ChainId.Alfajores,
  logoURI: "lp"
};

export const COLLATERAL_TOKENS = [
  new Token({
    address: getAddress("0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"),
    name: "Celo",
    symbol: "CELO",
    decimals: 18,
    chainId: ChainId.Alfajores,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
  }),
  new Token({
    address: getAddress("0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"),
    name: "Celo Dollar",
    symbol: "cUSD",
    decimals: 18,
    chainId: ChainId.Alfajores,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png",
  }),
  new Token({
    address: getAddress("0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F"),
    name: "Celo Euro",
    symbol: "cEUR",
    decimals: 18,
    chainId: ChainId.Alfajores,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cEUR.png",
  }),
];

export const FARMS = [
  {
    name: "CELO-cUSD",
    wrapper: getAddress("0x80Dc9384cA650130e69A5b25508bD05B05730606"),
    spell: getAddress("0x6B9cFFD73aD5d95921566D672F9B4D0Ca061D64e"),
    lp: getAddress("0x595BBFCe08e71481CFDC2Fe1107cA4C0D1C66b00"),
    apy: "156", 
    tokens: [
      new Token({
        address: getAddress("0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"),
        name: "Celo Dollar",
        symbol: "cUSD",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png",
      }),
      new Token({
        address: getAddress("0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
      }),
    ],
  },
  {
    name: "CELO-cEUR",
    wrapper: getAddress("0xE82BE5834a225a0C3A2F2B59BB5502adD59901FC"),
    spell: getAddress("0x6B9cFFD73aD5d95921566D672F9B4D0Ca061D64e"),
    lp: getAddress("0xB3C20f3011ac4f713b3E6252E9B6A2060EB912a1"),
    apy: "113",
    tokens: [
      new Token({
        address: getAddress("0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F"),
        name: "Celo Euro",
        symbol: "cEUR",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cEUR.png",
      }),
      new Token({
        address: getAddress("0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
      }),
    ],
  },
  {
    name: "cUSD-cEUR",
    wrapper: getAddress("0xFE0b71eEFD81380Ff27A9A8CAA08aEC89204a5Da"),
    spell: getAddress("0x6B9cFFD73aD5d95921566D672F9B4D0Ca061D64e"),
    lp: getAddress("0x98c856FB897dDF4A6243f6B5F343e1F71e253874"),
    apy: "160", 
    tokens: [
      new Token({
        address: getAddress("0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F"),
        name: "Celo Euro",
        symbol: "cEUR",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cEUR.png",
      }),
      new Token({
        address: getAddress("0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"),
        name: "Celo Dollar",
        symbol: "cUSD",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png",
      }),
    ],
  },
];

export const DECIMAL_PRECISION = 3; // Number of decimals to show

//collateral type to safebox
export const safeBoxMap = new Map<string, string>([
  [getAddress("0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"), getAddress("0x325416cb0d7c18457B4538F53525C51F92762FA2")], // celo
  [getAddress("0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"), getAddress("0x95f06d7CE0014a655ede3690314e6440816Db0BD")], // cusd
  [getAddress("0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F"), getAddress("0x701FcC5914b0cEb34CdEd76474b731ec6d4a9D21")], // ceur
]);

export const spellMap = new Map<string, string>([
  [getAddress("0x6B9cFFD73aD5d95921566D672F9B4D0Ca061D64e"), "U-Test"]
]);

export const DEFAULT_GAS_PRICE = toWei("0.5", "gwei");
