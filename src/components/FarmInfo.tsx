import { PoolIcon } from "src/components/PoolIcon";
import { spellMap } from "src/config";
import { poolProps } from "src/pages/Farm/newFarm/NewFarm";

interface Props {
  props: poolProps;
}

export const FarmInfo: React.FC<Props> = (farm: Props) => {
  const { name, spell, tokens } = farm.props;
  return (
    <div className="flex items-center flex-col justify-center p-2">
      <PoolIcon tokens={tokens} />

      <p className="ml-2 font-bold tracking-tighter text-xl text-gray-800 text-center">
        {spellMap.get(spell)} {name}
      </p>
    </div>
  );
};
