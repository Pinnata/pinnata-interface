import React from 'react';
import Image from 'src/images/logo.png';
import { FaTwitter, FaDiscord } from 'react-icons/fa';

import {
  FooterWrapper,
  Wrapper,
  LogoContainer,
  Flex,
  LogoImage,
  LogoLink,
  Desc,
  Copy,
  LinksContainer,
  Header,
  Container,
  Content,
  LinksTo,
  LinksA,
  Line,
  CopyMobile,
} from './FooterStyles';
export const Footer = () => {
  return (
    <FooterWrapper>
      <Wrapper>
        <LogoContainer>
          <Flex>
            <LogoImage src={Image} alt='logo' />
            <LogoLink to='/'>DAHLIA</LogoLink>
          </Flex>
          <Desc>
            Ullamcorper mauris in dolor quis enim nibh vel commodo. Scelerisque
            nullam amet massa massa, quisque quis neque. Libero volutpat egestas
            in eget.
          </Desc>
          <Copy>© 2021 Dahlia Finance . All rights reserved.</Copy>
        </LogoContainer>
        <LinksContainer>
          <Container>
            <Content>
              <Header>Menu</Header>
              <LinksTo to='/'>Alpha Pools</LinksTo>
              <LinksTo to='/'>Swap</LinksTo>
              <LinksTo to='/'>Farm Pools</LinksTo>
              <LinksTo to='/'>Status</LinksTo>
            </Content>
            <Content>
              <Header>Important Links</Header>
              <LinksA href='#'>Disclaimer</LinksA>
              <LinksA href='#'>Terms & Conditions</LinksA>
              <LinksA href='#'>Cookie Policy</LinksA>
              <LinksA href='#'>Privacy Policy</LinksA>
            </Content>
            <Content>
              <Header>Support</Header>
              <LinksA href='#'>Help Docs</LinksA>
              <LinksA href='#'>Blog</LinksA>
              <LinksA href='#'>Contact Us</LinksA>
            </Content>
            <Content>
              <Header>Connect</Header>
              <LinksA href='#'>
                <FaDiscord />
                Discord
              </LinksA>
              <LinksA href='#'>
                <FaTwitter />
                Twitter
              </LinksA>
            </Content>
          </Container>
        </LinksContainer>
        <CopyMobile>© 2021 Dahlia Finance . All rights reserved.</CopyMobile>
      </Wrapper>
      <Line />
    </FooterWrapper>
  );
};
