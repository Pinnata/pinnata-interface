import styled from "@emotion/styled";
import { Card } from "@theme-ui/components";
import { preset } from "../theme";

export const RowBetween = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

export const CenteredRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const InfoCard = styled(Card)`
  width: min(100%, 60rem);
  border-radius: 1rem;
  background-color: ${preset.colors.dahliaGreenLigher};
  boxshadow: "rgb(0 0 0 / 5%) 0px 16px 32px 0px";
  margin-bottom: 1rem;
`;
