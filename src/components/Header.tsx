import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "src/components/Logo";
import { Page } from "src/state/global";
import { ConnectWallet } from "src/components/ConnectWallet";

const pages = [
  {
    name: "Earn",
    page: Page.EARN,
  },
  {
    name: "Farm",
    page: Page.FARM,
  },
  { name: "Positions", page: Page.POSITIONS },
];

export const Header: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="text-center rounded-sm py-6 px-2">
      <div className="max-w-5xl mx-auto md:flex justify-center w-full items-center">
        <div className="md:flex justify-start w-full">
          <Logo />
        </div>
        {/* <div
          className={
            location.pathname.includes(Page.SUPPLY) ||
            location.pathname.includes(Page.WITHDRAW) ||
            location.pathname.includes(Page.ADD) ||
            location.pathname.includes(Page.NEW) ||
            location.pathname.includes(Page.REMOVE)
              ? "hidden"
              : "bg-gradient-to-br from-blue-700 to-green-800 rounded-md p-3 flex w-full md:justify-between justify-center text-centerr"
          }
        >
          {pages.map((page) => (
            <Link
              key={page.page}
              className={`text-white text-xl tracking-tight hover:opacity-75 hover:text-white visited:text-white mx-5 ${
                location.pathname.includes(page.page) && "font-bold"
              }`}
              to={page.page}
              style={{ textDecoration: "none", color: "white" }}
            >
              {page.name}
            </Link>
          ))}
        </div> */}
        <div className="my-4 md:m-0 md:flex justify-end w-full">
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};
