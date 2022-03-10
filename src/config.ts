import { ChainId, Network, NetworkNames } from "@celo-tools/use-contractkit";
import { toWei, toBN } from "web3-utils";
import { Token } from "src/utils/token";
import { getAddress } from "ethers/lib/utils";


export const Bank = {
  [ChainId.Mainnet]: getAddress("0x827cCeA3D460D458393EEAfE831698d83FE47BA7"),
  [ChainId.Alfajores]: getAddress("0x000531a6B61550cfADb637a625A00236fcDD1bDB"),
  [ChainId.Baklava]: getAddress("0x000531a6B61550cfADb637a625A00236fcDD1bDB"),
};

// export const Alfajores: Network = {
//   graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
//   name: NetworkNames.Alfajores,
//   rpcUrl: "https://alfajores-forno.celo-testnet.org",
//   chainId: ChainId.Alfajores,
//   explorer: "https://alfajores-blockscout.celo-testnet.org/",
// }

export const Mainnet: Network = {
  graphQl: "https://explorer.celo.org/graphiql",
  name: NetworkNames.Mainnet,
  rpcUrl: "https://forno.celo.org",
  chainId: ChainId.Mainnet,
  explorer: "https://explorer.celo.org/",
}

export const lpToken = {
  address: "",
  name: "Sushiswap LP",
  symbol: "SLP",
  decimals: 18,
  chainId: ChainId.Mainnet,
  logoURI: "lp"
};

export const COLLATERAL_TOKENS = [
  new Token({
    address: getAddress("0x471ece3750da237f93b8e339c536989b8978a438"),
    name: "Celo",
    symbol: "CELO",
    decimals: 18,
    chainId: ChainId.Mainnet,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
  }),
  new Token({
    address: getAddress("0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC"),
    name: "Ubeswap",
    symbol: "UBE",
    decimals: 18,
    chainId: ChainId.Mainnet,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_UBE.png"
  }),
  new Token({
    address: getAddress("0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B"),
    name: "Mobius",
    symbol: "MOBI",
    decimals: 18,
    chainId: ChainId.Mainnet,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_MOBI.png"
  }),
  new Token({
    address: getAddress("0x765DE816845861e75A25fCA122bb6898B8B1282a"),
    name: "Celo Dollar",
    symbol: "cUSD",
    decimals: 18,
    chainId: ChainId.Mainnet,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png",
  }),
  new Token({
    address: getAddress("0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73"),
    name: "Celo Euro",
    symbol: "cEUR",
    decimals: 18,
    chainId: ChainId.Mainnet,
    logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cEUR.png",
  }),
];

export enum FarmType {
  SushiSwap = "Sushiswap",
  Ubeswap = "Ubeswap"
}

export interface Farm {
  name: string
  spell: string
  wrapper: string
  lp: string
  apy: string
  tokens: Token[]
  type: FarmType
  id?: string
  rewards: Token[]
}

