import "react-app-polyfill/stable";
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";

import { ContractKitProvider } from "@celo-tools/use-contractkit";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./state";
import { HashRouter as Router } from "react-router-dom";
import { LogoIcon } from "./icons/LogoIcon"
import { RecoilRoot } from 'recoil';
import { theme } from "./theme";


import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "theme-ui";

ReactDOM.render(
  <React.StrictMode>
    <ContractKitProvider
      dapp={{
        name: "Dahlia",
        description: "Leveraged yield farming protocol",
        url: "https://dahlia.finance",
        icon: "http://www.w3.org/2000/svg"
      }}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <RecoilRoot>
              <App />
            </RecoilRoot>
          </Router>
        </Provider>
      </ThemeProvider>
    </ContractKitProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
