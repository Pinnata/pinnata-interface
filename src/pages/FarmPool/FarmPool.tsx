/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { FarmPoolData } from '../../Data/FarmPoolData';
import Image from '../../images/background.png';
import { Link } from 'react-router-dom';
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
} from './FarmPoolStyles';

const FarmPool = () => {
  const [all, setAll] = useState(true);
  const [farming, setFarming] = useState(false);
  const [liquidity, setLiquidity] = useState(false);

  function handleClick(e: React.FormEvent<HTMLInputElement>) {
    if ((e.target as any).innerHTML === 'All') {
      setAll(true);
      setFarming(false);
      setLiquidity(false);
    } else if ((e.target as any).innerHTML === 'Yield Farming') {
      setAll(false);
      setFarming(true);
      setLiquidity(false);
    } else if ((e.target as any).innerHTML === 'Liquidity Providing') {
      setAll(false);
      setFarming(false);
      setLiquidity(true);
    }
  }
  return (
    <Wrapper>
      <Container>
        <Title>FARM POOLS</Title>
        <Description>
          Unlock leverage up to <span>2.5x</span>
        </Description>
      </Container>
      <CardContainer>
        <SecondTitle>All active pools</SecondTitle>
        <Flex>
          <Button className={all ? 'active' : ''} onClick={(event:any)=>handleClick(event)}>
            All
          </Button>
          <Button className={farming ? 'active' : ''} onClick={(event:any)=>handleClick(event)}>
            Yield Farming
          </Button>
          <Button className={liquidity ? 'active' : ''} onClick={(event:any)=>handleClick(event)}>
            Liquidity Providing
          </Button>
        </Flex>
        <InfoContainer>
          <Header>
            <h2>Pool</h2>
            <h2>Projected APY %</h2>
            <h2 className='center'>Pool APR</h2>
            <div></div>
            <h2>Borrow APR</h2>
            <h2>Max Leverage</h2>
            <div></div>
          </Header>
          {FarmPoolData.map((item, index) => {
            return (
              <Item key={index}>
                <div className='flexFirst'>
                  <img src={item.image1} alt='alt' className='image' />
                  <div className='block'>
                    <h3>{item.firstTitle}</h3>
                    <h2>{item.coins}</h2>
                  </div>
                </div>
                <div className='centerMiddle thin'>{item.percentage}</div>
                <div className='centerMiddle thin'>
                  {item.percentageDecimal}
                </div>
                <div className='flex height'>
                  <div className='block'>
                    {/* <h3>{item.farming}</h3> */}
                    <h3>{item.fees}</h3>
                    <h3>{item.alpha}</h3>
                  </div>
                  <div className='block left'>
                    <h2>{item.decimal}</h2>
                    <h2>{item.decimal}</h2>
                    <h2>{item.decimal}</h2>
                  </div>
                </div>
                <div className='flexColumn'>
                  <div className='flex margin'>
                    <img src={item.image2} alt='eth' />
                    <h2>{item.percentageDecimal}</h2>
                  </div>
                  <div className='flex'>
                    <img src={item.image3} alt='eth' />
                    <h2>{item.percentageDecimal}</h2>
                  </div>
                </div>
                <div className='centerMiddle large'>{item.times}</div>
                <div className='end'>
                  <Link to='/farmpool/farm'>FARM</Link>
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

export default FarmPool;
