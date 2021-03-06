import React from "react";
import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import { getToken } from "src/utils/token";
import { useParams } from "react-router-dom";
import { poolState } from "src/pages/Farm/newFarm/NewFarm";
import { emptyPositionState } from "../Add/add";
import { RemoveTokens } from "./removeTokens";
import { Payback } from "./payback";
import { Confirm } from "./confirm";
import { getFarm } from "src/utils/farm";
import { Header } from "src/components/Header";
import { Farm } from "src/config";

export enum removePage {
    Remove, 
    Payback, 
    Confirm,
}
  
export const removePageState = atom({
    key: 'removePageState',
    default: removePage.Remove
})

export const removePositionState = atom({
  key: 'removePositionState',
  default: emptyPositionState
})

export const Remove: React.FC = () => {
  const { positionId, collId, collateralSize, name, wrapper, spell, lp, apy, tokens, type, id } = useParams<{ positionId: string, collId: string, collateralSize: string, name: string, wrapper: string, spell: string, lp: string, apy: string, tokens: string, type: string, id: string}>();
  const setPool = useSetRecoilState(poolState); 
  const setPosition = useSetRecoilState(removePositionState); 

  const set: Farm  = {
      name: name,
      wrapper: wrapper,
      spell: spell,
      lp: lp,
      apy: apy,
      tokens: (tokens.split(',').map((x) => getToken(x)!)),
      rewards: [],
      type: getFarm(type)!,
      id: id,
  }
  setPool(set); 
  setPosition({
    positionId, 
    collateralSize,
    collId,
  });

  const [page] = useRecoilState(removePageState);

  return (
    <div>
      {
        page === removePage.Remove ? (
            <RemoveTokens />
          ) : (
            page === removePage.Payback ? (
            <Payback />
          ) : (
            <Confirm />
          )) }
    </div>
    
  );
};