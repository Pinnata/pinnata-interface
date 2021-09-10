/** @jsxImportSource theme-ui */
import React from 'react';
import { useGlobalContext } from '../../context/context';
import { navHomeData } from '../../Data/NavigationData';
import { Link } from 'react-router-dom';
import Image from '../../images/logo.png';
import { FaBars } from 'react-icons/fa';

const NavBarHome = () => {
  const { toggleNav } = useGlobalContext();
  return (
    <nav sx={{ variant: 'cards.navBar.NavWrapper' }} >
      <div sx={{ variant: 'cards.navBar.Wrapper' }}>
        <div sx={{ variant: 'cards.navBar.Logo' }}>
          <img sx={{ variant: 'cards.navBar.Logo.LogoImage' }} src={Image} alt='Logo' />
          <Link sx={{ variant: 'cards.navBar.Logo.LogoLink' }}  to='/'>DAHLIA</Link>
        </div>
        <FaBars sx={{ variant: 'cards.navBar.MenuBars' }} onClick={toggleNav} />
        <div sx={{ variant: 'cards.navBar.NavMenu' }}>
          {navHomeData.map((item, index) => {
            return (
              <a sx={{ variant: 'cards.navBar.NavMenuLinksA' }} href={item.link} key={index}>
                {item.icons}
                {item.title}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavBarHome;
