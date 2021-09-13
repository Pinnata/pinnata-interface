import { PoolIcon } from "../components/PoolIcon";
import { Flex } from "theme-ui";
import { spellMap } from "../config"
import {poolProps} from "../pages/Farm/newFarm/NewFarm";


interface Props {
   props: poolProps
  }

export const FarmInfo: React.FC<Props> = (farm: Props) => {
  const {name, wrapper, spell, tokens} = farm.props;
  return (
    <Flex sx={{ alignItems: "center", gap: "8px" }}>
        <PoolIcon tokens={tokens} />
        <Flex sx={{ flexDirection: "column", gap: "8px" }}>
            {wrapper ? 
            <span>Yield Farming</span> :
            <span>Liquidity Providing</span>
            }
            <span>{spellMap.get(spell)} {name}</span>
        </Flex>
    </Flex>
  );
};
