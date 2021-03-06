import { useContractKit } from "@celo-tools/use-contractkit";
import { useHistory } from "react-router-dom";
import { AbiItem, toBN, fromWei } from "web3-utils";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";
import PROXYORACLE_ABI from "src/abis/dahlia_contracts/ProxyOracle.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { ProxyOracle } from "src/generated/ProxyOracle";
import { CErc20Immutable } from "src/generated/CErc20Immutable";
import { Bank, Farm } from "src/config";
import React from "react";
import { useAsyncState } from "src/hooks/useAsyncState";
import { getAddress } from "ethers/lib/utils";
import { humanFriendlyWei } from "src/utils/eth";
import { FarmInfo } from "src/components/FarmInfo";
import { RewardsTokenInfo } from "src/components/RewardsTokenInfo";
import { TokenBorrowInfo } from "src/components/TokenBorrowInfo";
import { humanFriendlyNumber } from "src/utils/number";
import { useAPR } from "src/hooks/useAPR";

export const FarmEntry: React.FC<Farm> = (props: Farm) => {
  const { kit, network } = useContractKit();
  const history = useHistory();
  const [apr] = useAPR(
    props.lp,
    props.wrapper,
    props.type,
    props.id,
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
      const borrows = [];
      const factors = [];
      const oracle = await bank.methods.oracle().call();
      const proxyOracle = new kit.web3.eth.Contract(
        PROXYORACLE_ABI.abi as AbiItem[],
        oracle
      ) as unknown as ProxyOracle;
      for (let i: number = 0; i < props.tokens.length; i += 1) {
        const bankInfo = await bank.methods
          .getBankInfo(props.tokens[i]!.address)
          .call();
        const factor = await proxyOracle.methods
          .tokenFactors(props.tokens[i]!.address)
          .call();
        factors.push(factor);
        const cToken = new kit.web3.eth.Contract(
          CERC20_ABI as AbiItem[],
          bankInfo.cToken
        ) as unknown as CErc20Immutable;
        const blocksPerYear = toBN(6311520);
        const borrowRate = toBN(
          await cToken.methods.borrowRatePerBlock().call()
        ).mul(blocksPerYear);
        borrows.push(borrowRate);
      }
      const lpFactor = await proxyOracle.methods.tokenFactors(props.lp).call();
      return {
        borrowRate: borrows,
        tokenFactor: factors,
        lpFactor,
      };
    } catch (error) {
      console.log(error);
    }
  }, [bank.methods, kit.web3.eth.Contract, props.lp, props.tokens]);

  const [info] = useAsyncState(null, call);

  const lever = (factor: {
    borrowFactor: string;
    collateralFactor: string;
  }) => {
    return (
      1 +
      Number(factor.collateralFactor) /
        (Number(factor.borrowFactor) - Number(factor.collateralFactor))
    );
  };

  const maxLever = info
    ? Math.max(
        ...info?.tokenFactor.map((x) =>
          lever({
            borrowFactor: x.borrowFactor,
            collateralFactor: info.lpFactor.collateralFactor,
          })
        )!
      )
    : 0;

  const maxApy = info
    ? Math.max(
        ...info?.tokenFactor.map((x, i) => {
          const maxLever = lever({
            borrowFactor: x.borrowFactor,
            collateralFactor: info.lpFactor.collateralFactor,
          });
          const borrow = fromWei(info.borrowRate[i]!);
          console.log(borrow, maxLever, apr);

          // borrow: 0.1590463012971312 
          // maxLever: 3.4375 
          // APR: 14.642162170721809

          return (
            maxLever * ((apr ?? 0) / 100) - (maxLever - 1) * Number(borrow.toString())

          );
        })
      )
    : 0;

  const urlext =
    props.name +
    "/" +
    props.wrapper +
    "/" +
    props.spell +
    "/" +
    props.lp +
    "/" +
    apr +
    "/" +
    props.tokens.map((tok) => tok.address) +
    "/" +
    props.type +
    "/" +
    props.id ?? '';

  return (
    <div className="w-full md:w-1/3">
      <div className="bg-white my-6 mx-4 rounded-3xl shadow-2xl">
        <div className="border-b-2 p-2">
          <FarmInfo props={props} />
        </div>

        <div className="md:flex p-4 border-b-2 justify-center">
          <div className="m-4 text-center">
            <p className="text-gray-600 uppercase tracking-widest font-bold">
              Max APR
            </p>
            <p className="text-gray-900 font-bold text-2xl">
              {" "}
              {info ? humanFriendlyNumber(maxApy * 100) : "--"}%
            </p>
          </div>
          <div className="m-4 text-center">
            <p className="text-gray-600 uppercase tracking-widest font-bold">
              Pool APR
            </p>
            <p className="text-gray-900 font-bold text-2xl"> {apr !== null ? humanFriendlyNumber(apr) : '--'}%</p>
          </div>
        </div>

        <div className="md:flex p-4 border-b-2 justify-center">
          <div className="m-4 text-center">
            <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">
              Borrow APR
            </p>
            <p className="text-gray-900 font-bold text-2xl">
              {props.tokens.map((tok, index) => (
                <TokenBorrowInfo
                  key={tok.address}
                  token={tok}
                  apy={
                    info && info.borrowRate.length > 0
                      ? humanFriendlyWei(info.borrowRate[index]!.mul(toBN(100)))
                      : "--"
                  }
                />
              ))}
            </p>
          </div>
          <div className="m-4 text-center">
            <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">
              Max Leverage
            </p>
            <p className="text-gray-900 font-bold text-2xl">
              {" "}
              {String(maxLever).concat("x")}
            </p>
          </div>
        </div>

        <div className="m-4 text-center">
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">
            Rewards
          </p>
          <p className="text-gray-900 font-bold text-2xl">
            {props.rewards.map((tok) => (
              <RewardsTokenInfo token={tok} />
            ))}
          </p>
        </div>

        <div className="flex justify-center py-6">
          <button
            onClick={() => history.push(`farm/new/${urlext}`)}
            // className="bg-gradient-to-br from-blue-400 to-green-500 hover:opacity-75 text-white text-xl font-bold py-2 px-4 rounded w-32"
            className="ml-4 bg-gradient-to-br from-blue-700 to-green-300 hover:opacity-75 text-white text-xl font-bold py-2 px-4 rounded-3xl w-32"
          >
            Farm &#x203A;
          </button>
        </div>
      </div>
    </div>
  );
};
