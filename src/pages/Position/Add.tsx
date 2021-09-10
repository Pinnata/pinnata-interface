/** @jsxImportSource theme-ui */
import React from 'react';
import { useGlobalContext } from '../../context/context';
import SecondContainer from '../../components/AddPosition/SecondContainer';
import FirstContainer from '../../components/AddPosition/FirstContainer';

const Add = () => {
  const { addIndex } = useGlobalContext();

  if (addIndex === 0) {
    return (
      <>
        <h1 sx={{variant:'cards.remove.Header'}}>ADD POSITION</h1>
        <FirstContainer />
      </>
    );
  } else {
    return (
      <>
        <h1 sx={{variant:'cards.remove.Header'}}>ADD POSITION</h1>
        <SecondContainer />
      </>
    );
  }
};

export default Add;


