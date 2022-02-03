import React from "react";
import { Flex, Spinner } from "theme-ui";
import { useERC } from "src/hooks/useERC";
import { useERCmulti } from "src/hooks/useERCmulti";
import { TokenInputForm } from "src/components/TokenInputForm";
import { atom, useSetRecoilState, useRecoilState } from "recoil";
import {
  farmPageState,
  farmPage,
  poolState,
} from "src/pages/Farm/newFarm/NewFarm";
import { Token } from "src/utils/token";
import { toWei, toBN } from "web3-utils";
import { lpToken } from "src/config";
import { useHistory } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import { Button } from "src/components/Button";
import { Header } from "src/components/Header";

interface supplyProps {
  tokenSupply: any[] | null;
  lpSupply: any | null;
}

const emptyNewSupplyState: supplyProps = {
  tokenSupply: null,
  lpSupply: null,
};

export const newSupplyState = atom({
  key: "newSupplyState",
  default: emptyNewSupplyState,
});

export const Supply: React.FC = () => {
  const [pool] = useRecoilState(poolState);
  const setSupply = useSetRecoilState(newSupplyState);
  const setPage = useSetRecoilState(farmPageState);
  const [buttonLoading, setButtonLoading] = React.useState(true);
  const history = useHistory();

  const lpTok: Token = new Token({
    ...lpToken,
    address: pool!.lp,
  });
  const [erc] = useERC(lpTok.address);
  const [tokenStates] = useERCmulti(pool!.tokens);

  const [amounts, setAmounts] = React.useState(
    Array<string>(pool.tokens.length).fill("0")
  );

  React.useEffect(
    () => setAmounts(Array<string>(pool.tokens.length).fill("0")),
    [pool.tokens]
  );

  const [lpAmount, setLPAmount] = React.useState("0");

  const continueButton = (
    <Button
      onClick={() => {
        setSupply({
          tokenSupply: amounts.map((x) => toBN(toWei(x))),
          lpSupply: toBN(toWei(lpAmount)),
        });
        setPage(farmPage.Borrow);
      }}
    >
      Continue
    </Button>
  );

  const invalid = <Button disabled>Enter a valid amount</Button>;
  const insufficient = <Button disabled={true}>Insufficient funds</Button>;

  let button = continueButton;
  if (amounts.length === 0) return null;
  if (tokenStates) {
    for (let i = 0; i < tokenStates.length; i += 1) {
      if (tokenStates[i]) {
        const fmtCost = amounts[i] === "" ? "0" : amounts[i]!;
        const amountBN = toBN(toWei(fmtCost));
        if (Number(fmtCost) < 0 || amounts[i] === "") {
          button = invalid;
        } else if (tokenStates[i]?.balance.lt(amountBN)) {
          button = insufficient;
        }
      }
    }
    if (erc) {
      const fmtCost = lpAmount === "" ? "0" : lpAmount;
      const amountBN = toBN(toWei(fmtCost));
      if (Number(fmtCost) < 0 || lpAmount === "") {
        button = invalid;
      } else if (erc.balance.lt(amountBN)) {
        button = insufficient;
      }
      if (amounts.every((x) => x === "0") && lpAmount === "0") button = invalid;
      if (buttonLoading) setButtonLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="bg-gray-100 rounded-3xl shadow-md p-4 m-2 md:max-w-2xl max-w-xl mx-auto">
        <p
          onClick={() => {
            history.goBack();
          }}
          className="flex items-center hover:opacity-75 cursor-pointer tracking-tight text-base font-bold"
        >
          {" "}
          <CaretLeft size={20} />
          Back
        </p>

        <h1 className="text-gray-800 text-3xl font-bold tracking-tight text-center mb-6">
          Farm
        </h1>

        <p className="text-xl font-bold text-center -mb-4 text-gray-800 mt-2">
          Supply
        </p>
        {pool.tokens.map((tok, index) => (
          <TokenInputForm
            key={tok.address}
            token={tok}
            amount={amounts[index]!}
            setAmount={(s: string) =>
              setAmounts(amounts.map((x, i) => (i === index ? s : x)))
            }
            balance={
              tokenStates && tokenStates![index]!
                ? tokenStates![index]?.balance!
                : null
            }
          />
        ))}
        <p className="text-xl font-bold text-center mt-4 -mb-4 text-gray-800">
          Supply LP Token
        </p>
        <TokenInputForm
          token={lpTok}
          amount={lpAmount}
          setAmount={setLPAmount}
          balance={erc ? erc.balance : null}
        />
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
          {buttonLoading ? <Spinner /> : button}
        </Flex>
      </div>
    </div>
  );
};
