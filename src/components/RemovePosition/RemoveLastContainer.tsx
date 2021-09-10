import React from 'react';
import { useGlobalContext } from '../../context/context';
import styled from 'styled-components';
import Image1 from '../../images/first.png';
import Image2 from '../../images/eth.png';
import Image3 from '../../images/third.png';

const RemoveLastContainer = () => {
  const  handleBackIndexRemove  = useGlobalContext();
  const FirstLineProps:object={
    borTop: true,
}

// console.log(`the object is ${Object.values(FirstLineProps) }`);


  return (
    <InfoCard>
      <InfoHeader>Your balance after payback</InfoHeader>
      <FirstLine />
      <Desc>1. Remove Liquidity and receive</Desc>
      <Flex>
        <Container>
          <img src={Image1} alt='celo' />
          <h2>CELO</h2>
          <h3>14.70</h3>
        </Container>
        <Container>
          <img src={Image2} alt='eth' />
          <h2>wETH</h2>
          <h3>2.05</h3>
        </Container>
      </Flex>
      <Desc>2. Swap and payback loan</Desc>
      <Flex>
        <Container>
          <img src={Image1} alt='celo' />
          <h2>CELO</h2>
          <h3>14.70</h3>
        </Container>
        <Container>
          <img src={Image2} alt='eth' />
          <h2>wETH</h2>
          <h3>2.05</h3>
        </Container>
      </Flex>
      <Desc>2. Receive your harvest</Desc>
      <Flex>
        <Container>
          <img src={Image1} alt='celo' />
          <h2>CELO</h2>
          <h3>4.82</h3>
        </Container>
        <Container>
          <img src={Image2} alt='eth' />
          <h2>wETH</h2>
          <h3>0.23</h3>
        </Container>
      </Flex>
      <Container>
        <img src={Image3} alt='eth' />
        <h2>UBE-LP</h2>
        <h3>2.05</h3>
      </Container>
      <FirstLine {...FirstLineProps}/>
      <Control>
        <Back onClick={handleBackIndexRemove}>BACK</Back>
        <Button>NEXT</Button>
      </Control>
    </InfoCard>
  );
};

export default RemoveLastContainer;

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
  // line removed
  /*({ last }) => (last ? 'margin-bottom: 1.5rem;' : null)*/
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
  margin: 1.5rem 0 1rem;
`;

const Desc = styled.p`
  color: var(--white);
  font-size: 16px;
  font-weight: 400;
  margin: 1rem 0 1rem 2rem;
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
  ${(top) => (top ? 'margin-top: 2rem;' : null)}
`;

const Back = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--main-color);
  margin-left: 1rem;
  cursor: pointer;
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
  width: calc(100% - 4rem);
  margin: 0 auto;
  padding: 1.5rem 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
