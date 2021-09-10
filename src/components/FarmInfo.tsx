import { PoolIcon } from "src/components/PoolIcon";
import { Flex, Text } from "theme-ui";
import { spellMap } from "src/config"
import {poolProps} from "src/pages/Farm/newFarm/NewFarm";


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
            <Text>Yield Farming</Text> :
            <Text>Liquidity Providing</Text>
            }
            <Text>{spellMap.get(spell)} {name}</Text>
        </Flex>
    </Flex>
  );
};
