import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Text, useColorMode } from "theme-ui";
import { Logo } from "src/components/Logo";
import { Page } from "src/state/global";
import { StyledLink } from "src/components/StyledLink";
import { ConnectWallet } from "src/components/ConnectWallet"
import { Moon, Sun } from "phosphor-react";

const HeaderLink: React.FC<{ page: Page }> = ({ page, children }) => {
  const location = useLocation();
  const selected = location.pathname.includes(page);
  return (
    <Box >
      <StyledLink to={page}>
        <Text
          sx={{
            color: selected ? "primary" : "text",
            borderBottom: selected ? "2px solid" : "none",
            mx: 1,
            pb: 1,
            textDecoration: "none",
            ":hover": {
              textDecoration: "none"
            },
            ":active": {
              textDecoration: "none"
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
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Flex sx={{ justifyContent: "space-between", alignItems: "center" }} mb={4}>
        <Flex>
          <Logo />
        </Flex>
        <Box
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
        >
        <Flex sx={{ justifyContent: "space-between", alignItems: "center", ml:"50px", gap: "20px"}}>
            <HeaderLink page={Page.EARN}>Earn</HeaderLink>
            <HeaderLink page={Page.FARM}>Farm</HeaderLink>
            <HeaderLink page={Page.POSITIONS}>Positions</HeaderLink>
        </Flex>
        </Box>
        {/* <Flex
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
        </Flex> */}
        <Flex>
        <ConnectWallet />
      </Flex>
  </Flex>
  );
};