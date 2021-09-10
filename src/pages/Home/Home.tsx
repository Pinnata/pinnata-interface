/** @jsxImportSource theme-ui */
import React from 'react';
import { Link } from 'react-router-dom';
import { cardInfoData } from '../../Data/HomeData';

const Home = () => {
  return (
    <section sx={{
      variant: 'cards.home.wrappers',
    }}>
      <article sx={{
        variant: 'cards.home.container',
      }}>
        <div sx={{ variant: 'cards.home.TextContainer'}} >
          <h1 sx={{ variant: 'cards.home.Header'}} >Leveraged yield farming, on Celo.</h1>
          <Link sx={{
            variant: 'cards.home.btns'
          }} to='/farmpool'>Launch App</Link>
        </div>
        <div sx={{ variant: 'cards.home.CardContainer'}} >
          <div sx={{ variant: 'cards.home.Card' }} >
            <div sx={{ variant: 'cards.home.ContainerContentCard' }} >
              <h2 sx={{ variant:'cards.home.Title'}}>Total Value Locked</h2>
              <h3 sx={{ variant: 'cards.home.Amount' }}>53,282,049 USD</h3>
            </div>
          </div>
        </div>
      </article>
      <article sx={{
        variant: 'cards.home.container',
      }}>
        {cardInfoData.map((item, index) => {
          return (
            <div sx={{ variant: 'cards.home.InfoCard' }} key={index}>
              <div sx={{ variant: 'cards.home.InfoCardContainer' }} >
                <div>
                  <img sx={{ variant: 'cards.home.Image' }}  src={item.icon} alt={item.title} />
                </div>
                <div>
                  <h2 sx={{ variant: 'cards.home.CardHeader' }} >{item.title}</h2>
                  <h3 sx={{ variant: 'cards.home.CardInfo' }} >{item.apy}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default Home;
