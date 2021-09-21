import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
//
export const FooterWrapper = styled.footer`
  width: 100vw;
  height: 215px;
  background: var(--third-color);
  box-shadow: 0px 0px 36px rgba(0, 211, 149, 0.23);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
`;

export const Wrapper = styled.div`
  width: 85vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 100%;
  @media screen and (max-width: 1000px) {
    width: 90vw;
  }
`;
export const LogoContainer = styled.div`
  width: 25%;
  @media screen and (max-width: 1000px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  color: var(--main-color);
  width: 70px;
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
  font-size: 24px;
  padding: 0;
  margin: 0;
`;

export const Desc = styled.p`
  font-size: 12px;
  color: var(--fourth-color);
  font-weight: 400;
  @media screen and (max-width: 1000px) {
    width: 80%;
  }
`;
export const Copy = styled.p`
  color: var(--white);
  font-size: 8px;
  font-weight: 500;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
export const LinksContainer = styled.div`
  width: 60%;
  min-height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const Content = styled.div`
  display: block;
  width: auto;
  @media screen and (max-width: 1000px) {
    margin-top: 1rem;
    width: 50%;
  }
`;

export const Header = styled.h3`
  font-weight: 700;
  font-size: 12px;
  color: var(--white);
  margin: 0;
  padding: 0;
  margin-bottom: 0.5rem;
`;

export const LinksTo = styled(Link)`
  font-weight: 400;
  text-decoration: none;
  font-size: 12px;
  color: var(--white);
  padding: 0;
  margin: 0.8rem 0;
  display: block;
  @media screen and (max-width: 1000px) {
    margin: 0.5rem 0;
  }
`;

export const LinksA = styled.a`
  font-weight: 400;
  text-decoration: none;
  font-size: 12px;
  color: var(--white);
  padding: 0;
  margin: 0.8rem 0;
  display: flex;
  align-items: center;
  svg {
    color: var(--main-color);
    font-size: 12px;
    margin-right: 0.5rem;
  }
  @media screen and (max-width: 1000px) {
    margin: 0.5rem 0;
  }
`;
export const Line = styled.div`
  width: 100%;
  height: 2px;
  background: var(--main-color);
  opacity: 0.1;
  position: absolute;
  bottom: 18px;
  left: 0;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const CopyMobile = styled.p`
  color: var(--white);
  font-size: 8px;
  font-weight: 500;
  margin: 1rem 0;
  @media screen and (min-width: 1000px) {
    display: none;
  }
`;
