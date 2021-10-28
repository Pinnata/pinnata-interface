import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Flex } from "theme-ui";
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
    <nav className="text-center border rounded-sm p-4">
      <div className="max-w-4xl mx-auto md:flex justify-center w-full items-center">
        <div className="md:flex justify-start w-full">
          <Logo />
        </div>
        <div
          className={
            location.pathname.includes(Page.SUPPLY) ||
            location.pathname.includes(Page.WITHDRAW) ||
            location.pathname.includes(Page.ADD) ||
            location.pathname.includes(Page.NEW) ||
            location.pathname.includes(Page.REMOVE)
              ? "hidden"
              : "bg-gray-700 rounded-md p-2"
          }
        >
          {pages.map((page) => (
            <Link
              className="text-white mx-2 p-2 text-base font-bold tracking-tight hover:opacity-75 hover:text-white shadow-md"
              to={page.page}
              style={{ textDecoration: "none" }}
            >
              {page.name}
            </Link>
          ))}
        </div>
        <div className="my-4 md:m-0 md:flex justify-end w-full">
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};

