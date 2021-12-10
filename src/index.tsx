import "react-app-polyfill/stable";
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import "src/index.css";

import { ChainId, ContractKitProvider, NetworkNames } from "@celo-tools/use-contractkit";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "src/state";
import theme from "src/theme";
import { ThemeProvider } from "theme-ui";
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (process.env.REACT_APP_SENTRY_DSN) {
  const sentryCfg = {
    environment: `${process.env.REACT_APP_VERCEL_ENV ?? "unknown"}`,
    release: `${
      process.env.REACT_APP_VERCEL_GIT_COMMIT_REF?.replace(/\//g, "--") ??
      "unknown"
    }-${process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA ?? "unknown"}`,
  };
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.2,
    ...sentryCfg,
  });
  console.log(
    `Initializing Sentry environment at release ${sentryCfg.release} in environment ${sentryCfg.environment}`
  );
} else {
  console.warn(`REACT_APP_SENTRY_DSN not found. Sentry will not be loaded.`);
}

ReactDOM.render(
  <React.StrictMode>
    <ContractKitProvider
      dapp={{
        icon: "",
        name: "Pinnata",
        description: "Leverage yield farming protocol",
        url: "https://pinnata.xyz",
      }}
      network={{
        name: NetworkNames.CeloMainnet,
        rpcUrl: 'https://forno.celo.org',
        explorer: 'https://explorer.celo.org/',
        chainId: ChainId.CeloMainnet,
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
