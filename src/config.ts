import { ChainId, Network, NetworkNames } from "@celo-tools/use-contractkit";
import { toWei, toBN } from "web3-utils";
import { Token } from "src/utils/token";
import { getAddress } from "ethers/lib/utils";


export const Bank = {
  [ChainId.CeloMainnet]: getAddress("0xD598a21bA32B1B2c70950d38E4651528E47e0471"),
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
  new Token({
    address: getAddress("0x471ece3750da237f93b8e339c536989b8978a438"),
    name: "Celo",
    symbol: "CELO",
    decimals: 18,
    chainId: ChainId.CeloMainnet,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
  }),
  new Token({
    address: getAddress("0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC"),
    name: "Ubeswap",
    symbol: "UBE",
    decimals: 18,
    chainId: ChainId.CeloMainnet,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_UBE.png"
  }),
  new Token({
    address: getAddress("0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B"),
    name: "Mobius",
    symbol: "MOBI",
    decimals: 18,
    chainId: ChainId.CeloMainnet,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_MOBI.png"
  }),
];

export enum FarmType {
  SushiSwap = "Sushiswap",
  Ubeswap = "Ubeswap"
}

export const FARMS = [
  {
    name: "cUSD-cEUR",
    wrapper: getAddress("0x88EFB15fBeb0A542e9B05443e2578817Bb773E16"),
    spell: getAddress("0xCb5cF76c3D1A5a8A0D80312A76eF0b3C965b4Ad1"),
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
    type: FarmType.SushiSwap,
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
  [getAddress("0x765DE816845861e75A25fCA122bb6898B8B1282a"), getAddress("0x85271d63FaBBEbb6194c2A1FFC2F55047E4cb839")], // cusd
  [getAddress("0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73"), getAddress("0xfc6eE763CefaF7FFc25ceE9251d50FB8890992F9")], // ceur
  [getAddress("0x471ece3750da237f93b8e339c536989b8978a438"), getAddress("0x24B162B4Bb738b09757A099650c588daC28E9e2d")],
  [getAddress("0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC"), getAddress("0x97931360B98DD11fA0Bc8AD4FB8Ce44D856CA927")],
  [getAddress("0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B"), getAddress("0x39d90818304992270bd131471EF3ACd20a4aaE2A")],
]);

export const DEFAULT_GAS_PRICE = toWei("0.5", "gwei");

export const sushiLPadd = getAddress("0x02F726B5E819eCF33aA93be5274c94a22Df3619f")

export const priceScale = toBN(2).pow(toBN(112))
export const scale = toBN(10).pow(toBN(18))
