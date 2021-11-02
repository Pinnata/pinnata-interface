import { ChainId, Network, NetworkNames } from "@celo-tools/use-contractkit";
import { toWei } from "web3-utils";
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
  name: "Ubeswap LP",
  symbol: "ULP",
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
    rewards: [
      new Token({
        address: getAddress("0x32FEC6761d6EC4a2DF5DCe36bf5854Ba0DA6D09b"),
        name: "Mock1",
        symbol: "MOCK1",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cSHIBA.png",
      })
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
    rewards: [
      new Token({
        address: getAddress("0x32FEC6761d6EC4a2DF5DCe36bf5854Ba0DA6D09b"),
        name: "Mock1",
        symbol: "MOCK1",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cSHIBA.png",
      })
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
    rewards: [
      new Token({
        address: getAddress("0x32FEC6761d6EC4a2DF5DCe36bf5854Ba0DA6D09b"),
        name: "Mock1",
        symbol: "MOCK1",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cSHIBA.png",
      })
    ],
  },{
    name: "CELO-cUSD",
    wrapper: getAddress("0x93aeBCe788597383643C122f924108252ff48015"),
    spell: getAddress("0xc862A41A53BdCA9E9aA169a451AB1a64b0668589"),
    lp: getAddress("0x595BBFCe08e71481CFDC2Fe1107cA4C0D1C66b00"),
    apy: "186", 
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
    rewards: [
      new Token({
        address: getAddress("0x32FEC6761d6EC4a2DF5DCe36bf5854Ba0DA6D09b"),
        name: "Mock1",
        symbol: "MOCK1",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cSHIBA.png",
      }),
      new Token({
        address: getAddress("0x2F395cc7662b693018b1E8BaBFd20FF5e9507F31"),
        name: "Mock2",
        symbol: "MOCK2",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cDOGE.png",
      })
    ],
  },
  {
    name: "CELO-cEUR",
    wrapper: getAddress("0x7b1251fc1Fa4b76079Ce8cA0296Ce9515b6adCF5"),
    spell: getAddress("0xc862A41A53BdCA9E9aA169a451AB1a64b0668589"),
    lp: getAddress("0xB3C20f3011ac4f713b3E6252E9B6A2060EB912a1"),
    apy: "140",
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
    rewards: [
      new Token({
        address: getAddress("0x32FEC6761d6EC4a2DF5DCe36bf5854Ba0DA6D09b"),
        name: "Mock1",
        symbol: "MOCK1",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cSHIBA.png",
      }),
      new Token({
        address: getAddress("0x2F395cc7662b693018b1E8BaBFd20FF5e9507F31"),
        name: "Mock2",
        symbol: "MOCK2",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cDOGE.png",
      })
    ],
  },
  {
    name: "cUSD-cEUR",
    wrapper: getAddress("0x885DD632787DAff25C4472e4F0B08b8c002c27E2"),
    spell: getAddress("0xc862A41A53BdCA9E9aA169a451AB1a64b0668589"),
    lp: getAddress("0x98c856FB897dDF4A6243f6B5F343e1F71e253874"),
    apy: "210", 
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
    rewards: [
      new Token({
        address: getAddress("0x32FEC6761d6EC4a2DF5DCe36bf5854Ba0DA6D09b"),
        name: "Mock1",
        symbol: "MOCK1",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cSHIBA.png",
      }),
      new Token({
        address: getAddress("0x2F395cc7662b693018b1E8BaBFd20FF5e9507F31"),
        name: "Mock2",
        symbol: "MOCK2",
        decimals: 18,
        chainId: ChainId.Alfajores,
        logoURI: "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cDOGE.png",
      })
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
  [getAddress("0x6B9cFFD73aD5d95921566D672F9B4D0Ca061D64e"), "U-Test"],
  [getAddress("0xc862A41A53BdCA9E9aA169a451AB1a64b0668589"), "U-Test"],
]);

export const DEFAULT_GAS_PRICE = toWei("0.5", "gwei");
