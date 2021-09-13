import React from "react";
import { Container } from "theme-ui";
import { Redirect, Route, Switch } from "react-router-dom";
import Earn from "./pages/Earn/Earn";
import Position from "./pages/Position/Position"
import { Farm } from "./pages/Farm/Farm";
import Supply from "./pages/Earn/Supply/"
import Modal from "react-modal";
import { Footer } from "./pages/Footer/Footer";
import { Withdraw } from "./pages/Earn/Withdraw";
import NavbarMain from "./pages/NavBar/NavBarMain";
import NavBarHome from "./pages/NavBar/NavBarHome";
import Home from "./pages/Home/Home";
import NavBarSecondary from "./pages/NavBar/NavBarSecondary";
import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";
import styled from "@emotion/styled";
import { NewFarm } from "./pages/Farm/newFarm/NewFarm";
import { Add } from "./pages/Position/Add/add";
import { Remove } from "./pages/Position/Remove/remove";
import { Header } from "./components/Header";

const App: React.FC = () => {
  React.useEffect(() => {
    Modal.setAppElement("body");
  });

  return (
    <Container sx={{ maxWidth: "100%", width: "auto", height: "100%"}}>
      <Container sx={{backgroundColor: "#070a0e"}}>
        <Switch>
          <Route exact path="/">
            <NavBarHome />
            <Home />
          </Route>
          <Route exact path="/earn">
            <NavbarMain page="Earn" />
            <Earn />
          </Route>
          <Route exact path="/farm">
            <NavbarMain page="Farm" />
            <Farm />
          </Route>
          <Route exact path='/earn/supply/:tokenAddress'>
            <NavBarSecondary />
            <Supply />
          </Route>
          <Route exact path='/earn/withdraw/:tokenAddress'>
            <NavBarSecondary />
            <Withdraw />
          </Route>
          <Route exact path='/farm/new/:name/:wrapper/:spell/:lp/:tokens'>
            <NavBarSecondary />
            <NewFarm />
          </Route>
          <Route exact path='/positions/add/:positionId/:collId/:collateralSize/:name/:wrapper/:spell/:lp/:tokens'>
            <NavBarSecondary />
            <Add />
          </Route>
          <Route exact path='/positions/remove/:positionId/:collId/:collateralSize/:name/:wrapper/:spell/:lp/:tokens'>
            <NavBarSecondary />
            <Remove />
          </Route>
          <Route exact path="/positions">
            <NavbarMain page="Positions" />
            <Position />
          </Route>
        </Switch>
      </Container>
    </Container>
   );
};

export default App;
