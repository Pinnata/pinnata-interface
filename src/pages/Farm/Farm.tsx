import { FARMS } from "src/config";
import { FarmEntry } from "src/pages/Farm/FarmEntry";

export const Farm = () => {
  return (
    <div className="">
      <section className="max-w-screen-xl mx-auto">
        <div className="w-full text-center md:pb-0 pb-2 pt-2">
          <h2 className="tracking-tightest font-bold text-gray-700 text-5xl my-2">
            Unlock the highest leverage on Celo.{" "}
          </h2>
        </div>

        <section className="md:flex md:m-4 md:justify-center w-full md:flex-wrap">
          {FARMS.map((farm, index) => (
            <FarmEntry
              key={farm.name + index}
              name={farm.name}
              apy={farm.apy}
              wrapper={farm.wrapper}
              spell={farm.spell}
              tokens={farm.tokens}
              lp={farm.lp}
              rewards={farm.rewards}
            />
          ))}
        </section>
      </section>
    </div>
  );
};

export default Farm;
