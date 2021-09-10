import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Container, Flex, Text, useColorMode } from "theme-ui";
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
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Flex sx={{ justifyContent: "space-between", alignItems: "center" }} mb={4}>
        <Flex>
          <Logo />
        </Flex>
        <Flex sx={{ justifyContent: "space-between", alignItems: "center" }} mb={4}>
            <HeaderLink page={Page.EARN}>Earn</HeaderLink>
            <HeaderLink page={Page.FARM}>Farm</HeaderLink>
            <HeaderLink page={Page.POSITIONS}>Positions</HeaderLink>
        </Flex>
        <Flex>
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
        <ConnectWallet />
      </Flex>
  </Flex>
  );
};