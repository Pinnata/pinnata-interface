/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { useGlobalContext } from '../../context/context';
import styled from 'styled-components';
import ImageCelo from '../../images/eth.png';
import ImageUBE from '../../images/usdt.png';
const FarmFirstContainer = () => {
  const  handleIndexFarm  = useGlobalContext();
  const [firstNumber, setFirstNumber] = useState('0.00');
  const [secondNumber, setSecondNumber] = useState('0.00');
  const [thirdNumber, setThirdNumber] = useState('0.00');
  return (
    <section sx={{ variant: 'cards.farmFirstContainer.Wrapper' }} >
      <h1 sx={{ variant: 'cards.farmFirstContainer.Header' }} >FARM</h1>
      <article sx={{ variant: 'cards.farmFirstContainer.InfoCard' }} >
        <h2 sx={{ variant: 'cards.farmFirstContainer.InfoHeader' }} >I d like to supply</h2>
        <div  sx={{ variant: 'cards.farmFirstContainer.InputContainer' }} >
          <h3  sx={{ variant: 'cards.farmFirstContainer.Balance' }} >Balance 0.000000</h3>
          <div  sx={{ variant: 'cards.farmFirstContainer.Content' }} >
            <div  sx={{ variant: 'cards.farmFirstContainer.Flex' }} >
              <img  sx={{ variant: 'cards.farmFirstContainer.Image' }}  src={ImageCelo} alt='celo' />
              <h4  sx={{ variant: 'cards.farmFirstContainer.Coin' }} >CELO</h4>
            </div>
            <input  sx={{ variant: 'cards.farmFirstContainer.Number' }}  
              value={firstNumber}
              onChange={(e) => setFirstNumber(e.target.value)}
            ></input>
            <h3  sx={{ variant: 'cards.farmFirstContainer.Max' }} >MAX</h3>
          </div>
        </div>
        <div  sx={{ variant: 'cards.farmFirstContainer.InputContainer' }} >
          <h3  sx={{ variant: 'cards.farmFirstContainer.Balance' }} >Balance 0.000000</h3>
          <div  sx={{ variant: 'cards.farmFirstContainer.Content' }} >
            <div  sx={{ variant: 'cards.farmFirstContainer.Flex' }} >
              <img  sx={{ variant: 'cards.farmFirstContainer.Image' }}  src={ImageUBE} alt='celo' />
              <h4  sx={{ variant: 'cards.farmFirstContainer.Coin' }} >UBE</h4>
            </div>
            <input  sx={{ variant: 'cards.farmFirstContainer.Number' }}  
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
            ></input>
            <h3  sx={{ variant: 'cards.farmFirstContainer.Max' }} >MAX</h3>
          </div>
        </div>
        <div  sx={{ variant: 'cards.farmFirstContainer.InputContainer' }} >
          <FlexContent>
            <h3>Supply LP Token</h3>
            <h3  sx={{ variant: 'cards.farmFirstContainer.Balance' }} >Balance 0.000000</h3>
          </FlexContent>
          <div  sx={{ variant: 'cards.farmFirstContainer.Content' }} >
            <div  sx={{ variant: 'cards.farmFirstContainer.Flex' }} >
              <img  sx={{ variant: 'cards.farmFirstContainer.Image' }}  src={ImageUBE} alt='celo' />
              <h4  sx={{ variant: 'cards.farmFirstContainer.Coin' }} >UBE-LP</h4>
            </div>
            <input  sx={{ variant: 'cards.farmFirstContainer.Number' }}  
              value={thirdNumber}
              onChange={(e) => setThirdNumber(e.target.value)}
            ></input>
            <h3  sx={{ variant: 'cards.farmFirstContainer.Max' }} >MAX</h3>
          </div>
        </div>
        <div sx={{ variant: 'cards.farmFirstContainer.Line' }}  />
        <div sx={{ variant: 'cards.farmFirstContainer.Control' }} >
          <button sx={{ variant: 'cards.farmFirstContainer.Button' }}  onClick={handleIndexFarm}>Next</button>
        </div>
      </article>
    </section>
  );
};

export default FarmFirstContainer;
const FlexContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  h3 {
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: var(--white);
    font-weight: 400;
    &:last-of-type {
      color: var(--fourth-color);
      font-weight: 700;
    }
  }
`;
