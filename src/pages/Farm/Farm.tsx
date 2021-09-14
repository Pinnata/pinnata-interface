import { FARMS } from "src/config";
import { FarmEntry } from "src/pages/Farm/FarmEntry";
import { css } from '@emotion/react';
import { Flex, Text, Card } from "theme-ui";
import { SimpleTable } from 'src/components/SimpleTable';

export const Farm = () => {
  return (
      <Flex sx={{flexDirection: "column", alignItems: "center", width: "100%"}}>
      <Flex sx={{gap: 15, flexDirection: "column", alignItems: "center", mb: 15}}>
        <Text variant="title">Farm</Text>
        <Text variant="description">Unlock leverage up to 5.5x.</Text>
      </Flex>
      <Card sx={{ width: "100%", maxWidth: "1000px", mt: "16px" }} py={4} px={3}>
        <SimpleTable>
        <thead>
          <tr>
            <th
              css={css`
                text-align: left !important;
              `}
            >
              
              <Text variant="bold">Pool</Text>
            </th>
            <th><Text variant="bold">Projected APY</Text></th>
            <th><Text variant="bold">Pool APY</Text></th>
            <th><Text variant="bold">Borrow APY</Text></th>
            <th><Text variant="bold">Max Leverage</Text></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {FARMS.map((farm) => (
              <FarmEntry key={farm.name} name={farm.name} apy={farm.apy} wrapper={farm.wrapper} spell={farm.spell} tokens={farm.tokens} lp={farm.lp} />
          ))}
        </tbody>
      </SimpleTable>
      </Card>
    </Flex>
  );
};
