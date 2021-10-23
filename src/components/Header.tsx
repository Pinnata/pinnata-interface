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
    <nav className="text-center bg-gray-100 rounded-sm shadow-sm p-4">
      <div className="max-w-4xl mx-auto md:flex justify-between items-center">
        <Logo />
        {/* <Box
          sx={{
            display:
              location.pathname.includes(Page.SUPPLY) ||
              location.pathname.includes(Page.WITHDRAW) ||
              location.pathname.includes(Page.ADD) ||
              location.pathname.includes(Page.NEW) ||
              location.pathname.includes(Page.REMOVE)
                ? "none"
                : "inherit",
          }}
          className="text-center"
        > */}
        <div>
          {pages.map((page) => (
            <Link
              className="no-underline text-xl text-gray-800 font-bold tracking-tighter hover:opacity-75 hover:text-gray-800 mx-4"
              to={page.page}
            >
              {page.name}
            </Link>
          ))}
        </div>
        {/* </Box> */}
        <div className="my-4 md:m-0">
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};

{
  /* 
          
          (Todo) Revisit dark mode after tailwind CSS refactor. 
          https://tailwindcss.com/docs/dark-mode

          <Flex
            sx={{
              alignItems: "center",
              backgroundColor: "secondaryBackground",
              mr: 4,
              px: 2,
              cursor: "pointer",
              borderRadius: "6px",
            }}
            onClick={() => {
              if (colorMode === "light") {
                setColorMode("dark");
              } else {
                setColorMode("light");
              }
            }}
          >
            {colorMode === "light" ? <Sun size={28} /> : <Moon size={28} />}
          </Flex> */
}
