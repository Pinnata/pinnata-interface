import React from 'react';
import { EarnData } from '../../Data/EarnData';
import { Link } from 'react-router-dom';
import Image from '../../images/background.png';

import {
  Wrapper,
  Container,
  Title,
  Description,
  CardContainer,
  SecondTitle,
  Flex,
  Button,
  InfoContainer,
  Header,
  Item,
  Background,
} from './EarnStyles';

const Earn = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Earn</Title>
        <Description>Lend assets for the highest yield.</Description>
      </Container>
      <CardContainer>
        <SecondTitle>All active pools</SecondTitle>
        <Flex>
          <Button className='active'>All</Button>
        </Flex>
        <InfoContainer>
          <Header>
            <h2>Pool</h2>
            <h2 className='center'>Projected APY %</h2>
            <h2 className='center'>Total Supply</h2>
            <h2 className='center'>Total Borrow</h2>
            <h2 className='center'>Utilization</h2>
            <h2 className='center'>Balance</h2>
            <div></div>
          </Header>
          {EarnData.map((item, index) => {
            return (
              <Item key={index}>
                <div className='flexFirst'>
                  <img src={item.image1} alt='eth' className='image' />
                  <h2>{item.firstTitle}</h2>
                </div>
                <div className='centerMiddle thin'>{item.apy}</div>
                <div className='centerMiddle thin'>{item.supply}</div>
                <div className='centerMiddle thin'>{item.borrow}</div>
                <div className='centerMiddle thin'>{item.utilization}</div>
                <div className='centerMiddle thin'>{item.balance}</div>
                <div className='end'>
                  <Link to='deposit'>Supply</Link>
                  <Link to='withdrawn'>Withdrawn</Link>
                </div>
              </Item>
            );
          })}
        </InfoContainer>
      </CardContainer>
      <Background src={Image} alt='Background Logo' />
    </Wrapper>
  );
};

export default Earn;
