/** @jsxImportSource theme-ui */
import React from 'react';
import { Link } from 'react-router-dom';
//import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { navData } from '../Data/NavigationData';
import { useGlobalContext } from '../context/context';

const Dropdown = () => {
  // eslint-disable-next-line
  const { toggleNav, toggle } = useGlobalContext();
  return (
    <DropdownContainer isOpen={toggle} onClick={toggleNav}>
      <div sx={{ variant: 'cards.dropDown.CloseBtn' }} onClick={toggleNav}>
        <div sx={{ variant: 'cards.dropDown.CloseIcon' }}  />
      </div>
      
      <div>
        <div sx={{ variant: 'cards.dropDown.DropdownMenu' }} >
          {navData.map((item, index) => {
            return (
              <Link sx={{ variant: 'cards.dropDown.DropdownLink' }} to={item.link} key={index}>
                {item.icons}
                {item.title}
              </Link>
            );
          })}
        </div>
        <div sx={{ variant: 'cards.dropDown.BtnWrapper' }}>
          {/* eslint-disable-next-line */}
          <a sx={{ variant: 'cards.dropDown.Button' }}  href='#' target='_blank'>
            Connect Wallet
          </a>
        </div>
      </div>
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: var(--third-color);
  display: grid;
  align-items: center;
  top: ${({ isOpen }: { isOpen: string }) => (isOpen ? '0' : '-100%')};
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }: { isOpen: string }) => (isOpen ? '1' : '0')};
`;