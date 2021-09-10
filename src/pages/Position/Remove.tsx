/** @jsxImportSource theme-ui */
import React from 'react';
import RemoveFirstContainer from '../../components/RemovePosition/RemoveFirstContainer';
import RemoveLastContainer from '../../components/RemovePosition/RemoveLastContainer';
import RemoveSecondContainer from '../../components/RemovePosition/RemoveSecondContainer';
import RemoveThirdContainer from '../../components/RemovePosition/RemoveThirdContainer';
import { useGlobalContext } from '../../context/context';

const Remove = () => {
  const { removeIndex } = useGlobalContext();
  if (removeIndex === 0) {
    return (
      <>
        <h1 sx={{variant:'cards.remove.Header'}} >REMOVE LIQUITY</h1>
        <RemoveFirstContainer />
      </>
    );
  } else if (removeIndex === 1) {
    return (
      <>
        <h1 sx={{variant:'cards.remove.Header'}}>REMOVE LIQUITY</h1>
        <RemoveSecondContainer />
      </>
    );
  } else if (removeIndex === 2) {
    return (
      <>
        <h1 sx={{variant:'cards.remove.Header'}}>REMOVE LIQUITY</h1>
        <RemoveThirdContainer />
      </>
    );
  } else {
    return (
      <>
        <h1 sx={{variant:'cards.remove.Header'}}>REMOVE LIQUITY</h1>
        <RemoveLastContainer />
      </>
    );
  }
};

export default Remove;
