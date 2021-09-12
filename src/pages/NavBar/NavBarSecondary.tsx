import Image from 'src/images/logo.png';
import {
  NavWrapper,
  Wrapper,
  Logo,
  LogoImage,
  LogoLink,
  MenuBars,
} from './NavBarStyles';
import { ConnectWallet } from "src/components/ConnectWallet"


const NavBarSecondary = () => {
  return (
    <NavWrapper>
      <Wrapper>
        <Logo>
          <LogoImage src={Image} alt='Logo Image' />
          <LogoLink to='/'>DAHLIA</LogoLink>
        </Logo>
        <ConnectWallet />
      </Wrapper>
    </NavWrapper>
  );
};

export default NavBarSecondary;
