/** @jsxImportSource theme-ui */
import React from 'react';
import Image from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { FaTwitter, FaDiscord } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer sx={{ variant: 'cards.footer.FooterWrapper' }}>
      <div sx={{ variant: 'cards.footer.Wrapper' }}>
        <div sx={{ variant: 'cards.footer.LogoContainer' }}>
          <div sx={{ variant: 'cards.footer.Flex' }}>
            <img sx={{ variant: 'cards.footer.LogoImage' }} src={Image} alt='logo' />
            <Link sx={{ variant: 'cards.footer.LogoLink' }} to='/'>DAHLIA</Link>
          </div>
          <p sx={{ variant: 'cards.footer.Desc' }}>
            Ullamcorper mauris in dolor quis enim nibh vel commodo. Scelerisque
            nullam amet massa massa, quisque quis neque. Libero volutpat egestas
            in eget.
          </p>
          <p sx={{ variant: 'cards.footer.Copy' }}>© 2021 Dahlia Finance . All rights reserved.</p>
        </div>
        <div sx={{ variant: 'cards.footer.LinksContainer' }}>
          <div sx={{ variant: 'cards.footer.Container' }}>
            <div sx={{ variant: 'cards.footer.Content' }}>
              <h3 sx={{ variant: 'cards.footer.Header' }}>Menu</h3>
              <Link sx={{ variant: 'cards.footer.LinksTo' }} to='/'>Alpha Pools</Link>
              <Link sx={{ variant: 'cards.footer.LinksTo' }} to='/'>Swap</Link>
              <Link sx={{ variant: 'cards.footer.LinksTo' }} to='/'>Farm Pools</Link>
              <Link sx={{ variant: 'cards.footer.LinksTo' }} to='/'>Status</Link>
            </div>
            <div sx={{ variant: 'cards.footer.Content' }}>
              <h3 sx={{ variant: 'cards.footer.Header' }}>Important Links</h3>
              <a sx={{ variant: 'cards.footer.LinksA' }} href='#'>Disclaimer</a>
              <a sx={{ variant: 'cards.footer.LinksA' }} href='#'>Terms &amp; Conditions</a>
              <a sx={{ variant: 'cards.footer.LinksA' }} href='#'>Cookie Policy</a>
              <a sx={{ variant: 'cards.footer.LinksA' }} href='#'>Privacy Policy</a>
            </div>
            <div sx={{ variant: 'cards.footer.Content' }}>
              <h3 sx={{ variant: 'cards.footer.Header' }}>Support</h3>
              <a sx={{ variant: 'cards.footer.LinksA' }} href='#'>Help Docs</a>
              <a sx={{ variant: 'cards.footer.LinksA' }} href='#'>Blog</a>
              <a sx={{ variant: 'cards.footer.LinksA' }} href='#'>Contact Us</a>
            </div>
            <div sx={{ variant: 'cards.footer.Content' }}>
              <h3 sx={{ variant: 'cards.footer.Header' }}>Connect</h3>
              <a sx={{ variant: 'cards.footer.LinksA' }} href='#'>
                <FaDiscord />
                Discord
              </a>
              <a sx={{ variant: 'cards.footer.LinksA' }} href='#'>
                <FaTwitter />
                Twitter
              </a>
            </div>
          </div>
        </div>
        <p sx={{ variant: 'cards.footer.CopyMobile' }}>&copy; 2021 Dahlia Finance . All rights reserved.</p>
      </div>
      <div sx={{ variant: 'cards.footer.Line' }} />
    </footer>
  );
};

export default Footer;
