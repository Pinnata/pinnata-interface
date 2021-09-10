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
        console.log(positionInfo, i); 
        const wrapper = (new kit.web3.eth.Contract(
          IERC20W_ABI.abi as AbiItem[],
          positionInfo.collToken,
          ) as unknown) as IERC20Wrapper;
        const underlying = await wrapper.methods.getUnderlyingToken(positionInfo.collId).call(); 
        console.log(underlying);
        for (let farm of FARMS) {
          if (getAddress(underlying) === farm.lp && getAddress(positionInfo.owner) === getAddress(address!)) {
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
    <Text>Positions</Text>
    <Text>Manage your positions with ease.</Text>
    <Card sx={{ width: "100%", maxWidth: "1000px", mt: "16px" }} py={4} px={3}>
    <SimpleTable>
          <thead>
            <tr>
              <th
                css={css`
                  text-align: left !important;
                `}
              >
                Pool
              </th>
              <th>Borrow Value</th>
              <th>Total Value</th>
              <th>Debt Ratio </th>
              <th>APY</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { info ? 
              info.map((x) => (
              <PositionEntry key={x.positionId} collId={x.collId} collateralSize={x.collateralSize} positionId={x.positionId} pool={x.farm!} />
            )) : 
            (<Flex sx={{ alignItems: "center", justifyContent: "center"}}>
              <Spinner />
            </Flex>)
            }
            
          </tbody>
        </SimpleTable>
    </Card>
  </Flex>
  );
};
