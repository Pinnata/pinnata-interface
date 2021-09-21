import React from "react";
import { Box, Flex, Link } from "theme-ui";
import { GithubLogo, TwitterLogo, DiscordLogo } from "phosphor-react";
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
    <Box
      sx={{
        position: "static",
        width: "100%",
        bottom: 0,
        pb: 4,
        marginBottom: "1rem",
      }}
    >
      <Flex sx={{ justifyContent: "center" }}>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Dahlia-Finance"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <GithubLogo size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/dahliafinance"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <TwitterLogo size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.gg/C98ehssB"
          style={{ textDecoration: "none" }}
        >
          <DiscordLogo size={32} />
        </Link>
      </Flex>
    </Box>
  );
};
