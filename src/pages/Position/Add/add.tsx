import React from "react";
import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import { getToken } from "src/utils/token";
import { useParams } from "react-router-dom";
import { poolState } from "src/pages/Farm/newFarm/NewFarm";
import { Supply } from "src/pages/Position/Add/supply";
import { Borrow } from "src/pages/Position/Add/borrow";
import { Confirm } from "src/pages/Position/Add/confirm";
import { getFarm } from "src/utils/farm";
import { Farm } from "src/config";


export enum addPage {
    Supply, 
    Borrow, 
    Confirm,
}
  
export const addPageState = atom({
    key: 'addPageState',
    default: addPage.Supply
})

interface positionProps {
  positionId: string | null;
  collateralSize: string | null; 
  collId: string | null;
}

export const emptyPositionState : positionProps = {
  positionId: null,
  collateralSize: null,
  collId: null,
}

export const addPositionState = atom({
  key: 'addPositionState',
  default: emptyPositionState
})

export const Add: React.FC = () => {
  const { positionId, collId, collateralSize, name, wrapper, spell, lp, apy, tokens, type} = useParams<{ positionId: string, collId: string, collateralSize: string, name: string, wrapper: string, spell: string, lp: string, apy: string, tokens: string, type: string}>();
  const setPool = useSetRecoilState(poolState); 
  const setPosition = useSetRecoilState(addPositionState); 
  const set: Farm = {
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
  })  
  
  const [page] = useRecoilState(addPageState);

  return (
    <div>
      {
        page === addPage.Supply ? (
            <Supply />
          ) : (
            page === addPage.Borrow ? (
            <Borrow />
          ) : (
            <Confirm />
          ))}
    </div>
    
  );
};