import { COLLATERAL_TOKENS } from "src/config";
import { EarnEntry } from "src/pages/Earn/EarnEntry";
import { css } from "@emotion/react";
import { Flex, Text, Card } from "theme-ui";
import { SimpleTable } from "src/components/SimpleTable";

export const Earn = () => {
  return (
    <div className="">
      <section className="max-w-screen-xl mx-auto">
        <div className="w-full md:pt-4 text-center md:pb-0 pb-2 pt-2">
          <h1 className="uppercase tracking-widest font-bold md:text-5xl text-3xl text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-800">
            Earn
          </h1>
          <h2 className="tracking-tightest font-bold text-gray-600 md:text-3xl text-xl">
            Lend assets for the highest yield.
          </h2>
        </div>

        <section className="md:flex md:m-4">
          {COLLATERAL_TOKENS.map((token) => (
            <EarnEntry key={token.address} token={token} />
          ))}
        </section>
      </section>
    </div>
  );
};
