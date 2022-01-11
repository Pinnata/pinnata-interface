import React from "react";
import { Container } from "theme-ui";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
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
import { LandingPage } from "src/components/LandingPage";
import { HomePage } from "src/components/HomePage";
import { Token } from "./utils/token";

const App: React.FC = () => {
  React.useEffect(() => {
    Modal.setAppElement("body");
  });

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-green-100 w-full">
      <BrowserRouter>
        <Container className="flex-grow">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/earn" component={Earn} />
          <Route exact path="/earn/supply/:tokenAddress" component={Supply} />
          <Route exact path="/earn/withdraw/:tokenAddress" component={Withdraw} />
          <Route exact path="/farm/new/:name/:wrapper/:spell/:lp/:apy/:tokens/:type/:id" component={NewFarm} />
          <Route exact path="/positions/add/:positionId/:collId/:collateralSize/:name/:wrapper/:spell/:lp/:apy/:tokens/:type/:id" component={Add} />
          <Route exact path="/positions/remove/:positionId/:collId/:collateralSize/:name/:wrapper/:spell/:lp/:apy/:tokens/:type/:id" component={Remove} />
          <Route exact path="/farm" component={Farm}/>
          <Route exact path="/positions" component={Position}/>
          <ToastContainer />
          <Footer />
          <Remove />
        </Container>
      </BrowserRouter>
    </main>
  );
};

export default App;
