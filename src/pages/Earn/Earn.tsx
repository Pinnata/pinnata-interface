import React from 'react';
import Image from '../../images/background.png';
import { COLLATERAL_TOKENS } from "../../config"
import { EarnEntry } from "./EarnEntry"; 
import { css } from '@emotion/react';
import {
  Container, 
  Title, 
  Description,
  Wrapper, 
  Background,
  CardContainer,
} from "../../components/MainPages";
import { SimpleTable } from '../../components/SimpleTable';

const Earn = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Earn</Title>
        <Description>Lend assets for the highest yield.</Description>
      </Container>
      <CardContainer>
        {/* <InfoContainer> */}
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
        {/* </InfoContainer> */}
      </CardContainer>
      <Background src={Image} alt='Background Logo' />
    </Wrapper>
  );
};

export default Earn;
