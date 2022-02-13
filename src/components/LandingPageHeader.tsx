import React from "react";
import { Link, useLocation, RouteComponentProps } from "react-router-dom";
import { Logo } from "src/components/Logo";
import { Page } from "src/state/global";
import { ConnectWallet } from "src/components/ConnectWallet";
import { Button } from 'theme-ui';

interface Props extends RouteComponentProps{}

export const LandingPageHeader: React.FC<Props> = ({ history}) => {
  const location = useLocation();
  return (
    <nav className="px-12 text-center rounded-sm py-6 px-2">
      <div className="max-w-5xl mx-auto md:flex justify-center w-full items-center">
        <div className="md:flex justify-start w-full">
          <Logo />
        </div>
        <div>
          <a href="https://medium.com/dahlia-finance" className="text-xl py-3 px-3 text-black">Blog</a>
          <a href="https://twitter.com/PinnataXYZ" className="text-xl py-3 px-3 text-black">Twitter</a>
          <a href="http://discord.gg/72VSGyx4jB" className="text-xl py-3 px-3 text-black">Discord</a>
        </div>
        <div className="my-4 md:m-0 md:flex justify-end w-full">
          {/* <Link to='/earn' >
            <Button className="bg-gradient-to-br from-blue-700 to-green-800 rounded-md justify-end hover:opacity-75" onClick={() => {
              history.push('/earn')
                }}>Launch App</Button>
          </Link> */}
          <Link to='/earn' >
            <button className="from-blue-700 to-green-300 text-white border-blue-700 bg-gradient-to-br hover:text-white active:bg-blue-700 font-bold px-8 py-3 rounded-3xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:opacity-75" onClick={() => {
            history.push('/earn')
                }}>Launch App</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
