import React from "react";
import { Flex, Link } from "theme-ui";
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
    <div className="p-8">
      <Flex sx={{ justifyContent: "center" }}>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Pinnata"
          className="hover:opacity-75"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <GithubLogo className="text-gray-900" size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/PinnataXYZ"
          className="hover:opacity-75"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <TwitterLogo className="text-gray-900" size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.gg/vSKBpWrGEQ"
          className="hover:opacity-75"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <DiscordLogo className="text-gray-900" size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75"
          href="https://pinnata.gitbook.io/1.0.0/"
          style={{ textDecoration: "none" }}
        >
          <BookOpen className="text-gray-900" size={32} />
        </Link>
      </Flex>
    </div>
  );
};
