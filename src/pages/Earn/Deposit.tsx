/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import ImageCelo from '../../images/eth.png';
import Background from '../../images/logo.png';

const Deposit = () => {
  const [number, setNumber] = useState(0.07);
  return (
    <section sx={{ variant: 'cards.Deposit.Wrapper' }}>
      <h1 sx={{ variant: 'cards.Deposit.Header' }}>Deposit</h1>
      <article sx={{ variant: 'cards.Deposit.InfoCard' }}>
        <h2 sx={{ variant: 'cards.Deposit.InfoHeader' }}>Supply tokens</h2>
        <div sx={{ variant: 'cards.Deposit.InputContainer' }}>
          <div sx={{ variant: 'cards.Deposit.InputContainer.flex' }} className='flex'>
            <h2 sx={{ variant: 'cards.Deposit.Desc' }}>I’d like to supply</h2>
            <h3 sx={{ variant: 'cards.Deposit.Balance' }}>Balance 0.000000</h3>
          </div>
          <div sx={{ variant: 'cards.Deposit.Content' }}>
            <div sx={{ variant: 'cards.Deposit.Content.flex' }} className='flex'>
              <img sx={{ variant: 'cards.Deposit.Image' }} src={ImageCelo} alt='celo' />
            </div>
            <input sx={{ variant: 'cards.Deposit.Number' }} 
              value={number}
              onChange={(e: React.FormEvent<HTMLInputElement>) => setNumber((e.target as any).value)}
            ></input>
            <h3 sx={{ variant: 'cards.Deposit.Max' }}>MAX</h3>
          </div>
          <div sx={{ variant: 'cards.Deposit.Line' }} />
          <p sx={{ variant: 'cards.Deposit.Description' }}>
            You will recieve interest-bearing ETH (ibETH) balance
          </p>
          <div sx={{ variant: 'cards.Deposit.FlexImage' }}>
            <img src={Background} alt='background' />
          </div>
          <div sx={{ variant: 'cards.Deposit.FlexContainer' }}>
            <button sx={{ variant: 'cards.Deposit.Button' }}>CONFIRM</button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Deposit;