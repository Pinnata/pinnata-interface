import React, { useState } from 'react';
import { useGlobalContext } from '../../context/context';
import styled from 'styled-components';
import Image1 from '../../images/first.png';
import Image2 from '../../images/eth.png';

const RemoveFirstContainer = () => {
  const  handleIndexRemove = useGlobalContext();
  const [range, setRange] = useState(55);

  return (
    <InfoCard>
      <InfoHeader>Your Position Balance</InfoHeader>
      <FirstLine />
      <Flex>
        <Container>
          <img src={Image1} alt='celo' />
          <h2>CELO</h2>
          <h3>33.10</h3>
        </Container>
        <Container>
          <img src={Image2} alt='eth' />
          <h2>wETH</h2>
          <h3>5.12</h3>
        </Container>
      </Flex>
      <FirstLine />
      <Desc>I'd like to remove</Desc>
      <Content>
        <div className='range'>
          <input
            type='range'
            min='0'
            max='100'
            step='1'
            value={range}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setRange((e.target as any).value);
              (e.target as any).style.backgroundSize = `${range}% 100%`;
            }}
          />
          <FlexContainer>
            <p>0%</p>
            <p>25%</p>
            <p>50%</p>
            <p>75%</p>
            <p>100%</p>
          </FlexContainer>
        </div>
        <div className='container'>
          <h3>{range}%</h3>
        </div>
      </Content>
      <FirstLine />
      <Control>
        <div></div>
        <Button onClick={handleIndexRemove}>NEXT</Button>
      </Control>
    </InfoCard>
  );
};

export default RemoveFirstContainer;

const Button = styled.button`
  background: #070a0e;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  box-shadow: 0px 0px 12px rgba(128, 255, 219, 0.36);
  color: var(--main-color);
  padding: 12px 25px;
  cursor: pointer;
`;

const Control = styled.div`
  width: calc(100% - 4rem);
  margin: 0 auto;
  padding: 1.5rem 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlexContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 16px;
    font-weight: 400;
    color: #72828a;
  }
`;

const Content = styled.div`
  width: calc(100% - 4rem);
  margin: 1.5rem auto 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .range {
    width: 72%;
  }
  input {
    width: 100%;
    -webkit-appearance: none;
    height: 5px;
    border-radius: 50px;
    /* background: #80ffdb25; wrong code*/
    cursor: pointer;
    position: relative;
    background-image: linear-gradient(var(--main-color), var(--main-color));
    background-size: 55% 100%;
    background-repeat: no-repeat;
    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track:active {
      background-color: var(--main-color);
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 17px;
      width: 17px;
      border-radius: 50%;
      background: var(--main-color);
    }
  }
  .track {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 12px;
    background: var(--main-color);
    border-radius: 50px;
  }
  .container {
    width: 25%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid var(--fourth-color);
    h3,
    p {
      font-size: 16px;
      color: var(--white);
      font-weight: 400;
    }
  }
`;

const Desc = styled.p`
  color: var(--white);
  font-size: 16px;
  font-weight: 400;
  margin: 1.5rem 0 0.5rem 2rem;
`;

const Container = styled.div`
  width: 180px;
  height: 47px;
  background: #1c2127;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 2rem;
  img {
    width: 31px;
    height: auto;
  }
  h2 {
    font-size: 16px;
    color: var(--main-color);
    font-weight: 400;
    margin-left: -0.7rem;
  }
  h3 {
    font-size: 16px;
    font-weight: 700;
    color: var(--main-color);
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  height: 47px;
  margin: 1.5rem 0;
`;

const InfoCard = styled.article`
  width: 45vw;
  min-height: 40vh;
  margin-left: 7.5vw;
  display: block;
  background: var(--third-color);
  border-radius: 5px;
  box-shadow: 0px 0px 12px rgba(128, 255, 219, 0.36);
  margin-bottom: 7rem;
`;

const InfoHeader = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: var(--main-color);
  padding: 0;
  padding-left: 2rem;
  padding-top: 1rem;
  margin: 1.5rem 0;
`;

const FirstLine = styled.div`
  width: calc(100% - 4rem);
  height: 1px;
  /* background: #72828a25; wrong code*/
  margin: 0.5rem auto;
`;