export const FARMS : Farm[] = [
  {
    name: "cUSD-cEUR v1",
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
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cEUR.png",
      }),
      new Token({
        address: getAddress("0x765DE816845861e75A25fCA122bb6898B8B1282a"),
        name: "Celo Dollar",
        symbol: "cUSD",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png",
      }),
    ],
    type: FarmType.SushiSwap,
    id: '3',
    rewards: [
      new Token({
        address: getAddress("0xD15EC721C2A896512Ad29C671997DD68f9593226"),
        name: "Sushi",
        symbol: "SUSHI",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_SUSHI.png",
      }),
      new Token({
        address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
        }),
    ],
  },
  {
    name: "cUSD-cEUR v2",
    wrapper: getAddress("0x1C4da0695aE25847260628d7eA92c5d336Fe1998"),
    spell: getAddress("0x70CFe574715213782B3BcCfFcbb8d4a298388de7"),
    lp: getAddress("0x0b655E7D966CB27998af94AA5719ab7BFe07D3b3"),
    apy: "51", 
    tokens: [
      new Token({
        address: getAddress("0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73"),
        name: "Celo Euro",
        symbol: "cEUR",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cEUR.png",
      }),
      new Token({
        address: getAddress("0x765DE816845861e75A25fCA122bb6898B8B1282a"),
        name: "Celo Dollar",
        symbol: "cUSD",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png",
      }),
    ],
    type: FarmType.SushiSwap,
    id: '3',
    rewards: [
      new Token({
        address: getAddress("0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1"),
        name: "Sushi",
        symbol: "SUSHI",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_SUSHI.png",
      }),
      new Token({
        address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
        }),
    ],
  },
  {
    name: "CELO-MOBI",
    wrapper: getAddress("0x1C4da0695aE25847260628d7eA92c5d336Fe1998"),
    spell: getAddress("0x70CFe574715213782B3BcCfFcbb8d4a298388de7"),
    lp: getAddress("0x8ecded81a2abf3b7e724978060739edbeb01b24f"),
    apy: "51", 
    tokens: [
      new Token({
        address: getAddress("0x471ece3750da237f93b8e339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
      }),
      new Token({
        address: getAddress("0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B"),
        name: "Mobius",
        symbol: "MOBI",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_MOBI.png"
      }),
    ],
    type: FarmType.SushiSwap,
    id: '8',
    rewards: [
      new Token({
        address: getAddress("0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1"),
        name: "Sushi",
        symbol: "SUSHI",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_SUSHI.png",
      }),
      new Token({
        address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
        }),
    ],
  },
  {
    name: "CELO-UBE",
    wrapper: getAddress("0x1B9dF6fd569778f48E7db3eB000C93a80920EA23"),
    spell: getAddress("0x7B775b2AF169D1249db545Cd89754D3C70FAd069"),
    lp: getAddress("0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c"),
    tokens: [
      new Token({
        address: getAddress("0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC"),
        name: "Ubeswap",
        symbol: "UBE",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_UBE.png"
      }),
      new Token({
        address: getAddress("0x471ece3750da237f93b8e339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
      }),
    ],
    apy: "0",
    type: FarmType.Ubeswap,
    rewards: [
      new Token({
        address: getAddress("0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC"),
        name: "Ubeswap",
        symbol: "UBE",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_UBE.png"
      }),
      new Token({
        address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
        }),
    ],
  },
  {
    name: "CELO-MOBI",
    wrapper: getAddress("0xFab4224Ce8E71e2f8F95f63a088d828d5B570e12"),
    spell: getAddress("0x7B775b2AF169D1249db545Cd89754D3C70FAd069"),
    lp: getAddress("0x0b81cf47c8f97275d14c006e537d5101b6c87300"),
    tokens: [
      new Token({
        address: getAddress("0x471ece3750da237f93b8e339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
      }),
      new Token({
        address: getAddress("0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B"),
        name: "Mobius",
        symbol: "MOBI",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_MOBI.png"
      }),
    ],
    apy: "0",
    type: FarmType.Ubeswap,
    rewards: [
      new Token({
        address: getAddress("0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC"),
        name: "Ubeswap",
        symbol: "UBE",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_UBE.png"
      }),
      new Token({
        address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png",
      }),
      new Token({
        address: getAddress("0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B"),
        name: "Mobius",
        symbol: "MOBI",
        decimals: 18,
        chainId: ChainId.Mainnet,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_MOBI.png"
      }),
    ],
  },
];

export const DECIMAL_PRECISION = 2; // Number of decimals to show

//collateral type to safebox
export const safeBoxMap = new Map<string, string>([
  [getAddress("0x765DE816845861e75A25fCA122bb6898B8B1282a"), getAddress("0xb104422F2Fbc050055671265b95E08aD6057B0B3")], // cusd
  [getAddress("0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73"), getAddress("0x998BA352aD84CC0CD7E71B1Cc11Fd192D624254C")], // ceur
  [getAddress("0x471ece3750da237f93b8e339c536989b8978a438"), getAddress("0x7a6d627b0464dd33C988AE3a99aa6372191E7EB2")], // celo
  [getAddress("0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC"), getAddress("0x37a022Bd03A8b0F66ea68996410E0F70EC395C5e")], // ube
  [getAddress("0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B"), getAddress("0xEfbD2788A0dea9EB959a61CE0098Be6499fB0d78")], // mobi
]);

export const DEFAULT_GAS_PRICE = toWei("0.5", "gwei");
export const DEFAULT_GAS_LIMIT = "10000000";

export const sushiLPadd = getAddress("0x7072a1c2c9A0cb20ae0B3C0C9023a42a49542e8B")

export const priceScale = toBN(2).pow(toBN(112))
export const scale = toBN(10).pow(toBN(18))
