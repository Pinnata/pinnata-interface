import {
  Container, 
  Title, 
  Description,
  Wrapper,
  Background,
  CardContainer,
} from "../../components/MainPages";
import Image from '../../images/background.png';
import { FARMS } from "../../config";
import { SimpleTable } from "../../components/SimpleTable";
import { css } from "@emotion/react";
import { FarmEntry } from "../../pages/Farm/FarmEntry";

export const Farm = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Farm</Title>
        <Description>
          Unlock leverage up to <span>2.5x</span>
        </Description>
      </Container>
      <CardContainer>
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
              <th></th>
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
      </CardContainer>
      <Background src={Image} alt='Background Logo' />
    </Wrapper>
  );
};
