import React from "react";
import { Card, Flex, Heading, Text, Spinner } from "theme-ui";
import { DEFAULT_GAS_PRICE } from "src/config";
import { CaretLeft } from "phosphor-react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useSetRecoilState, useRecoilState } from "recoil";
import { BlockText } from "src/components/BlockText";
import { Bank } from "src/config";
import { TokenAmountInfo } from "src/components/TokenAmountInfo";
import { fromWei, AbiItem } from "web3-utils";
import { toastTx } from "src/utils/toastTx";
import { toast } from "react-toastify";
import BANK_ABI from "src/abis/dahlia_contracts/HomoraBank.json";
import SUSHI_SPELL from "src/abis/dahlia_contracts/SushiswapSpellV1.json";
import { SushiswapSpellV1 } from "src/generated/SushiswapSpellV1";
import UBE_SPELL from "src/abis/dahlia_contracts/UbeswapMSRSpellV1.json";
import { UbeswapMSRSpellV1 } from "src/generated/UbeswapMSRSpellV1";
import { HomoraBank } from "src/generated/HomoraBank";
import { getAddress } from "ethers/lib/utils";
import { humanFriendlyNumber } from "src/utils/number";
import { poolState } from "src/pages/Farm/newFarm/NewFarm";
import { removePage, removePageState, removePositionState } from "./remove";
import { removeRemoveState } from "./removeTokens";
import { removePaybackState } from "./payback";
import { useHistory } from "react-router-dom";
import { Button } from "src/components/Button";
import { FarmType } from "src/config"
import { Header } from "src/components/Header";

