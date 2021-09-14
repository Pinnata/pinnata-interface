import { navHomeData } from '../../data/NavigationData';
import Image from '../../images/logo.png';
import {
  NavWrapper,
  Wrapper,
  Logo,
  LogoImage,
  LogoLink,
  MenuBars,
  NavMenu,
  NavMenuLinksA,
} from './NavBarStyles';

const NavBarHome = () => {
  return (
    <NavWrapper>
      <Wrapper>
        <Logo>
          <LogoImage src={Image} alt='Logo Image' />
          <LogoLink to='/'>DAHLIA</LogoLink>
        </Logo>
        <NavMenu>
          {navHomeData.map((item, index) => {
            return (
              <NavMenuLinksA href={item.link} key={index}>
                {item.title}
              </NavMenuLinksA>
            );
          })}
        </NavMenu>
      </Wrapper>
    </NavWrapper>
  );
};

export default NavBarHome;
