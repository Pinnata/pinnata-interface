import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const toggleNav = () => {
    setToggle(!toggle);
  };
  //
  //
  const [indexFarm, setIndexFarm] = useState(0);
  const handleIndexFarm = () => {
    if (indexFarm < 2) {
      setIndexFarm(indexFarm + 1);
    } else {
      setIndexFarm(2);
    }
  };
  const handleBackIndexFarm = () => {
    setIndexFarm(indexFarm - 1);
  };
  //
  //
  const [removeIndex, setRemoveIndex] = useState(0);
  const handleIndexRemove = () => {
    if (removeIndex < 3) {
      setRemoveIndex(removeIndex + 1);
    } else {
      setRemoveIndex(2);
    }
  };
  const handleBackIndexRemove = () => {
    setRemoveIndex(removeIndex - 1);
  };
  //
  //
  const [addIndex, setAddIndex] = useState(0);
  const handleIndexAdd = () => {
    if (addIndex < 3) {
      setAddIndex(addIndex + 1);
    } else {
      setAddIndex(2);
    }
  };
  const handleBackIndexAdd = () => {
    setAddIndex(addIndex - 1);
  };
  return (
    <AppContext.Provider
      value={{
        toggleNav,
        toggle,
        handleIndexFarm,
        indexFarm,
        handleBackIndexFarm,
        removeIndex,
        handleIndexRemove,
        handleBackIndexRemove,
        addIndex,
        handleIndexAdd,
        handleBackIndexAdd,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
