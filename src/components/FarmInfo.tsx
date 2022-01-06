import { PoolIcon } from "src/components/PoolIcon";
import { Farm } from "src/config";

interface Props {
  props: Farm;
}

export const FarmInfo: React.FC<Props> = (farm: Props) => {
  const { name, tokens, type } = farm.props;
  return (
    <div className="flex items-center flex-col justify-center p-2">
      <PoolIcon tokens={tokens} />

      <p className="ml-2 font-bold tracking-tighter text-xl text-gray-800 text-center">
        {type} {name}
      </p>
    </div>
  );
};
