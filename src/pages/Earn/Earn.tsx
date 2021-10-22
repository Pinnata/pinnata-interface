import { COLLATERAL_TOKENS } from "src/config";
import { EarnEntry } from "src/pages/Earn/EarnEntry";
import { css } from "@emotion/react";
import { Flex, Text, Card } from "theme-ui";
import { SimpleTable } from "src/components/SimpleTable";

export const Earn = () => {
  return (
    <section className="max-w-screen-xl mx-auto mt-8">
      <div className="w-full py-6 text-center">
        <h1 className="uppercase tracking-widest font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-br from-gray-400 to-gray-500">
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
                    {/* <tr> */}

                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap"></td>
                      <td className="px-6 py-4 whitespace-nowrap"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td> */}
                    {/* </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// <Flex sx={{flexDirection: "column", alignItems: "center", width: "100%"}}>
//   <Flex sx={{gap: 15, flexDirection: "column", alignItems: "center", mb: 15}}>
//     <Text color="text" variant="title">EARN</Text>
//     <Text color="text" variant="description">Lend assets for the highest yield.</Text>
//   </Flex>
//   <Card sx={{ width: "100%", maxWidth: "1000px", mt: "16px" }} py={4} px={3}>
//     <SimpleTable>
//     <thead>
//       <tr>
//         <th
//           css={css`
//             text-align: left !important;
//           `}
//         >
//           <Text variant="bold">Asset</Text>
//         </th>
//         <th><Text variant="bold">APY</Text></th>
//         <th><Text variant="bold">Total Supply</Text></th>
//         <th><Text variant="bold">Total Borrow</Text></th>
//         <th><Text variant="bold">Utilization</Text></th>
//         <th><Text variant="bold">Balance</Text></th>
//         <th />
//       </tr>
//     </thead>
//     <tbody>
//       {COLLATERAL_TOKENS.map((token) => (
//         <EarnEntry key={token.address} token={token}/>
//       ))}
//     </tbody>
//   </SimpleTable>
//   </Card>
// </Flex>
