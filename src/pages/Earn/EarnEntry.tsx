import { useContractKit } from "@celo-tools/use-contractkit";
import { Token } from "src/utils/token";
import { AbiItem, toBN, fromWei } from "web3-utils";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { CErc20Immutable } from "src/generated/CErc20Immutable";
import { Bank, safeBoxMap } from "src/config";
import React from "react";
import { useAsyncState } from "src/hooks/useAsyncState";
import { getAddress } from "ethers/lib/utils";
import { humanFriendlyWei } from "src/utils/eth";
import { useSafeBox } from "src/hooks/useSafeBox";
import { TokenInfo } from "src/components/TokenInfo";
import { useHistory } from "react-router-dom";
import { humanFriendlyNumber } from "src/utils/number";

interface Props {
  token: Token;
}

export const EarnEntry: React.FC<Props> = ({ token }: Props) => {
  const { kit, network } = useContractKit();
  const [safeBox] = useSafeBox(safeBoxMap.get(token.address)!);
  const history = useHistory();

  const bank = React.useMemo(
    () =>
      new kit.web3.eth.Contract(
        BANK_ABI.abi as AbiItem[],
        getAddress(Bank[network.chainId])
      ) as unknown as HomoraBank,
    [kit, network]
  );

  const call = React.useCallback(async () => {
    try {
      const bankInfo = await bank.methods.getBankInfo(token.address).call();
      const cToken = new kit.web3.eth.Contract(
        CERC20_ABI as AbiItem[],
        bankInfo.cToken
      ) as unknown as CErc20Immutable;
      const exchangeRate = toBN(await cToken.methods.exchangeRateStored().call());
      const totalSupply = toBN(await cToken.methods.totalSupply().call());
      const totalBorrows = toBN(await cToken.methods.totalBorrows().call());
      const blocksPerYear = toBN(6311520);
      const supplyRate = toBN(
        await cToken.methods.supplyRatePerBlock().call()
      ).mul(blocksPerYear);
      const utilRate = totalSupply.eq(toBN(0))
        ? toBN(0)
        : totalBorrows.mul(toBN(10).pow(toBN(18))).div(totalSupply);
        return {
          totalSupply: totalSupply,
          totalBorrows: totalBorrows,
          utilizationRate: utilRate,
          projectedAPY: supplyRate,
          exchangeRate,
        }
    } catch (error) {
      console.log(error);
    }
  }, [bank, token.address, kit]);

  const [info] = useAsyncState(null, call, token.address+'earn');

  const exchangeRate = info ? Number(fromWei(info.exchangeRate)) : 1;

  return (
    <div className="bg-white my-6 mx-4 rounded-3xl shadow-2xl">
      <div className="border-b-2 p-2">
        <TokenInfo token={token} />
      </div>

      <div className="p-4 border-b-2 text-center ">
        <p className="text-gray-600 uppercase tracking-widest font-bold">APR</p>
        <p className="text-gray-800 font-bold text-3xl">
          {" "}
          {info
            ? humanFriendlyWei(info.projectedAPY.mul ? info.projectedAPY.mul(toBN(100)) : (parseInt(info.projectedAPY as unknown as string, 16) * 100).toString()).concat("%")
            : "0.0%"}

        </p>
      </div>

      <div className="md:flex p-4 border-b-2 justify-center">
        <div className="m-4 text-center">
          <p className="text-gray-600 uppercase tracking-widest font-bold">
            Total Supply
          </p>
          <p className="text-gray-900 font-bold text-2xl">
            {" "}
            {info
              ? humanFriendlyWei(info.totalSupply)
                  .concat(" ")
                  .concat(token.symbol)
              : "000"}

          </p>
        </div>
        <div className="m-4 text-center">
          <p className="text-gray-600 uppercase tracking-widest font-bold">
            Total Borrows
          </p>
          <p className="text-gray-900 font-bold text-2xl">
            {" "}
            {info
              ? humanFriendlyWei(info.totalBorrows)
                  .concat(" ")
                  .concat(token.symbol)
              : "000"}

          </p>
        </div>
      </div>

      <div className="md:flex p-4 border-b-2 justify-center">
        <div className="m-4 text-center">
          <p className="text-gray-600 uppercase tracking-widest font-bold">
            Utilization
          </p>
          <p className="text-gray-900 font-bold text-2xl">
            {" "}
            {info
              ? humanFriendlyWei(info.utilizationRate.mul ? info.utilizationRate.mul(toBN(100)) : (parseInt(info.utilizationRate as unknown as string, 16) * 100).toString()).concat(
                  "%"
                )
              : "0.0%"}
          </p>
        </div>
        <div className="m-4 text-center">
          <p className="text-gray-600 uppercase tracking-widest font-bold">
            Balance
          </p>
          <p className="text-gray-900 font-bold text-2xl">
            {safeBox
              ? humanFriendlyNumber(Number(fromWei(safeBox.balance)) * exchangeRate)
                  .concat(" ")
                  .concat(token.symbol)
              : "--"}
          </p>
        </div>
      </div>

      <div className="flex justify-center py-6">
        <button
          onClick={() => history.push(`earn/supply/${token.address}`)}
          className="bg-gradient-to-br from-blue-700 to-green-300 hover:opacity-75 text-white font-bold py-2 px-4 rounded-3xl w-32"
          // className="from-blue-700 py-2 px-4 cursor-pointer to-green-300 text-white border-blue-700 bg-gradient-to-r hover:to-blue-700 hover:from-green-300 hover:text-white active:bg-blue-700 font-bold rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          Supply &#x203A;
        </button>

        <button
          onClick={() => history.push(`earn/withdraw/${token.address}`)}
          className="ml-4 bg-gradient-to-br from-blue-700 to-green-300 hover:opacity-75 text-white font-bold py-2 px-4 rounded-3xl w-32"
          // className="from-blue-700 p-2 cursor-pointer to-green-300 text-white border-blue-700 bg-gradient-to-r hover:to-blue-700 hover:from-green-300 hover:text-white active:bg-blue-700 font-bold rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          Withdraw &#x203A;
        </button>
      </div>
    </div>
  );
};
