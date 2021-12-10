import React from "react";
import { useHistory } from "react-router-dom";
import Log from "src/images/dahlia-black.png";

export const Logo: React.FC = () => {
  const history = useHistory();

  return (
    <div
      className="flex items-center md:-mx-5 justify-center md:my-0 my-4 cursor-pointer"
      onClick={() => {
        history.push("/");
      }}
    >
      <div className="flex justify-content items-center hover:opacity-75">
        <div className="w-10 h-10 mr-2">
          <img className="w-full" src={Log} alt="Logo" />
        </div>
        <h1 className="logo uppercase font-bold text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-800">
          Pinnata
        </h1>
      </div>
    </div>
  );
};
