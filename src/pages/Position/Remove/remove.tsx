import React from "react";
import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import { getToken } from "src/utils/token";
import { useParams } from "react-router-dom";
import { poolState, poolProps } from "src/pages/Farm/newFarm/NewFarm";
import { emptyPositionState } from "../Add/add";
import { RemoveTokens } from "./removeTokens";
import { Payback } from "./payback";
import { Confirm } from "./confirm";
import { getFarm } from "src/utils/farm";

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
  const { positionId, collId, collateralSize, name, wrapper, spell, lp, apy, tokens, type } = useParams<{ positionId: string, collId: string, collateralSize: string, name: string, wrapper: string, spell: string, lp: string, apy: string, tokens: string, type: string}>();
  const setPool = useSetRecoilState(poolState); 
  const setPosition = useSetRecoilState(removePositionState); 

  const set: poolProps  = {
      name: name,
      wrapper: wrapper,
      spell: spell,
      lp: lp,
      apy: apy,
      tokens: (tokens.split(',').map((x) => getToken(x)!)),
      rewards: [],
      type: getFarm(type)!,
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