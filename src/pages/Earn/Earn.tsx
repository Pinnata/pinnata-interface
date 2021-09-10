import { COLLATERAL_TOKENS } from "src/config"
import { EarnEntry } from "src/pages/Earn/EarnEntry"; 
import { css } from '@emotion/react';
import { Flex, Text, Card } from "theme-ui";
import { SimpleTable } from 'src/components/SimpleTable';

export const Earn = () => {
  return (
    <Flex sx={{flexDirection: "column", alignItems: "center", width: "100%"}}>
      <Text>Earn</Text>
      <Text>Lend assets for the highest yield.</Text>
      <Card sx={{ width: "100%", maxWidth: "1000px", mt: "16px" }} py={4} px={3}>
        <SimpleTable>
        <thead>
          <tr>
            <th
              css={css`
                text-align: left !important;
              `}
            >
              Asset
            </th>
            <th>APY</th>
            <th>Total Supply</th>
            <th>Total Borrow</th>
            <th>Utilization</th>
            <th>Balance</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {COLLATERAL_TOKENS.map((token) => (
            <EarnEntry key={token.address} token={token}/>
          ))}
        </tbody>
      </SimpleTable>
      </Card>
    </Flex>
  );
};
