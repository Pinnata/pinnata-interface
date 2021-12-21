import React from "react";
import { Container } from "theme-ui";
import { Redirect, Route, Switch } from "react-router-dom";
import { Earn } from "src/pages/Earn/Earn";
import { Position } from "src/pages/Position/Position";
import { Farm } from "src/pages/Farm/Farm";
import { Supply } from "src/pages/Earn/Supply/";
import Modal from "react-modal";
import { Withdraw } from "src/pages/Earn/Withdraw";
import { NewFarm } from "src/pages/Farm/newFarm/NewFarm";
import { Add } from "src/pages/Position/Add/add";
import { Remove } from "src/pages/Position/Remove/remove";
import { Header } from "src/components/Header";
import { Footer } from "src/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  React.useEffect(() => {
    Modal.setAppElement("body");
  });

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-green-100 w-full">
      <Container className="flex-grow">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/earn" />
          </Route>
          <Route exact path="/earn">
            <Earn />
          </Route>
          <Route exact path="/farm">
            <Farm />
          </Route>
          <Route exact path="/earn/supply/:tokenAddress">
            <Supply />
          </Route>
          <Route exact path="/earn/withdraw/:tokenAddress">
            <Withdraw />
          </Route>
          <Route exact path="/farm/new/:name/:wrapper/:spell/:lp/:apy/:tokens/:type">
            <NewFarm />
          </Route>
          <Route
            exact
            path="/positions/add/:positionId/:collId/:collateralSize/:name/:wrapper/:spell/:lp/:apy/:tokens/:type"
          >
            <Add />
          </Route>
          <Route
            exact
            path="/positions/remove/:positionId/:collId/:collateralSize/:name/:wrapper/:spell/:lp/:apy/:tokens/:type"
          >
            <Remove />
          </Route>
          <Route exact path="/positions">
            <Position />
          </Route>
        </Switch>
        <ToastContainer />
      </Container>
      <Footer />
    </main>
  );
};

export default App;
