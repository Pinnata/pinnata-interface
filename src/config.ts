import { ChainId } from "@celo-tools/use-contractkit";
import { toWei } from "web3-utils";
import { Token } from "src/utils/token";
import { getAddress } from "ethers/lib/utils";

export const Bank = {
  [ChainId.Mainnet]: getAddress("0xb0b2d27b5384B4a53B6960709785Ad32713e4645"),
  [ChainId.Alfajores]: getAddress("0xb0b2d27b5384B4a53B6960709785Ad32713e4645"),
  [ChainId.Baklava]: getAddress("0xb0b2d27b5384B4a53B6960709785Ad32713e4645"),
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
    wrapper: getAddress("0xfAC9861420e79aDC03c8114484c863ae9C516F5D"),
    spell: getAddress("0x7c18e9640AC6Fbd4f6BAD045c5D1cdF1C26cFBf7"),
    lp: getAddress("0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c"),
    apy: "156", 
    tokens: [
      new Token({
        address: getAddress("0x00be915b9dcf56a3cbe739d9b9c202ca692409ec"),
        name: "Ubeswap",
        symbol: "UBE",
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
  {
    name: "CELO-mcUSD",
    wrapper: getAddress("0xa2cb40E3D269D48937Ca53BEEaF81F7Ea78AB16C"),
    spell: getAddress("0x7c18e9640AC6Fbd4f6BAD045c5D1cdF1C26cFBf7"),
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
    wrapper: getAddress("0xa8F850e6F794F994785154aC3335256E8165507a"),
    spell: getAddress("0x7c18e9640AC6Fbd4f6BAD045c5D1cdF1C26cFBf7"),
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
    wrapper: getAddress("0x4D9871CD7A4b50407000f412C1aF226a816978B9"),
    spell: getAddress("0x7c18e9640AC6Fbd4f6BAD045c5D1cdF1C26cFBf7"),
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
    wrapper: getAddress("0x81341B3bd0B080624Dd6b89930787e1cb9b94198"),
    spell: getAddress("0x7c18e9640AC6Fbd4f6BAD045c5D1cdF1C26cFBf7"),
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
  [getAddress("0x471ece3750da237f93b8e339c536989b8978a438"), getAddress("0x7AF48dEB6d3FB4D71895C1E74E2136C1C7C3C0e1")], // celo
  [getAddress("0x00be915b9dcf56a3cbe739d9b9c202ca692409ec"), getAddress("0x4aA2c7323AC3A04eF686052B2B41A9DBc403e831")], // ube
  [getAddress("0x64defa3544c695db8c535d289d843a189aa26b98"), getAddress("0x5821bBCfFEd8F24b376331EACd537539F2724134")], // mcusd
  [getAddress("0xa8d0e6799ff3fd19c6459bf02689ae09c4d78ba7"), getAddress("0x9a1Ac0eC0F283bCEA5C16a70a09bac4488d7EcB1")], // mceur
  [getAddress("0x2879bfd5e7c4ef331384e908aaa3bd3014b703fa"), getAddress("0xdA3aFCa2f1e2d9A7A24cCC907239E7E29E57A07B")], // scelo
]);

export const spellMap = new Map<string, string>([
  [getAddress("0x7c18e9640AC6Fbd4f6BAD045c5D1cdF1C26cFBf7"), "Ubeswap"]
]);

export const DEFAULT_GAS_PRICE = toWei("0.5", "gwei");
