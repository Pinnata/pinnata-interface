/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { useGlobalContext } from '../../context/context';
import ImageCelo from '../../images/eth.png';
import ImageUBE from '../../images/usdt.png';

const SecondContainer = () => {
  const handleIndexAdd = useGlobalContext(); const handleBackIndexAdd = useGlobalContext();
  const [firstNumber, setFirstNumber] = useState('0.00');
  const [secondNumber, setSecondNumber] = useState('0.00');
  const [thirdNumber, setThirdNumber] = useState('0.00');
  return (
    <section sx={{ variant: 'cards.secondContainer.Wrapper' }} >
      <article sx={{ variant: 'cards.secondContainer.InfoCard' }} >
        <h2 sx={{ variant: 'cards.secondContainer.InfoHeader' }} >I d like to supply</h2>
        <div sx={{ variant: 'cards.secondContainer.InputContainer' }} >
          <h3  sx={{ variant: 'cards.secondContainer.Balance' }} >Balance 0.000000</h3>
          <div  sx={{ variant: 'cards.secondContainer.Content' }} >
            <div  sx={{ variant: 'cards.secondContainer.Flex' }} >
              <img sx={{ variant: 'cards.secondContainer.Image' }}  src={ImageCelo} alt='celo' />
              <h4  sx={{ variant: 'cards.secondContainer.Coin' }} >CELO</h4>
            </div>
            <input sx={{ variant: 'cards.secondContainer.Number' }} 
              value={firstNumber}
              onChange={(e) => setFirstNumber(e.target.value)}
            ></input>
            <h3  sx={{ variant: 'cards.secondContainer.Max' }} >MAX</h3>
          </div>
        </div>
        <div sx={{ variant: 'cards.secondContainer.InputContainer' }} >
          <h3  sx={{ variant: 'cards.secondContainer.Balance' }} >Balance 0.000000</h3>
          <div  sx={{ variant: 'cards.secondContainer.Content' }} >
            <div sx={{ variant: 'cards.secondContainer.Flex' }} >
              <img sx={{ variant: 'cards.secondContainer.Image' }}  src={ImageUBE} alt='celo' />
              <h4  sx={{ variant: 'cards.secondContainer.Coin' }} >UBE</h4>
            </div>
            <input sx={{ variant: 'cards.secondContainer.Number' }} 
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
            ></input>
            <h3  sx={{ variant: 'cards.secondContainer.Max' }} >MAX</h3>
          </div>
        </div>
        <div sx={{ variant: 'cards.secondContainer.InputContainer' }} >
          <div sx={{ variant: 'cards.secondContainer.FlexContent' }} >
            <h3 sx={{ variant: 'cards.secondContainer.FlexContent.h3' }}>Supply LP Token</h3>
            <h3 sx={{ variant: 'cards.secondContainer.Balance' }} >Balance 0.000000</h3>
          </div>
          <div  sx={{ variant: 'cards.secondContainer.Content' }} >
            <div sx={{ variant: 'cards.secondContainer.Flex' }} >
              <img sx={{ variant: 'cards.secondContainer.Image' }}  src={ImageUBE} alt='celo' />
              <h4  sx={{ variant: 'cards.secondContainer.Coin' }} >UBE-LP</h4>
            </div>
            <input sx={{ variant: 'cards.secondContainer.Number' }} 
              value={thirdNumber}
              onChange={(e) => setThirdNumber(e.target.value)}
            ></input>
            <h3  sx={{ variant: 'cards.secondContainer.Max' }} >MAX</h3>
          </div>
        </div>
        <div sx={{ variant: 'cards.secondContainer.Line' }} />
        <div sx={{ variant: 'cards.secondContainer.Control' }}>
          <p sx={{ variant: 'cards.secondContainer.Back' }}  onClick={handleBackIndexAdd}>Back</p>
          <button sx={{ variant: 'cards.secondContainer.Button' }} onClick={handleIndexAdd}>Next</button>
        </div>
      </article>
    </section>
  );
};

export default SecondContainer;
