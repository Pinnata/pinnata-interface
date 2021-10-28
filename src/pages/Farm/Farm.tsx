import { FARMS } from "src/config";
import { FarmEntry } from "src/pages/Farm/FarmEntry";

export const Farm = () => {
  return (
    <div className="">
      <section className="max-w-screen-xl mx-auto">
        <div className="w-full md:pt-8 text-center md:pb-0 pb-2 pt-2">
          <h1 className="uppercase tracking-widest font-bold md:text-5xl text-3xl text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-800">
            Farm
          </h1>
          <h2 className="tracking-tightest font-bold text-gray-600 md:text-3xl text-xl">
            Unlock the highest leverage on Celo.
          </h2>
        </div>

        <section className="md:flex md:m-4 md:justify-center w-full md:flex-wrap">
          {FARMS.map((farm) => (
            <FarmEntry
              key={farm.name}
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
