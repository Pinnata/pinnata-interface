/** @jsxImportSource theme-ui */
import React from 'react';
import { InvestimentHistory, PositionData } from '../../Data/PositionData';
import BackgroundImage from '../../images/background.png';

const Position = () => {
  return (
    <section sx={{ variant: 'cards.position.Wrapper' }} >
      <img sx={{ variant: 'cards.position.Background' }}  src={BackgroundImage} alt='background' />
      <h1 sx={{ variant: 'cards.position.Header' }} >POSITIONS</h1>
      <p sx={{ variant: 'cards.position.Desc' }} >Manage your position with ease.</p>
      <button sx={{ variant: 'cards.position.Button' }} >
        <h3>Portfolio Value</h3>
        <p>$1,320,282</p>
      </button>
      <div sx={{ variant: 'cards.position.InfoContainer' }} >
        <div sx={{ variant: 'cards.position.HeaderContainer' }} >
          <h2>Pool</h2>
          <h2 className='center'>Borrow</h2>
          <h2 className='center'>Current Value</h2>
          <h2 className='center'>Debt Ratio</h2>
          <h2 className='center'>Apy</h2>
          <div></div>
        </div>
        {PositionData.map((item, index) => {
          return (
            <div sx={{ variant: 'cards.position.Item' }}  key={index}>
              <div className='flexFirst'>
                <img src={item.img} alt={item.title} className='image' />
                <h2>{item.title}</h2>
              </div>
              <div className='centerMiddle thin'>{item.borrow}</div>
              <div className='centerMiddle thin'>{item.value}</div>
              <div className='centerMiddle thin'>{item.debt}</div>
              <div className='centerMiddle thin'>{item.apy}</div>
              <div className='end'>
                <button className='small'>ADD</button>
                <button className='large'>REMOVE</button>
                <button className='small'>CLOSE</button>
                <button className='large special'>HARVEST</button>
              </div>
            </div>
          );
        })}
      </div>
      <h2 sx={{ variant: 'cards.position.SecondHeader' }} >Investment History</h2>
      <div sx={{ variant: 'cards.position.InfoContainerSecond' }} >
        <div sx={{ variant: 'cards.position.HeaderInvestment' }} >
          <h2 sx={{ variant: 'cards.position.HeaderInvestment.text' }} >Caller Address</h2>
          <h2 sx={{ variant: 'cards.position.HeaderInvestment.center' }} className='center'>Tokens Invested</h2>
          <h2 sx={{ variant: 'cards.position.HeaderInvestment.center' }} className='center'>Timestamp</h2>
          <div></div>
        </div>
        {InvestimentHistory.map((item, index) => {
          return (
            <div sx={{ variant: 'cards.position.ItemInvestment' }} key={index}>
              <div sx={{ variant: 'cards.position.ItemInvestment.flexFirst' }} className='flexFirst'>
                <img src={item.img} sx={{ variant: 'cards.position.ItemInvestment.image' }}  alt='address' className='image' />
                <h2 sx={{ variant: 'cards.position.ItemInvestment.flexFirst.h2' }} >{item.address}</h2>
              </div>
              <div sx={{ variant: 'cards.position.ItemInvestment.centerMiddle' }} className='centerMiddle thin'>{item.token}</div>
              <div sx={{ variant: 'cards.position.ItemInvestment.centerMiddle' }} className='centerMiddle thin'>{item.time}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Position;