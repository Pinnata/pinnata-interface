import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
//
export const NavWrapper = styled.nav`
  height: 115px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;
  background: var(--third-color);
  box-shadow: 0px 0px 36px rgba(0, 211, 149, 0.66);
  @media screen and (max-width: 1000px) {
    height: 67px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1000px) {
    width: 90vw;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const LogoImage = styled.img`
  color: var(--main-color);
  width: 90px;
  height: auto;
  @media screen and (max-width: 1000px) {
    width: 60px;
    margin-right: 0.5rem;
  }
`;

export const LogoLink = styled(Link)`
  text-decoration: none;
  color: var(--main-color);
  font-family: var(--montserrat-alternates);
  font-size: 36px;
  padding: 0;
  margin: 0;
  @media screen and (max-width: 1000px) {
    font-size: 22px;
  }
`;

export const MenuBars = styled(FaBars)`
  display: none;
  @media screen and (max-width: 1000px) {
    display: block;
    color: var(--main-color);
    cursor: pointer;
    width: 25px;
    height: 25px;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: var(--white);
    font-size: 20px;
    margin-right: 0.5rem;
  }
  .active {
    svg {
      color: var(--main-color);
      stroke: var(--main-color);
    }
    color: var(--main-color);
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const NavMenuLinks = styled(Link)`
  color: var(--white);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  font-size: 20px;
`;
export const NavMenuLinksA = styled.a`
  color: var(--white);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  font-size: 20px;
  &:last-of-type {
    padding-right: 0;
  }
`;

export const Button = styled.a`
  border-radius: 5px;
  background: var(--third-color);
  padding: 12px 25px;
  border: 1px solid var(--main-color);
  box-shadow: 0px 0px 12px rgba(128, 255, 219, 0.36);
  text-decoration: none;
  color: var(--main-color);
  font-size: 14px;
  @media screen and (max-width: 1000px) {
    display: none;
    visibility: hidden;
  }
`;
