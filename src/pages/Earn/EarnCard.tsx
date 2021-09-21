import { useContractKit } from "@celo-tools/use-contractkit";
import { Token } from "src/utils/token";
import { AbiItem, toBN } from "web3-utils";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { CErc20Immutable } from "src/generated/CErc20Immutable";
import { Bank, safeBoxMap } from "src/config";
import React, { useState } from "react";
import { useAsyncState } from "src/hooks/useAsyncState";
import { getAddress } from "ethers/lib/utils";
import { humanFriendlyWei } from "src/utils/eth";
import { useSafeBox } from "src/hooks/useSafeBox";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { TokenInfo } from "src/components/TokenInfo";
import { Button, Flex, Text, Card } from "theme-ui";
import { useHistory } from "react-router-dom";
import { RowBetween, InfoCard, CenteredRow } from "../../components/Styleds";

interface Props {
  token: Token;
}

const CardContent = styled.div`
  width: 95%;
  height: 95%;
  margin: auto;
  transition: 1s all ease-in;
`;

const ExpandButton = styled(Button)`
  cursor: pointer;
  background: none;
  color: black;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: white;
  margin-top: 1rem;
  opacity: 0.6;
`;

const ActionButton = styled(Button)`
  margin-left: 0.5rem;
  margin-bottom: 0.25rem;
`;

export const EarnCard: React.FC<Props> = ({ token }: Props) => {
  const { kit, network } = useContractKit();
  const [safeBox] = useSafeBox(safeBoxMap.get(token.address)!);
  const history = useHistory();
  const [expand, setExpand] = useState<boolean>(false);

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
      };
    } catch (error) {
      console.log(error);
    }
  }, [bank, token.address, kit]);

  const [info] = useAsyncState(null, call);

  return (
    <InfoCard>
      <CardContent
        onClick={() => setExpand(!expand)}
        style={{ cursor: "pointer" }}
      >
        <RowBetween style={{ marginBottom: "0.5rem" }}>
          <TokenInfo token={token} />
          <Text>
            {info
              ? humanFriendlyWei(info.projectedAPY.mul(toBN(100))).concat("%")
              : "--"}
            {" APY"}
          </Text>
        </RowBetween>
        {expand && (
          <>
            {" "}
            <RowBetween>
              <Text>Total Supply</Text>
              <Text>{info ? humanFriendlyWei(info.totalSupply) : "--"}</Text>
            </RowBetween>
            <RowBetween>
              <Text>Total Borrows</Text>
              <Text>{info ? humanFriendlyWei(info.totalBorrows) : "--"}</Text>
            </RowBetween>
            <RowBetween>
              <Text>Utilization Rate</Text>
              <Text>
                {info
                  ? humanFriendlyWei(
                      info.utilizationRate.mul(toBN(100))
                    ).concat("%")
                  : "--"}
              </Text>
            </RowBetween>
          </>
        )}
        <Divider />
        <RowBetween>
          <Text>Your Balance</Text>
          <Text>
            {safeBox
              ? humanFriendlyWei(safeBox.balance)
                  .concat(" d")
                  .concat(token.symbol)
              : "--"}
          </Text>
        </RowBetween>
        <RowBetween style={{ alignItems: "end" }}>
          <div style={{ width: "1px" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              flexWrap: "wrap",
            }}
          >
            <ActionButton
              onClick={() => history.push(`earn/supply/${token.address}`)}
            >
              Supply
            </ActionButton>
            <ActionButton
              onClick={() => history.push(`earn/withdraw/${token.address}`)}
            >
              Withdraw
            </ActionButton>
          </div>
        </RowBetween>
      </CardContent>
    </InfoCard>
    // <Row>
    //   <td>
    //     <TokenInfo token={token} />
    //   </td>
    //   <td>
    //     <Text>
    //       {info
    //         ? humanFriendlyWei(info.projectedAPY.mul(toBN(100))).concat("%")
    //         : "--"}
    //     </Text>
    //   </td>
    //   <td>
    //     <Text>{info ? humanFriendlyWei(info.totalSupply) : "--"}</Text>
    //   </td>
    //   <td>
    //     <Text>{info ? humanFriendlyWei(info.totalBorrows) : "--"}</Text>
    //   </td>
    //   <td>
    //     <Text>
    //       {info
    //         ? humanFriendlyWei(info.utilizationRate.mul(toBN(100))).concat("%")
    //         : "--"}
    //     </Text>
    //   </td>
    //   <td>
    //     <Text>
    //   {safeBox
    //     ? humanFriendlyWei(safeBox.balance)
    //         .concat(" d")
    //         .concat(token.symbol)
    //     : "--"}
    //     </Text>
    //   </td>
    //   <td
    //     css={css`
    //       text-align: right;
    //     `}
    //   >
    //     <div
    //       css={css`
    //         display: flex;
    //         justify-content: flex-end;
    //       `}
    //     >
    //       <Flex sx={{ gap: "6px" }}>
    // <Button
    //   onClick={() => history.push(`earn/supply/${token.address}`)}
    // >
    //   Supply
    // </Button>
    // <Button
    //   onClick={() => history.push(`earn/withdraw/${token.address}`)}
    // >
    //   Withdraw
    // </Button>
    //       </Flex>
    //     </div>
    //   </td>
    // </Row>
  );
};

const Row = styled.tr`
  height: 72px;
`;

export default EarnCard;
