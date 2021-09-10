import { ChainId } from "@celo-tools/use-contractkit";
import { toWei } from "web3-utils";
import { Token } from "src/utils/token";
import { getAddress } from "ethers/lib/utils";

export const Bank = {
  [ChainId.Mainnet]: getAddress("0x0C30Cf952dF41F1B287D3a6d46840F0874B891cE"),
  [ChainId.Alfajores]: getAddress("0x0C30Cf952dF41F1B287D3a6d46840F0874B891cE"),
  [ChainId.Baklava]: getAddress("0x0C30Cf952dF41F1B287D3a6d46840F0874B891cE"),
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
    wrapper: getAddress("0x5eCd97bF7fd1cc7793632CDb66E51256e56e0150"),
    spell: getAddress("0xbfD26c85A3Da32C095dafccB418F0309f7e1EB81"),
    lp: getAddress("0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c"),
    apy: "156", 
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
    wrapper: getAddress("0x81651b4F9F7c46C652D948405909Eab10ec8B56D"),
    spell: getAddress("0xbfD26c85A3Da32C095dafccB418F0309f7e1EB81"),
    lp: getAddress("0xf5b1bc6c9c180b64f5711567b1d6a51a350f8422"),
    apy: "113",
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
    wrapper: getAddress("0xcf0Ab8a4afD82B244f5548B1d1Ad6aee06BdD76e"),
    spell: getAddress("0xbfD26c85A3Da32C095dafccB418F0309f7e1EB81"),
    lp: getAddress("0x427c95a1379182121791cc415125acd73ea02e97"),
    apy: "160", 
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
    wrapper: getAddress("0x7AD3239b22E8F4E850c30B1ac947Ddb3C66A66a8"),
    spell: getAddress("0xbfD26c85A3Da32C095dafccB418F0309f7e1EB81"),
    lp: getAddress("0x27616d3dba43f55279726c422daf644bc60128a8"),
    apy: "19",
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
    wrapper: getAddress("0xeea8c936B789d0ddC0bFf2f7F4094270d8dc6Fe1"),
    spell: getAddress("0xbfD26c85A3Da32C095dafccB418F0309f7e1EB81"),
    lp: getAddress("0xa813bb1df70128d629f1a41830578fa616daeeec"),
    apy: "29",
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
  [getAddress("0x471ece3750da237f93b8e339c536989b8978a438"), getAddress("0xC1E55C097B8220742752d3d26cF4F1fE749A4cFf")], // celo
  [getAddress("0x00be915b9dcf56a3cbe739d9b9c202ca692409ec"), getAddress("0xC80258F7bC3d9310E1850de350934D79BDB1f36f")], // ube
  [getAddress("0x64defa3544c695db8c535d289d843a189aa26b98"), getAddress("0x679eEf7737895Ed6E6Ac35376505842c4cB53dA9")], // mcusd
  [getAddress("0xa8d0e6799ff3fd19c6459bf02689ae09c4d78ba7"), getAddress("0x2DbfCEf666d04c69B89E4DF68919073402a33Fc6")], // mceur
  [getAddress("0x2879bfd5e7c4ef331384e908aaa3bd3014b703fa"), getAddress("0x0585D6073d0C7E56df03779ac864156ed9d6e8e0")], // scelo
]);

export const spellMap = new Map<string, string>([
  [getAddress("0xbfD26c85A3Da32C095dafccB418F0309f7e1EB81"), "Ubeswap"]
]);

export const FEE_MODULE_V1 = "0x07DDCB69Bc2637A6c03d5523696E21B688b42d65";

export const DEFAULT_GAS_PRICE = toWei("0.5", "gwei");
