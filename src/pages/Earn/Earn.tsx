import { COLLATERAL_TOKENS } from "src/config";
import { EarnEntry } from "src/pages/Earn/EarnEntry";
import { css } from "@emotion/react";
import { Flex, Text, Card } from "theme-ui";
import { SimpleTable } from "src/components/SimpleTable";

export const Earn = () => {
  return (
    <div className="">
      <section className="max-w-screen-xl mx-auto">
        <div className="w-full py-6 text-center">
          <h1 className="uppercase tracking-widest font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-800">
            Earn
          </h1>
          <h2 className="tracking-tightest font-bold text-gray-600 text-2xl">
            Lend assets for the highest yield.
          </h2>
        </div>

        <div className="p-2">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 text-center">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Asset
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          APY
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total Supply
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total Borrow
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Utilization
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Balance
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {COLLATERAL_TOKENS.map((token) => (
                        <EarnEntry key={token.address} token={token} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
