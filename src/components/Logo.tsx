import React from "react";
import { useHistory } from "react-router-dom";
import { Flex } from "theme-ui";
import Log from "src/images/dahlia-black.png";

export const Logo: React.FC = () => {
  const history = useHistory();

  return (
    <Flex
      sx={{ cursor: "pointer", alignItems: "center", justifyContent: "center" }}
      className=""
      onClick={() => {
        history.push("/");
      }}
    >
      <div className="flex justify-content items-center hover:opacity-75">
        <div className="w-10 h-10 mr-2">
          <img className="w-full" src={Log} alt="Logo" />
        </div>
        <h1 className="uppercase font-bold text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-800">
          Dahlia
        </h1>
      </div>
    </Flex>
  );
};
