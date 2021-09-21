import { COLLATERAL_TOKENS } from "src/config";
import { EarnEntry } from "src/pages/Earn/EarnEntry";
import { css } from "@emotion/react";
import { Flex, Text, Card } from "theme-ui";
import { SimpleTable } from "src/components/SimpleTable";
import EarnCard from "./EarnCard";

export const Earn = () => {
  return (
    <Flex sx={{ flexDirection: "column", alignItems: "center", width: "100%" }}>
      <Flex
        sx={{ gap: 15, flexDirection: "column", alignItems: "center", mb: 15 }}
      >
        <Text variant="title">Earn</Text>
        <Text variant="description" sx={{ textAlign: "center" }}>
          Lend assets for the highest yield.
        </Text>
      </Flex>
      {COLLATERAL_TOKENS.map((token) => (
        <EarnCard key={token.address} token={token} />
      ))}
      {/* <Card sx={{ width: "100%", maxWidth: "1000px", mt: "16px" }} py={4} px={3}>
        <SimpleTable>
        <thead>
          <tr>
            <th
              css={css`
                text-align: left !important;
              `}
            >
              <Text variant="bold">Asset</Text>
            </th>
            <th><Text variant="bold">APY</Text></th>
            <th><Text variant="bold">Total Supply</Text></th>
            <th><Text variant="bold">Total Borrow</Text></th>
            <th><Text variant="bold">Utilization</Text></th>
            <th><Text variant="bold">Balance</Text></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {COLLATERAL_TOKENS.map((token) => (
            <EarnEntry key={token.address} token={token}/>
          ))}
        </tbody>
      </SimpleTable>
      </Card> */}
    </Flex>
  );
};
