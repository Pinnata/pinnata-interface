import React from 'react';
import FarmFirstContainer from '../../components/FarmPool/FarmFirstContainer';
import FarmSecondContainer from '../../components/FarmPool/FarmSecondContainer';
import FarmThirdContainer from '../../components/FarmPool/FarmThirdContainer';
import { useGlobalContext } from '../../context/context';

const Farm = () => {
  const { indexFarm } = useGlobalContext();
  if (indexFarm === 0) {
    return <FarmFirstContainer />;
  } else if (indexFarm === 1) {
    return <FarmSecondContainer />;
  } else {
    return <FarmThirdContainer />;
  }
};

export default Farm;
