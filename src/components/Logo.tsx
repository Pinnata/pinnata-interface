import React from "react";
import { useHistory } from "react-router-dom";
import { Flex } from "theme-ui";
import Log from "src/images/logo2.png";

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
        {/* Waiting for high-res <img src={Log} alt="Logo" /> */}
        <h1 className="font-extrabold text-4xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-500">
          Dahlia
        </h1>
      </div>
    </Flex>
  );
};
