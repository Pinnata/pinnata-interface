import { COLLATERAL_TOKENS } from "src/config";
import { EarnEntry } from "src/pages/Earn/EarnEntry";
import { useTVL } from "src/hooks/useTVL";
import { humanFriendlyNumber } from "src/utils/number";

export const Earn = () => {
  const [tvl, refetchTVL] = useTVL();
  return (
    <div className="">
      <section className="max-w-screen-xl mx-auto">
        <div className="w-full text-center md:pb-0 pb-2 pt-2">
          <h2 className="tracking-tightest font-bold text-gray-700 text-5xl my-2">
            Lend assets for the highest yield.
          </h2>
        </div>

        {tvl && (
          <div className="w-full text-center md:pb-0 pb-2 pt-2">
            <h2 className="tracking-tightest font-bold text-gray-700 text-2xl my-2">
              TVL: ${tvl ? humanFriendlyNumber(tvl) : "0"}
            </h2>
          </div>
        )}

        <section className="md:flex md:m-4 md:justify-center w-full">
          {COLLATERAL_TOKENS.map((token) => (
            <EarnEntry key={token.address} token={token} />
          ))}
        </section>
      </section>
    </div>
  );
};
