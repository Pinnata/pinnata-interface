import "react-app-polyfill/stable";
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import "src/index.css";


import { ChainId, ContractKitProvider, NetworkNames } from "@celo-tools/use-contractkit";
import { defaultScreens } from '@celo-tools/use-contractkit/lib/screens'
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "src/state";
import theme from "src/theme";
import { ThemeProvider } from "theme-ui";
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";

import App from "./App";

// TODO removing all WalletConnect options until WC v1 / v2 issues are sorted
const screensWithoutWalletConnect = { ...defaultScreens }

const keysToRemove = ['Valora', 'Celo Wallet', 'Celo Terminal', 'CeloDance', 'WalletConnect']
// @ts-ignore
keysToRemove.forEach((k) => delete screensWithoutWalletConnect[k])
const connectModalProps = {
  screens: screensWithoutWalletConnect,
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
        name: NetworkNames.Mainnet,
        rpcUrl: 'https://forno.celo.org',
        explorer: 'https://explorer.celo.org/',
        chainId: ChainId.Mainnet,
        graphQl: ""
      }}
      connectModal={connectModalProps}
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
