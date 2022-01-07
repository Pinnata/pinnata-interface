import React from "react";
import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import { getToken } from "src/utils/token";
import { useParams } from "react-router-dom";
import { Supply } from "src/pages/Farm/newFarm/supply";
import { Borrow } from "src/pages/Farm/newFarm/borrow";
import { Confirm } from "src/pages/Farm/newFarm/confirm";
import { Farm, FarmType } from "src/config"
import { getFarm } from "src/utils/farm";

export enum farmPage {
  Supply, 
  Borrow, 
  Confirm,
}

export const farmPageState = atom({
  key: 'farmPageState',
  default: farmPage.Supply
})

const emptyPoolState : Farm = {
    name: "",
    wrapper: "",
    spell: "",
    lp: "",
    apy: "",
    tokens: [],
    rewards: [],
    type: FarmType.Ubeswap,
}

export const poolState = atom({
  key: 'poolState',
  default: emptyPoolState
})

export const NewFarm: React.FC = () => {
  const { name, wrapper, spell, lp, apy, tokens, type, id } = useParams<{ name: string, wrapper: string, spell: string, lp: string, apy: string, tokens: string, type: string, id: string }>();
  const setPool = useSetRecoilState(poolState); 
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

  

  const [page] = useRecoilState(farmPageState);

  return (
    <div>
      {
        page === farmPage.Supply ? (
            <Supply />
          ) : (
            page === farmPage.Borrow ? (
            <Borrow />
          ) : (
            <Confirm />
          ))}
    </div>
    
  );
};