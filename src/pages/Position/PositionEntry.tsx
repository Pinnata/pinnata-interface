import { useContractKit } from "@celo-tools/use-contractkit";
import { AbiItem, toBN, fromWei } from "web3-utils";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import PROXYORACLE_ABI from "src/abis/dahlia_contracts/ProxyOracle.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { ProxyOracle } from "src/generated/ProxyOracle";
import { Bank, DEFAULT_GAS_PRICE, Farm, FarmType } from "src/config";
import React from "react";
import { getAddress } from "ethers/lib/utils";
import { FarmInfo } from "src/components/FarmInfo";
import SUSHI_SPELL from "src/abis/dahlia_contracts/SushiswapSpellV1.json";
import { SushiswapSpellV1 } from "src/generated/SushiswapSpellV1";
import UBE_SPELL from "src/abis/dahlia_contracts/UbeswapMSRSpellV1.json";
import { UbeswapMSRSpellV1 } from "src/generated/UbeswapMSRSpellV1";
import { MaxUint256 } from "@ethersproject/constants";
import { toastTx } from "src/utils/toastTx";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { CoreOracle } from "src/generated/CoreOracle";
import COREORACLE_ABI from "src/abis/dahlia_contracts/CoreOracle.json";
import { useAsyncState } from "src/hooks/useAsyncState";
import { humanFriendlyNumber } from "src/utils/number";
import { CErc20Immutable } from "src/generated/CErc20Immutable";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";
import { useAPR } from "../../hooks/useAPR"

interface Props {
  pool: Farm;
  positionId: number;
  collateralSize: string;
  collId: string;
  collToken: string;
}

