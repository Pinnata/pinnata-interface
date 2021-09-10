import Image from 'src/images/background.png';
import { FARMS } from "src/config";
import { FarmEntry } from "src/pages/Farm/FarmEntry";
import { css } from '@emotion/react';
import { Flex, Text, Card } from "theme-ui";
import { SimpleTable } from 'src/components/SimpleTable';

export const Farm = () => {
  return (
      <Flex sx={{flexDirection: "column", alignItems: "center", width: "100%"}}>
      <Text>Farm</Text>
      <Text>Unlock leverage up to 2.5x</Text>
      <Card sx={{ width: "100%", maxWidth: "1000px", mt: "16px" }} py={4} px={3}>
        <SimpleTable>
        <thead>
          <tr>
            <th
              css={css`
                text-align: left !important;
              `}
            >
              Pool
            </th>
            <th>Projected APY</th>
            <th>Pool APY</th>
            <th>Borrow APY</th>
            <th>Max Leverage</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {FARMS.map((farm) => (
              <FarmEntry key={farm.name} name={farm.name} wrapper={farm.wrapper} spell={farm.spell} tokens={farm.tokens} lp={farm.lp} />
          ))}
        </tbody>
      </SimpleTable>
      </Card>
    </Flex>
  );
};
