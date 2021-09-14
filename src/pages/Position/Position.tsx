import React from 'react';
import { useContractKit } from "@celo-tools/use-contractkit";
import { AbiItem, toBN } from "web3-utils";
import { HomoraBank } from "src/generated/HomoraBank";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import { getAddress } from "ethers/lib/utils";
import { Bank } from "src/config";
import { useAsyncState } from "src/hooks/useAsyncState";
import { FARMS } from "src/config";
import { PositionEntry } from "src/pages/Position/PositionEntry"
import Image from 'src/images/background.png';
import { SimpleTable } from "src/components/SimpleTable";
import { css } from "@emotion/react";
import { IERC20Wrapper } from 'src/generated/IERC20Wrapper';
import IERC20W_ABI from "src/abis/dahlia_contracts/IERC20Wrapper.json";
import { Flex, Text, Card, Spinner } from "theme-ui";



export const Position = () => {
  const { kit, address } = useContractKit();

  const bank = React.useMemo(() => (new kit.web3.eth.Contract(
    BANK_ABI.abi as AbiItem[],
    getAddress(Bank[42220])
  ) as unknown) as HomoraBank, [kit]); 

  const call = React.useCallback(async () => {
    try {
      const info = [];
      const nextPositionId = await bank.methods.nextPositionId().call(); 
      for (let i = 1; i < Number(nextPositionId); i += 1) {
        const positionInfo = await bank.methods.getPositionInfo(i).call();
        const wrapper = (new kit.web3.eth.Contract(
          IERC20W_ABI.abi as AbiItem[],
          positionInfo.collToken,
          ) as unknown) as IERC20Wrapper;
        const underlying = await wrapper.methods.getUnderlyingToken(positionInfo.collId).call(); 
        for (let farm of FARMS) {
          if (getAddress(underlying) === farm.lp && getAddress(positionInfo.owner) === getAddress(address!) && positionInfo.collateralSize !== "0") {
            info.push({
              collId: positionInfo.collId, 
              collateralSize: positionInfo.collateralSize,
              positionId: i,
              farm: farm,
            })
            break;
          }
        }
      }
      return info;  
    } catch (error) {
        console.log(error)
    }  
}, [bank.methods, kit.web3.eth.Contract, address])

  const [info] = useAsyncState(null, call);
  return (
    <Flex sx={{flexDirection: "column", alignItems: "center", width: "100%"}}>
    <Flex sx={{gap: 15, flexDirection: "column", alignItems: "center", mb: 15}}>
        <Text variant="title">Positions</Text>
        <Text variant="description">Manage your positions with ease.</Text>
      </Flex>
    <Card sx={{ width: "100%", maxWidth: "1000px", mt: "16px" }} py={4} px={3}>
      {info ? 
    <SimpleTable>
          <thead>
            <tr>
              <th
                css={css`
                  text-align: left !important;
                `}
              >
                <Text variant="bold">Pool</Text>
              </th>
              <th><Text variant="bold">Borrow Value</Text></th>
              <th><Text variant="bold">Total Value</Text></th>
              <th><Text variant="bold">Debt Ratio</Text></th>
              <th />
            </tr>
          </thead>
          <tbody>
            {  
              info.map((x) => 
              <PositionEntry key={x.positionId} collId={x.collId} collateralSize={x.collateralSize} positionId={x.positionId} pool={x.farm!} />
            )}
          </tbody>
        </SimpleTable>
      : 
      <Flex sx={{justifyContent: "center", alignItems: "center"}}><Spinner /></Flex>}
    </Card>
  </Flex>
  );
};
