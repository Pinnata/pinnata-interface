import React, { useState } from 'react';
import { useGlobalContext } from '../../context/context';
import styled from 'styled-components';
import Image1 from '../../images/first.png';
import ImageCelo from '../../images/eth.png';
import ImageUBE from '../../images/usdt.png';

const FarmSecondContainer = () => {
  const handleBackIndexFarm = useGlobalContext(); const handleIndexFarm  = useGlobalContext();
  const [firstRange, setFirstRange] = useState(0.25);
  const [secondRange, setSecondRange] = useState(250);
  return (
    <Wrapper>
      <Header>FARM</Header>
      <InfoCard>
        <InfoHeader>I'd like to supply</InfoHeader>
        <FirstLine />
        <Container>
          <img src={Image1} alt='celo' />
          <h2>CELO</h2>
          <h3>33.10</h3>
        </Container>
        <Borrows>Borrows</Borrows>
        <Flex>
          <h3>Est. Debt Ratio:</h3>
          <p>65.79/100.00</p>
        </Flex>
        <Flex>
          <h3>Leverage:</h3>
          <p className='color'>1.40x</p>
        </Flex>
        <FlexContent>
          <img src={ImageCelo} alt='eth' />
          <div className='range'>
            <input
              type='range'
              min='0'
              max='1'
              step='0.01'
              value={firstRange}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setFirstRange((e.target as any).value);
                (e.target as any).style.backgroundSize = `${firstRange * 100}% 100%`;
              }}
            />
            <FlexContainer>
              <p>0</p>
              <p>.25</p>
              <p>.50</p>
              <p>.75</p>
              <p>1</p>
            </FlexContainer>
          </div>
          <div className='container'>
            <h3>{firstRange}</h3>
            <p>CELO</p>
          </div>
        </FlexContent>
        <FlexContent>
          <img src={ImageUBE} alt='ube' />
          <div className='range'>
            <input
              type='range'
              min='0'
              max='1000'
              step='1'
              value={secondRange}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setSecondRange((e.target as any).value);
                (e.target as any).style.backgroundSize = `${secondRange / 10}% 100%`;
              }}
            />
            <FlexContainer>
              <p>0</p>
              <p>250</p>
              <p>500</p>
              <p>750</p>
              <p>1000</p>
            </FlexContainer>
          </div>
          <div className='container'>
            <h3>{secondRange}</h3>
            <p>UBE</p>
          </div>
        </FlexContent>
        <Line />
        <Control>
          <Back onClick={handleBackIndexFarm}>BACK</Back>
          <Button onClick={handleIndexFarm}>Next</Button>
        </Control>
      </InfoCard>
    </Wrapper>
  );
};

export default FarmSecondContainer;

const FlexContent = styled.div`
  width: calc(100% - 4rem);
  margin: 1.5rem auto 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 28px;
    height: auto;
    margin-right: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .range {
    width: 50%;
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
    background-size: 25% 100%;
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
    width: 35%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
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

const Container = styled.div`
  width: 180px;
  height: 50px;
  background: #1c2127;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1rem;
  margin-left: 2rem;
  img {
    width: 31px;
    height: auto;
  }
  h2 {
    font-size: 16px;
    color: var(--main-color);
    font-weight: 400;
  }
  h3 {
    font-size: 16px;
    font-weight: 700;
    color: var(--main-color);
  }
`;

const Borrows = styled.h2`
  font-weight: 400;
  font-size: 20px;
  margin: 0;
  padding: 0;
  color: #72828a;
  margin-bottom: 0.5rem;
  margin-left: 2rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  margin: 0;
  padding: 0;
  margin-left: 2rem;
  &:last-of-type {
    padding-bottom: 1rem;
  }
  h3 {
    font-weight: 600;
    font-size: 16px;
    color: var(--white);
    margin: 0;
    padding: 0;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    color: var(--white);
    margin: 0;
    padding: 0;
  }
  .color {
    color: var(--main-color);
  }
`;

const Wrapper = styled.section`
  width: 45vw;
  display: block;
  margin: 3rem 0 6rem 7.5vw;
  padding-bottom: 3rem;
`;

const Header = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: var(--main-color);
  padding: 0;
  margin: 0;
  margin-bottom: 2rem;
`;

const InfoCard = styled.article`
  width: 100%;
  min-height: 40vh;
  display: block;
  background: var(--third-color);
  border-radius: 5px;
  box-shadow: 0px 0px 12px rgba(128, 255, 219, 0.36);
`;

const InfoHeader = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: var(--main-color);
  padding: 0;
  padding-left: 2rem;
  padding-top: 1rem;
  margin: 2rem 0;
`;

const FirstLine = styled.div`
  width: calc(100% - 4rem);
  height: 1px;
  /* background: #72828a25; wrong code*/
  margin: -1rem auto 0.5rem;
`;
const Line = styled.div`
  width: calc(100% - 2rem);
  height: 1px;
  /* background: #72828a25; wrong code*/
  margin: -1rem auto 0.5rem;
`;

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
  width: calc(100% - 2rem);
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Back = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--main-color);
  margin-left: 1rem;
  cursor: pointer;
`;
