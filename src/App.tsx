/** @jsxImportSource theme-ui */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import FarmPool from './pages/FarmPool/FarmPool';
import Farm from './pages/FarmPool/Farm';
import Earn from './pages/Earn/Earn';
import Deposit from './pages/Earn/Deposit';
import Withdrawn from './pages/Earn/Withdrawn';
import Position from './pages/Position/Position';
import Remove from './pages/Position/Remove';
import NavbarMain from './pages/NavBar/NavBarMain';
import NavBarHome from './pages/NavBar/NavBarHome';
import NavBarSecondary from './pages/NavBar/NavBarSecondary';
import DropDown from './pages/Dropdown';
import Footer from './pages/Footer/Footer';
import Add from './pages/Position/Add';

// Theme UI
import { ThemeProvider } from "theme-ui";
import { theme } from "./components/theme-UI/theme";

function App() {


  return (
    <Router>
      <ThemeProvider theme={theme}>
      <DropDown />
      <Switch>
        <Route exact path='/'>
          <NavBarHome />
          <Home />
        </Route>
        <Route exact path='/farmpool'>
          <NavbarMain page={'Farm Pools'} />
          <FarmPool />
        </Route>
        <Route exact path='/farmpool/farm'>
          <NavBarSecondary />
          <Farm />
        </Route>
        <Route exact path='/earn'>
          <NavbarMain page={'Earn'} />
          <Earn />
        </Route>
        <Route exact path='/earn/deposit'>
          <NavBarSecondary />
          <Deposit />
        </Route>
        <Route exact path='/earn/withdraw'>
          <NavBarSecondary />
          <Withdrawn />
        </Route>
        <Route exact path='/position'>
          <NavbarMain page={'Positions'} />
          <Position />
        </Route>
        <Route exact path='/position/remove'>
          <NavBarSecondary />
          <Remove />
        </Route>
        <Route exact path='/position/add'>
          <NavBarSecondary />
          <Add />
        </Route>
      </Switch>
      <Footer />
</ThemeProvider>
    </Router>
  );
}

export default App;
