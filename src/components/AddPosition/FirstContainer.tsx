/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { useGlobalContext } from '../../context/context';
import Image1 from '../../images/first.png';
import Image2 from '../../images/eth.png';


const FirstContainer = () => {
  const handleIndexAdd  = useGlobalContext();
  
  const [range, setRange] = useState(55);
  return (
    <article sx={{ variant: 'cards.firstContainer.InfoCard' }
    }>
      <h2 sx={{ variant: 'cards.firstContainer.InfoHeader' }
      } >My position has</h2>
      <div sx = {{ variant: 'cards.firstContainer.FirstLine' }
} />
      <div sx={{ variant: 'cards.firstContainer.Flex' }} >
        <div sx={{ variant: 'cards.firstContainer.Container' }
        }>
          <img sx={{ variant: 'cards.firstContainer.Container.img' }
        } src={Image1} alt='celo' />
          <h2 sx={{ variant: 'cards.firstContainer.Container.h2' }
        }>CELO</h2>
          <h3 sx={{ variant: 'cards.firstContainer.Container.h3' }
        }>33.10</h3>
        </div>
        <div sx={{ variant: 'cards.firstContainer.Container' }} >
          <img sx={{ variant: 'cards.firstContainer.Container.img' }
          }  src={Image2} alt='eth' />
          <h2 sx={{ variant: 'cards.firstContainer.Container.h2' }
          }>wETH</h2>
          <h3 sx={{ variant: 'cards.firstContainer.Container.h3' }
        }>5.12</h3>
        </div>
      </div>
      <div sx = {{ variant: 'cards.firstContainer.FirstLine' }
} />
      <p sx={{ variant: 'cards.firstContainer.Desc' }}>I'd like to remove</p>
      <div sx={{ variant: 'cards.firstContainer.Content' }}>
        <div sx={{ variant: 'cards.firstContainer.Content.range' }} className='range'>
          <input sx={{ variant: 'cards.firstContainer.Content.input' }}
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
          <div sx={{ variant: 'cards.firstContainer.FlexContainer' }
          }>
            <p sx={{ variant: 'cards.firstContainer.FlexContainer.p' }
          }>0%</p>
            <p sx={{ variant: 'cards.firstContainer.FlexContainer.p' }
          }>25%</p>
            <p sx={{ variant: 'cards.firstContainer.FlexContainer.p' }
          }>50%</p>
            <p sx={{ variant: 'cards.firstContainer.FlexContainer.p' }
          }>75%</p>
            <p sx={{ variant: 'cards.firstContainer.FlexContainer.p' }
          }>100%</p>
          </div>
        </div>
        <div className='container'>
          <h3>{range}%</h3>
        </div>
      </div>
      <div sx = {{ variant: 'cards.firstContainer.FirstLine' }
} />
      <div sx={{ variant: 'cards.firstContainer.Control' }
      }>
        <div></div>
        <button sx={{ variant: 'cards.firstContainer.Button' }
        } onClick={handleIndexAdd}>NEXT</button>
      </div>
    </article>
  );
};

export default FirstContainer;

/* const Container = styled.div`
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
`; */
