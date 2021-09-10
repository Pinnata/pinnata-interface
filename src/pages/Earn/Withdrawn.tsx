/** @jsxImportSource theme-ui */

import React, { useState } from 'react';
import ImageCelo from '../../images/eth.png';
import Background from '../../images/logo.png';

const Withdrawn = () => {
  const [number, setNumber] = useState(0.07);
  return (
    <section sx={{ variant: 'cards.withdrawn.Wrapper' }} >
      <h1 sx={{ variant: 'cards.withdrawn.Header' }} >WITHDRAWN</h1>
      <article sx={{ variant: 'cards.withdrawn.InfoCard' }} >
        <h2 sx={{ variant: 'cards.withdrawn.InfoHeader' }} >Withdraw tokens</h2>
        <div sx={{ variant: 'cards.withdrawn.InputContainer' }} >
          <div sx={{ variant: 'cards.withdrawn.InputContainer.flex' }}  className='flex'>
            <h2 sx={{ variant: 'cards.withdrawn.Desc' }} >I’d like to withdraw</h2>
            <h3 sx={{ variant: 'cards.withdrawn.Balance' }} >Balance 0.000000</h3>
          </div>
          <div sx={{ variant: 'cards.withdrawn.Content' }} >
            <div sx={{ variant: 'cards.withdrawn.Content.flex' }} className='flex'>
              <img sx={{ variant: 'cards.withdrawn.Image' }}  src={ImageCelo} alt='celo' />
              <p>ibETH</p>
            </div>
            <input sx={{ variant: 'cards.withdrawn.Number' }} 
              value={number}
              onChange={(e: React.FormEvent<HTMLInputElement>) => setNumber((e.target as any).value)}
            ></input>
            <h3 sx={{ variant: 'cards.withdrawn.Max' }} >MAX</h3>
          </div>
          <div sx={{ variant: 'cards.withdrawn.Line' }}  />
          <p sx={{ variant: 'cards.withdrawn.Description' }} >You will recieve ETH balance</p>
          <div sx={{ variant: 'cards.withdrawn.FlexImage' }} >
            <img sx={{ variant: 'cards.withdrawn.FlexImage.img' }}  src={Background} alt='background' />
          </div>
          <div sx={{ variant: 'cards.withdrawn.FlexContainer' }} >
            <button sx={{ variant: 'cards.withdrawn.Button' }} >CONFIRM</button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Withdrawn;