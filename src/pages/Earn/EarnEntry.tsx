import { useContractKit } from "@celo-tools/use-contractkit";
import { Token } from "src/utils/token";
import { AbiItem, toBN } from "web3-utils";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import CERC20_ABI from "src/abis/fountain_of_youth/CErc20Immutable.json";
import { HomoraBank } from "src/generated/HomoraBank";
import { CErc20Immutable } from "src/generated/CErc20Immutable";
import { Bank, safeBoxMap } from "src/config";
import React from "react";
import { useAsyncState } from "src/hooks/useAsyncState";
import { getAddress } from "ethers/lib/utils";
import { humanFriendlyWei } from "src/utils/eth";
import { useSafeBox } from "src/hooks/useSafeBox"
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { TokenInfo } from "src/components/TokenInfo";
import { Button, Flex } from "theme-ui";
import { useHistory } from "react-router-dom"


interface Props {
  token: Token;
}

export const EarnEntry: React.FC<Props> = ({ token }: Props) => {
  const { kit, network } = useContractKit();
  const [safeBox] = useSafeBox(safeBoxMap.get(token.address)!);
  const history = useHistory(); 

  const bank = React.useMemo(() => (new kit.web3.eth.Contract(
    BANK_ABI.abi as AbiItem[],
    getAddress(Bank[network.chainId])
  ) as unknown) as HomoraBank, [kit, network]); 

  const call = React.useCallback(async () => {
    try {
        const bankInfo =  await bank.methods.getBankInfo(token.address).call();
        const cToken = (new kit.web3.eth.Contract(
          CERC20_ABI as AbiItem[],
          bankInfo.cToken,
        ) as unknown) as CErc20Immutable;
        const totalSupply = toBN(await cToken.methods.totalSupply().call());
        const totalBorrows = toBN(await cToken.methods.totalBorrows().call());
        const blocksPerYear = toBN(6311390); 
        const supplyRate = toBN(await cToken.methods.supplyRatePerBlock().call()).mul(blocksPerYear);
        const utilRate = totalSupply.eq(toBN(0)) ? toBN(0) : totalBorrows.mul(toBN(10).pow(toBN(18))).div(totalSupply)
        return {
            totalSupply: totalSupply,
            totalBorrows: totalBorrows,
            utilizationRate: utilRate,
            projectedAPY: supplyRate,
        }
    } catch (error) {
        console.log(error)
    }
    
}, [bank, token.address, kit])

  const [info] = useAsyncState(null, call);

  return (
    <Row>
    <td>
      <TokenInfo token={token} />
    </td>
    <td>{info ? humanFriendlyWei(info.projectedAPY.mul(toBN(100))).concat("%") : "--"}</td>
    <td>{info ? humanFriendlyWei(info.totalSupply) : "--"}</td>
    <td>{info ? humanFriendlyWei(info.totalBorrows) : "--"}</td>
    <td>{info ? humanFriendlyWei(info.utilizationRate.mul(toBN(100))).concat("%") : "--"}</td>
    <td>{safeBox ? humanFriendlyWei(safeBox.balance).concat(" d").concat(token.symbol) : "--"}</td>
    <td
        css={css`
          text-align: right;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 8px;
            justify-content: flex-end;
          `}
        >
          <Flex sx={{gap: "6px"}}>
            <Button onClick={() => history.push(`earn/supply/${token.address}`)}>Supply</Button>
            <Button onClick={() => history.push(`earn/withdraw/${token.address}`)}>Withdraw</Button>
          </Flex>
        </div>
      </td>
  </Row>
  );
};

const Row = styled.tr`
  height: 72px;
`;
