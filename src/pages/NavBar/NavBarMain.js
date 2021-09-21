import Image from 'src/images/logo.png';
import {
  NavWrapper,
  Wrapper,
  Logo,
  LogoImage,
  LogoLink,
  NavMenu,
  NavMenuLinks,
} from './NavBarStyles';
import { ConnectWallet } from "../../components/ConnectWallet"

const NavbarMain = ({ page }) => {
  return (
    
    <NavWrapper>
      <Wrapper>
        <Logo>
          <LogoImage src={Image} alt='Logo Image' />
          <LogoLink to='/'>DAHLIA</LogoLink>
        </Logo>
        <NavMenu>
          {[{link: '/earn', title: 'Earn'}, {link: '/farm', title: 'Farm'}, {link: '/positions', title: 'Positions'}].map((item, index) => {
            return (
              <NavMenuLinks
                to={item.link}
                key={index}
                className={page === item.title ? 'active' : null}
              >
                {item.title}
              </NavMenuLinks>
            );
          })}
        </NavMenu>
        <ConnectWallet />
      </Wrapper>
    </NavWrapper>
  );
};

export default NavbarMain;
