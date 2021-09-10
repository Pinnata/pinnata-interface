import React from 'react';
import { useGlobalContext } from '../../context/context';
import styled from 'styled-components';

const FarmThirdContainer = () => {
  const handleBackIndexFarm = useGlobalContext(); const handleIndexFarm  = useGlobalContext();

  return (
    <Wrapper>
      <Header>FARM</Header>
      <InfoCard>
        <InfoHeader>Position Breakdown</InfoHeader>
        <FirstLine />
        <Flex>
          <h3>Debt Ratio</h3>
          <p>
            10.59%
            <span></span>
          </p>
        </Flex>
        <Flex>
          <h3>Total Leverage</h3>
          <p>1.40x</p>
        </Flex>
        <Flex>
          <h3>Current Balance</h3>
          <p>$2516.21</p>
        </Flex>
        <Flex>
          <h3>Total Supply</h3>
          <p>$91.78</p>
        </Flex>
        <Flex>
          <h3>Total Debt</h3>
          <p>$413.95</p>
        </Flex>
        <Flex>
          <h3>Est. Assets in Position</h3>
          <p>$2901.74</p>
        </Flex>
        <Line />
        <Flex>
          <h3>Trading Fee APY</h3>
          <p>15.12%</p>
        </Flex>
        <Flex>
          <h3>Borrow APY</h3>
          <p>-2.80%</p>
        </Flex>
        <Flex>
          <h3>Total APR</h3>
          <p>22.63%</p>
        </Flex>
        <Line />
        <Flex>
          <h3>Slippage Tolerance</h3>
          <p>1%</p>
        </Flex>
        <Flex>
          <h3>Est. Prive Impact On Position Value</h3>
          <p>.0130%</p>
        </Flex>
        <Flex>
          <h3>Est. Price Impact on User's Supplied Value</h3>
          <p>-.00%</p>
        </Flex>
        <Line />
        <CenterPhrase>
          *Price impact refers to the effect that a trade has on the market,
          thus causing a slip in price of assets during the trade.
        </CenterPhrase>
        <Line />
        <Control>
          <Back onClick={handleBackIndexFarm}>BACK</Back>
          <Button onClick={handleIndexFarm}>Next</Button>
        </Control>
      </InfoCard>
    </Wrapper>
  );
};

export default FarmThirdContainer;

const CenterPhrase = styled.p`
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  width: calc(100% - 4rem);
  margin: 0 auto;
  color: var(--fourth-color);
  padding: 1rem 0;
`;

const Flex = styled.div`
  width: calc(100% - 4rem);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  h3 {
    color: var(--fourth-color);
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    color: var(--white);
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    span {
      width: 58px;
      height: 11px;
      border-radius: 50px;
      background: #72828a;
      position: relative;
      margin-left: 1rem;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50px;
        background: var(--main-color);
        width: 35px;
        height: 11px;
      }
    }
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
  /* background: #72828a25; wrong code */
  margin: -1rem auto 0.5rem;
`;
const Line = styled.div`
  width: calc(100% - 4rem);
  height: 1px;
  /* background: #72828a25; wrong code */
  margin: 0.75rem auto;
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
