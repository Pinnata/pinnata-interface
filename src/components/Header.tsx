import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Text } from "theme-ui";
import { Logo } from "src/components/Logo";
import { Page } from "src/state/global";
import { StyledLink } from "src/components/StyledLink";
import { ConnectWallet } from "src/components/ConnectWallet";
import styled from "@emotion/styled";

const WalletContainer = styled.div`
  margin-left: auto;
  @media (max-width: 700px) {
    margin-left: 0;
    position: fixed;
    bottom: 0;
    left: 0;
  }
`;

const ResponsiveLogo = styled(Logo)`
  @media (max-width: 700px) {
    nothing;
  }
`;

const HeaderLink: React.FC<{ page: Page }> = ({ page, children }) => {
  const location = useLocation();
  const selected = location.pathname.includes(page);
  return (
    <Box>
      <StyledLink to={page}>
        <Text
          sx={{
            color: selected ? "primary" : "text",
            borderBottom: selected ? "2px solid" : "none",
            mx: 1,
            pb: 1,
            textDecoration: "none",
            ":hover": {
              textDecoration: "none",
            },
            ":active": {
              textDecoration: "none",
            },
          }}
          variant="subtitle"
        >
          {children}
        </Text>
      </StyledLink>
    </Box>
  );
};

export const Header: React.FC = () => {
  const location = useLocation();
  return (
    <Flex
      sx={{
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "0.5rem",
      }}
      mb={4}
    >
      <Flex mr="auto">
        <Logo />
      </Flex>
      <Box
        sx={{
          margin: 0,
          display:
            location.pathname.includes(Page.SUPPLY) ||
            location.pathname.includes(Page.WITHDRAW) ||
            location.pathname.includes(Page.ADD) ||
            location.pathname.includes(Page.NEW) ||
            location.pathname.includes(Page.REMOVE)
              ? "none"
              : "inherit",
        }}
      >
        <Flex
          sx={{
            //justifyContent: "space-around",
            alignItems: "center",
            //ml: "50px",
            gap: "0.5rem",
          }}
        >
          <HeaderLink page={Page.EARN}>Earn</HeaderLink>
          <HeaderLink page={Page.FARM}>Farm</HeaderLink>
          <HeaderLink page={Page.POSITIONS}>Positions</HeaderLink>
        </Flex>
      </Box>
      <WalletContainer>
        <ConnectWallet />
      </WalletContainer>
    </Flex>
  );
};