export const PositionEntry: React.FC<Props> = (props: Props) => {
  const { kit, getConnectedKit, network } = useContractKit();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const history = useHistory();
  const scale = toBN(2).pow(toBN(112));

  const [apr] = useAPR(
    props.pool.lp,
    props.pool.wrapper,
    props.pool.type,
    props.pool.id
  );

  const bank = React.useMemo(
    () =>
      new kit.web3.eth.Contract(
        BANK_ABI.abi as AbiItem[],
        getAddress(Bank[network.chainId])
      ) as unknown as HomoraBank,
    [kit]
  );

  const call = React.useCallback(async () => {
    try {
      const oracle = await bank.methods.oracle().call();
      const proxyOracle = new kit.web3.eth.Contract(
        PROXYORACLE_ABI.abi as AbiItem[],
        oracle
      ) as unknown as ProxyOracle;
      const source = await proxyOracle.methods.source().call();
      const coreOracle = new kit.web3.eth.Contract(
        COREORACLE_ABI.abi as AbiItem[],
        source
      ) as unknown as CoreOracle;
      const price = await coreOracle.methods.getCELOPx(props.pool.lp).call();
      const totalValue =
        Number(fromWei(props.collateralSize)) *
        (Number(fromWei(price)) / Number(fromWei(scale)));
      const ret = await bank.methods.getPositionDebts(props.positionId!).call();
      let debtValue: number = 0;
      let debtInterest: number = 0;
      for (let i = 0; i < ret.tokens.length; i += 1) {
        const token = ret.tokens[i]!;
        const price = await coreOracle.methods.getCELOPx(token).call();
        debtValue +=
          Number(fromWei(ret.debts[i]!)) *
          (Number(fromWei(price)) / Number(fromWei(scale)));
        const bankInfo = await bank.methods.getBankInfo(token).call();
        const cToken = new kit.web3.eth.Contract(
          CERC20_ABI as AbiItem[],
          bankInfo.cToken
        ) as unknown as CErc20Immutable;
        const blocksPerYear = toBN(6311520);
        const borrowRate = toBN(
          await cToken.methods.borrowRatePerBlock().call()
        ).mul(blocksPerYear);
        debtInterest += debtValue * Number(fromWei(borrowRate));
      }
      const numer = await bank.methods
        .getBorrowCELOValue(props.positionId)
        .call();
      const denom = await bank.methods
        .getCollateralCELOValue(props.positionId)
        .call();
      const debtRatio = Number(fromWei(numer)) / Number(fromWei(denom));
      return {
        debtValue,
        totalValue,
        debtRatio,
        debtInterest,
      };
    } catch (error) {
      console.log(error);
    }
  }, [
    bank.methods,
    kit.web3.eth.Contract,
    props.collateralSize,
    props.pool.lp,
    props.positionId,
    scale,
  ]);

  const [info] = useAsyncState(null, call);

  const urlext =
    props.positionId +
    "/" +
    props.collId +
    "/" +
    props.collateralSize +
    "/" +
    props.pool.name +
    "/" +
    props.pool.wrapper +
    "/" +
    props.pool.spell +
    "/" +
    props.pool.lp +
    "/" +
    apr +
    "/" +
    props.pool.tokens.map((tok) => tok.address) +
    "/" +
    props.pool.type;

  const apy = info && apr
    ? (info.totalValue * (apr / 100) - info.debtInterest) /
      (info.totalValue - info.debtValue)
    : 0;

  return (
    <div className="w-full md:w-1/3">
      <div className="bg-white my-6 mx-4 rounded-lg shadow-2xl p-2">
        <div className="border-b-2 p-2">
          <FarmInfo props={props.pool} />
        </div>

        <div className="md:flex p-4 border-b-2 justify-center">
          <div className="m-4 text-center">
            <p className="text-gray-600 uppercase tracking-widest font-bold">
              Borrow Value
            </p>
            <p className="text-gray-900 font-bold text-2xl tracking-tight">
              {" "}
              {info ? humanFriendlyNumber(info.debtValue) : "--"} Celo
            </p>
          </div>
          <div className="m-4 text-center">
            <p className="text-gray-600 uppercase tracking-widest font-bold">
              Total Value
            </p>
            <p className="text-gray-900 font-bold text-2xl tracking-tight">
              {" "}
              {info ? humanFriendlyNumber(info.totalValue) : "--"} Celo
            </p>
          </div>
        </div>
        <div className="md:flex p-4 border-b-2 justify-center">
          <div className="m-4 text-center">
            <p className="text-gray-600 uppercase tracking-widest font-bold">
              Debt Ratio
            </p>
            <p className="text-gray-900 font-bold text-2xl tracking-tight">
              {" "}
              {info
                ? humanFriendlyNumber(info.debtRatio * 100).concat("%")
                : "--"}
            </p>
          </div>
          <div className="m-4 text-center">
            <p className="text-gray-600 uppercase tracking-widest font-bold">
              Position APR
            </p>
            <p className="text-gray-900 font-bold text-2xl tracking-tight">
              {" "}
              {info ? humanFriendlyNumber(apy * 100).concat("%") : "--"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              history.push(`positions/add/${urlext}`);
            }}
            className="ml-4 bg-gradient-to-br from-blue-800 to-green-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded w-32 mt-4"
          >
            Add &#x203A;
          </button>

          <button
            onClick={() => {
              history.push(`positions/remove/${urlext}`);
            }}
            className="ml-4 bg-gradient-to-br from-blue-800 to-green-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded w-32 my-2"
          >
            Remove &#x203A;
          </button>

          <button
            onClick={async () => {
              const kit = await getConnectedKit();
              try {
                setConfirmLoading(true);
                const bank = new kit.web3.eth.Contract(
                  BANK_ABI.abi as AbiItem[],
                  getAddress(Bank[network.chainId])
                ) as unknown as HomoraBank;
                let bytes: string
                if (props.pool.type === FarmType.SushiSwap) {
                  const spell = new kit.web3.eth.Contract(
                    SUSHI_SPELL.abi as AbiItem[],
                    getAddress(props.pool.spell)
                  ) as unknown as SushiswapSpellV1;
                  bytes = spell.methods
                  .removeLiquidityWMiniChef(
                    props.pool.tokens[0]!.address,
                    props.pool.tokens[1]!.address,
                    [
                      MaxUint256.toString(),
                      0,
                      MaxUint256.toString(),
                      MaxUint256.toString(),
                      0,
                      0,
                      0,
                    ]
                  )
                  .encodeABI();
                } else {
                  const spell = new kit.web3.eth.Contract(
                    UBE_SPELL.abi as AbiItem[],
                    getAddress(props.pool.spell)
                  ) as unknown as UbeswapMSRSpellV1;
                  bytes = spell.methods
                    .removeLiquidityWStakingRewards(
                      props.pool.tokens[0]!.address,
                    props.pool.tokens[1]!.address,
                    [
                      MaxUint256.toString(),
                      0,
                      MaxUint256.toString(),
                      MaxUint256.toString(),
                      0,
                      0,
                      0,
                    ],
                      props.pool.wrapper,
                    )
                    .encodeABI();
                }
                const tx = await bank.methods
                  .execute(props.positionId, props.pool.spell, bytes)
                  .send({
                    from: kit.defaultAccount,
                    gasPrice: DEFAULT_GAS_PRICE,
                  });
                toastTx(tx.transactionHash);
              } catch (e: any) {
                toast(e.message);
              } finally {
                setConfirmLoading(false);
              }
            }}
            className="ml-4 bg-gradient-to-br from-blue-800 to-green-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded w-32"
          >
            Close &#x203A;
          </button>

          <button
            onClick={async () => {
              const kit = await getConnectedKit();
              try {
                setConfirmLoading(true);
              const bank = new kit.web3.eth.Contract(
                BANK_ABI.abi as AbiItem[],
                getAddress(Bank[network.chainId])
              ) as unknown as HomoraBank;
              let bytes: string
              if (props.pool.type === FarmType.SushiSwap) {
                const spell = new kit.web3.eth.Contract(
                  SUSHI_SPELL.abi as AbiItem[],
                  getAddress(props.pool.spell)
                ) as unknown as SushiswapSpellV1;
                bytes = spell.methods
                .harvestWMiniChef()
                .encodeABI();
              } else {
                const spell = new kit.web3.eth.Contract(
                  UBE_SPELL.abi as AbiItem[],
                  getAddress(props.pool.spell)
                ) as unknown as UbeswapMSRSpellV1;
                bytes = spell.methods
                  .harvestWStakingRewards(props.pool.wrapper,)
                  .encodeABI();
              }
                const tx = await bank.methods
                  .execute(props.positionId, props.pool.spell, bytes)
                  .send({
                    from: kit.defaultAccount,
                    gasPrice: DEFAULT_GAS_PRICE,
                  });
                toastTx(tx.transactionHash);
              } catch (e: any) {
                toast(e.message);
              } finally {
                setConfirmLoading(false);
              }
            }}
            className="ml-4 bg-gradient-to-br from-blue-800 to-green-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded w-32 my-2"
          >
            Harvest &#x203A;
          </button>
        </div>
      </div>
    </div>
  );
};