export const Confirm: React.FC = () => {
  const { getConnectedKit, network } = useContractKit();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [pool] = useRecoilState(poolState);
  const setPage = useSetRecoilState(removePageState);
  const [position] = useRecoilState(removePositionState);
  const [remove] = useRecoilState(removeRemoveState);
  const [payback] = useRecoilState(removePaybackState);
  const history = useHistory();

  const confirmButton = (
    <Button
      onClick={async () => {
        const kit = await getConnectedKit();
        // kit is connected to a wallet
        try {
          setConfirmLoading(true);
          const bank = new kit.web3.eth.Contract(
            BANK_ABI.abi as AbiItem[],
            getAddress(Bank[network.chainId])
          ) as unknown as HomoraBank;
            let bytes: string
            if (pool.type === FarmType.SushiSwap) {
              const spell = new kit.web3.eth.Contract(
                SUSHI_SPELL.abi as AbiItem[],
                getAddress(pool.spell)
              ) as unknown as SushiswapSpellV1;
              bytes = spell.methods
              .removeLiquidityWMiniChef(
                pool.tokens[0]!.address,
                pool.tokens[1]!.address,
                [
                  remove.removeLp!.toString(),
                  0,
                  payback.payback![0]!.toString(),
                  payback.payback![1]!.toString(),
                  0,
                  0,
                  0,
                ]
              )
                .encodeABI();
            } else {
              const spell = new kit.web3.eth.Contract(
                UBE_SPELL.abi as AbiItem[],
                getAddress(pool.spell)
              ) as unknown as UbeswapMSRSpellV1;
              bytes = spell.methods
                .removeLiquidityWStakingRewards(
                  pool.tokens[0]!.address,
                pool.tokens[1]!.address,
                [
                  remove.removeLp!.toString(),
                  0,
                  payback.payback![0]!.toString(),
                  payback.payback![1]!.toString(),
                  0,
                  0,
                  0,
                ],
                  pool.wrapper,
                )
                .encodeABI();
            }
          const tx = await bank.methods
            .execute(position.positionId!, pool.spell, bytes)
            .send({
              from: kit.defaultAccount,
              gasPrice: DEFAULT_GAS_PRICE,
            });
          toastTx(tx.transactionHash);
        } catch (e: any) {
          toast(e.message);
        } finally {
          setConfirmLoading(false);
          setDone(true);
        }
      }}
    >
      Confirm
    </Button>
  );

  return (
    <div>
      <Header />
      <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
        <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
          <Flex
            onClick={() => {
              setPage(removePage.Payback);
            }}
            sx={{ alignItems: "center", cursor: "pointer" }}
            mb={4}
          >
            <CaretLeft size={28} />
            <Text>Back</Text>
          </Flex>
          <Flex mb={4}>
            <Heading as="h2" mr={2}>
              Position Breakdown
            </Heading>
          </Flex>
          <Flex sx={{ flexDirection: "column", gap: "25px", mb: 10 }}>
            <p className="text-xl font-bold tracking-tight text-gray-800 -mb-4">
              Remove from position
            </p>
            <Flex
              sx={{ justifyContent: "left", gap: "8px", alignItems: "center" }}
            >
              {remove &&
                pool.tokens.map((tok, index) => (
                  <Flex
                    sx={{
                      alignItems: "center",
                      mr: 4,
                      padding: 2,
                      borderStyle: "solid",
                      borderRadius: "10px",
                    }}
                  >
                    <TokenAmountInfo
                      key={tok.address}
                      token={tok}
                      amount={fromWei(remove.remove![index]!)}
                    />
                  </Flex>
                ))}
            </Flex>
          </Flex>
          <Flex sx={{ flexDirection: "column", gap: "25px", mb: 10 }}>
            <p className="text-xl font-bold tracking-tight text-gray-800 -mb-4">
              Payback borrows
            </p>
            <Flex
              sx={{ justifyContent: "left", gap: "8px", alignItems: "center" }}
            >
              {remove &&
                pool.tokens.map((tok, index) => (
                  <Flex
                    sx={{
                      alignItems: "center",
                      mr: 4,
                      padding: 2,
                      borderStyle: "solid",
                      borderRadius: "10px",
                    }}
                  >
                    <TokenAmountInfo
                      key={tok.address}
                      token={tok}
                      amount={fromWei(payback.payback![index]!)}
                    />
                  </Flex>
                ))}
            </Flex>
          </Flex>
          <Flex sx={{ flexDirection: "column", gap: "25px", mb: 10 }}>
            <p className="text-xl font-bold tracking-tight text-gray-800 -mb-4">
              You receive
            </p>
            <Flex
              sx={{ justifyContent: "left", gap: "8px", alignItems: "center" }}
            >
              {remove &&
                pool.tokens.map((tok, index) => (
                  <Flex
                    sx={{
                      alignItems: "center",
                      mr: 4,
                      padding: 2,
                      borderStyle: "solid",
                      borderRadius: "10px",
                    }}
                  >
                    <TokenAmountInfo
                      key={tok.address}
                      token={tok}
                      amount={fromWei(
                        remove.remove![index]!.sub(payback.payback![index]!)
                      )}
                    />
                  </Flex>
                ))}
            </Flex>
          </Flex>
          <Flex sx={{ flexDirection: "column", gap: "25px", mb: 10 }}>
            <p className="text-xl font-bold tracking-tight text-gray-800">
              Position Statistics
            </p>
            <Flex
              sx={{ justifyContent: "left", gap: "8px", flexDirection: "column" }}
            >
              <BlockText>
                {"New Est. Debt Ratio: "
                  .concat(humanFriendlyNumber(payback.debtRatio!))
                  .concat("/100")}
              </BlockText>
              <BlockText>
                {"New Leverage: "
                  .concat(humanFriendlyNumber(payback.lever!))
                  .concat("x")}
              </BlockText>
              <BlockText>
                {"Farming APR: "
                  .concat(humanFriendlyNumber(payback.apy! * 100))
                  .concat("%")}
              </BlockText>
            </Flex>
          </Flex>
          <Flex sx={{ justifyContent: "center", mt: 6 }}>
            {confirmLoading ? (
              <Spinner />
            ) : (
              <Flex sx={{ justifyContent: "center", gap: "6px" }}>
                {done ? (
                  <Button
                    onClick={() => {
                      history.push("/positions");
                      setPage(removePage.Remove);
                    }}
                  >
                    Return
                  </Button>
                ) : (
                  confirmButton
                )}
              </Flex>
            )}
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};
