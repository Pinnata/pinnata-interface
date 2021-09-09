import { ChainId } from "@celo-tools/use-contractkit";
import { toWei } from "web3-utils";
import { Token } from "src/utils/token";
import { getAddress } from "ethers/lib/utils";

export const Bank = {
  [ChainId.Mainnet]: getAddress("0xe4146D276b1ccBc731Ca069Fff0d31C204B90414"),
  [ChainId.Alfajores]: getAddress("0xe4146D276b1ccBc731Ca069Fff0d31C204B90414"),
  [ChainId.Baklava]: getAddress("0xe4146D276b1ccBc731Ca069Fff0d31C204B90414"),
};

export const lpToken = {
  address: "",
  name: "Ubeswap LP",
  symbol: "ULP",
  decimals: 18,
  chainId: ChainId.Mainnet,
  logoURI: "public/favicon.ico"
};

export const COLLATERAL_TOKENS = [
  new Token({
    address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
    name: "Celo",
    symbol: "CELO",
    decimals: 18,
    chainId: ChainId.Mainnet,
  }),
  new Token({
    address: getAddress("0x00be915b9dcf56a3cbe739d9b9c202ca692409ec"),
    name: "Ubeswap",
    symbol: "UBE",
    decimals: 18,
    chainId: ChainId.Mainnet,
  }),
  new Token({
    address: getAddress("0x64defa3544c695db8c535d289d843a189aa26b98"),
    name: "Moola cUSD AToken",
    symbol: "mcUSD",
    decimals: 18,
    chainId: ChainId.Mainnet,
  }),
  new Token({
    address: getAddress("0xa8d0e6799ff3fd19c6459bf02689ae09c4d78ba7"),
    name: "Moola cEUR AToken",
    symbol: "mcEUR",
    decimals: 18,
    chainId: ChainId.Mainnet,
  }),
  new Token({
    address: getAddress("0x2879bfd5e7c4ef331384e908aaa3bd3014b703fa"),
    name: "Savings CELO",
    symbol: "sCELO",
    decimals: 18,
    chainId: ChainId.Mainnet,
  }),
];

export const FARMS = [
  {
    name: "UBE-CELO",
    wrapper: getAddress("0x0BD1796523F9D1E660a4b7a0C5FE37666955eB73"),
    spell: getAddress("0x504b991450bE254395eD9bD80dc1D978B8E8483a"),
    lp: getAddress("0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c"),
    tokens: [
      new Token({
        address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
      }),
      new Token({
        address: getAddress("0x00be915b9dcf56a3cbe739d9b9c202ca692409ec"),
        name: "Ubeswap",
        symbol: "UBE",
        decimals: 18,
        chainId: ChainId.Mainnet,
      }),
    ],
  },
  {
    name: "CELO-mcUSD",
    wrapper: getAddress("0x522Ab191Bd97AA5919cA816ab247c11497fb384A"),
    spell: getAddress("0x504b991450bE254395eD9bD80dc1D978B8E8483a"),
    lp: getAddress("0xf5b1bc6c9c180b64f5711567b1d6a51a350f8422"),
    tokens: [
      new Token({
        address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
      }),
      new Token({
        address: getAddress("0x64defa3544c695db8c535d289d843a189aa26b98"),
        name: "Moola cUSD AToken",
        symbol: "mcUSD",
        decimals: 18,
        chainId: ChainId.Mainnet,
      }),
    ],
  },
  {
    name: "CELO-mcEUR",
    wrapper: getAddress("0x32E2c5d549A76BEa1B64d74c98effb34CC9eEeA8"),
    spell: getAddress("0x504b991450bE254395eD9bD80dc1D978B8E8483a"),
    lp: getAddress("0x427c95a1379182121791cc415125acd73ea02e97"),
    tokens: [
      new Token({
        address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
      }),
      new Token({
        address: getAddress("0xa8d0e6799ff3fd19c6459bf02689ae09c4d78ba7"),
        name: "Moola cEUR AToken",
        symbol: "mcEUR",
        decimals: 18,
        chainId: ChainId.Mainnet,
      }),
    ],
  },
  {
    name: "mcUSD-mcEUR",
    wrapper: getAddress("0x0Ddd2B9CA16660f168DddDFb90d79dFd8118Fb79"),
    spell: getAddress("0x504b991450bE254395eD9bD80dc1D978B8E8483a"),
    lp: getAddress("0x27616d3dba43f55279726c422daf644bc60128a8"),
    tokens: [
      new Token({
        address: getAddress("0x64defa3544c695db8c535d289d843a189aa26b98"),
        name: "Moola cUSD AToken",
        symbol: "mcUSD",
        decimals: 18,
        chainId: ChainId.Mainnet,
      }),
      new Token({
        address: getAddress("0xa8d0e6799ff3fd19c6459bf02689ae09c4d78ba7"),
        name: "Moola cEUR AToken",
        symbol: "mcEUR",
        decimals: 18,
        chainId: ChainId.Mainnet,
      }),
    ],
  },
  {
    name: "CELO-sCELO",
    wrapper: getAddress("0x2879d42d2407286b74AFEB3eF90fb37d14DE5D6C"),
    spell: getAddress("0x504b991450bE254395eD9bD80dc1D978B8E8483a"),
    lp: getAddress("0xa813bb1df70128d629f1a41830578fa616daeeec"),
    tokens: [
      new Token({
        address: getAddress("0x2879BFD5e7c4EF331384E908aaA3Bd3014b703fA"),
        name: "Savings CELO",
        symbol: "sCELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
      }),
      new Token({
        address: getAddress("0x471EcE3750Da237f93B8E339c536989b8978a438"),
        name: "Celo",
        symbol: "CELO",
        decimals: 18,
        chainId: ChainId.Mainnet,
      }),
    ],
  },
];

export const DECIMAL_PRECISION = 3; // Number of decimals to show

//collateral type to safebox
export const safeBoxMap = new Map<string, string>([
  [getAddress("0x471ece3750da237f93b8e339c536989b8978a438"), getAddress("0xA1781B1f898ee670319d61253784A261ed2811E4")], // celo
  [getAddress("0x00be915b9dcf56a3cbe739d9b9c202ca692409ec"), getAddress("0x4D06E7C7298a5109A435AEdEb566B61B7823Fbfe")], // ube
  [getAddress("0x64defa3544c695db8c535d289d843a189aa26b98"), getAddress("0x6FcE361a921F8681D97CbDCEB85b967f3d8a6359")], // mcusd
  [getAddress("0xa8d0e6799ff3fd19c6459bf02689ae09c4d78ba7"), getAddress("0x15dDa1bB8f249F3ffA258dAbA89AE5A00BC705aa")], // mceur
  [getAddress("0x2879bfd5e7c4ef331384e908aaa3bd3014b703fa"), getAddress("0x163491Caff835045C6a449df32Fa214D575d3d3B")], // scelo
]);

export const spellMap = new Map<string, string>([
  [getAddress("0x504b991450bE254395eD9bD80dc1D978B8E8483a"), "Ubeswap"]
]);

export const FEE_MODULE_V1 = "0x07DDCB69Bc2637A6c03d5523696E21B688b42d65";

export const DEFAULT_GAS_PRICE = toWei("0.5", "gwei");
