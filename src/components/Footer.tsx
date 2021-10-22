import React from "react";
import { Box, Flex, Link } from "theme-ui";
import { GithubLogo, TwitterLogo, DiscordLogo, BookOpen } from "phosphor-react";
import { useLocation } from "react-router-dom";

export const Footer: React.FC = () => {
  const location = useLocation();

  if (
    location.pathname !== "/earn" &&
    location.pathname !== "/farm" &&
    location.pathname !== "/positions"
  ) {
    return null;
  }

  return (
    <div className="bg-gray-100 mt-16 p-8">
      <Flex sx={{ justifyContent: "center" }}>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Dahlia-Finance"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <GithubLogo className="text-gray-900" size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/dahliafinance"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <TwitterLogo className="text-gray-900" size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.gg/C98ehssB"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <DiscordLogo className="text-gray-900" size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://dahlia-finance.gitbook.io/dahlia-finance/"
          style={{ textDecoration: "none" }}
        >
          <BookOpen className="text-gray-900" size={32} />
        </Link>
      </Flex>
    </div>
  );
};
