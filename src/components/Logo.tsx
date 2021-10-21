import React from "react";
import { useHistory } from "react-router-dom";
import { Flex } from "theme-ui";
import Log from "src/images/logo2.png";

export const Logo: React.FC = () => {
  const history = useHistory();

  return (
    <Flex
      sx={{ cursor: "pointer", alignItems: "center", justifyContent: "center" }}
      className="p-2"
      onClick={() => {
        history.push("/");
      }}
    >
      <div className="flex justify-content items-center hover:opacity-75">
        <img src={Log} alt="Logo" />
        <h1 className="ml-1 font-bold text-3xl tracking-tighter text-gray-800">
          Dahlia
        </h1>
      </div>
    </Flex>
  );
};
