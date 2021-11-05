import { ChainId, Network, NetworkNames } from "@celo-tools/use-contractkit";
import { toWei, toBN } from "web3-utils";
import { Token } from "src/utils/token";
import { getAddress } from "ethers/lib/utils";


export const Bank = {
  [ChainId.CeloMainnet]: getAddress("0x827cCeA3D460D458393EEAfE831698d83FE47BA7"),
  [ChainId.Alfajores]: getAddress("0x000531a6B61550cfADb637a625A00236fcDD1bDB"),
  [ChainId.Baklava]: getAddress("0x000531a6B61550cfADb637a625A00236fcDD1bDB"),
  [ChainId.EthereumMainnet]: '0',
  [ChainId.Kovan]: '0'
};

// export const Alfajores: Network = {
//   graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
//   name: NetworkNames.Alfajores,
//   rpcUrl: "https://alfajores-forno.celo-testnet.org",
//   chainId: ChainId.Alfajores,
//   explorer: "https://alfajores-blockscout.celo-testnet.org/",
// }

export const CeloMainnet: Network = {
  graphQl: "https://explorer.celo.org/graphiql",
  name: NetworkNames.CeloMainnet,
  rpcUrl: "https://forno.celo.org",
  chainId: ChainId.CeloMainnet,
  explorer: "https://explorer.celo.org/",
}

export const lpToken = {
  address: "",
  name: "Sushiswap LP",
  symbol: "SLP",
  decimals: 18,
  chainId: ChainId.CeloMainnet,
  logoURI: "lp"
};

export const COLLATERAL_TOKENS = [
  // new Token({
  //   address: getAddress("0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"),
  //   name: "Celo",
  //   symbol: "CELO",
  //   decimals: 18,
  //   chainId: ChainId.Alfajores,
  //   logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
  // }),
  new Token({
    address: getAddress("0x765DE816845861e75A25fCA122bb6898B8B1282a"),
    name: "Celo Dollar",
    symbol: "cUSD",
    decimals: 18,
    chainId: ChainId.CeloMainnet,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png",
  }),
  new Token({
    address: getAddress("0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73"),
    name: "Celo Euro",
    symbol: "cEUR",
    decimals: 18,
    chainId: ChainId.CeloMainnet,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cEUR.png",
  }),
];

export const FARMS = [
  {
    name: "cUSD-cEUR",
    wrapper: getAddress("0xE583FeC0B218bB89CbB24d76D2A6D901E082DAAA"),
    spell: getAddress("0x4163A7dB783D3d6d761Bd9060EcDe42D1C2D8c74"),
    lp: getAddress("0x0b655E7D966CB27998af94AA5719ab7BFe07D3b3"),
    apy: "51", 
    tokens: [
      new Token({
        address: getAddress("0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73"),
        name: "Celo Euro",
        symbol: "cEUR",
        decimals: 18,
        chainId: ChainId.CeloMainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cEUR.png",
      }),
      new Token({
        address: getAddress("0x765DE816845861e75A25fCA122bb6898B8B1282a"),
        name: "Celo Dollar",
        symbol: "cUSD",
        decimals: 18,
        chainId: ChainId.CeloMainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png",
      }),
    ],
    rewards: [
      new Token({
        address: getAddress("0xD15EC721C2A896512Ad29C671997DD68f9593226"),
        name: "Sushi",
        symbol: "SUSHI",
        decimals: 18,
        chainId: ChainId.CeloMainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_SUSHI.png",
      }),
      new Token({
        address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.CeloMainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
        }),
    ],
  },
];

export const DECIMAL_PRECISION = 2; // Number of decimals to show

//collateral type to safebox
export const safeBoxMap = new Map<string, string>([
  [getAddress("0x765DE816845861e75A25fCA122bb6898B8B1282a"), getAddress("0xb104422F2Fbc050055671265b95E08aD6057B0B3")], // cusd
  [getAddress("0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73"), getAddress("0x998BA352aD84CC0CD7E71B1Cc11Fd192D624254C")], // ceur
]);

export const spellMap = new Map<string, string>([
  [getAddress("0x4163A7dB783D3d6d761Bd9060EcDe42D1C2D8c74"), "SushiSwap"],
]);

export const DEFAULT_GAS_PRICE = toWei("0.5", "gwei");

export const sushiLP = getAddress("0x02F726B5E819eCF33aA93be5274c94a22Df3619f")

export const priceScale = toBN(2).pow(toBN(112))
export const scale = toBN(10).pow(toBN(18))
