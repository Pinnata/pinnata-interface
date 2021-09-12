import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Container, Flex, Text } from "theme-ui";
import { Logo } from "src/components/Logo";
import { Page } from "src/state/global";
import { StyledLink } from "src/components/StyledLink";
import { ConnectWallet } from "src/components/ConnectWallet"

const HeaderLink: React.FC<{ page: Page }> = ({ page, children }) => {
  const location = useLocation();
  const selected = location.pathname.includes(page);
  return (
    <Box mr={2}>
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
  return (
    <Flex sx={{ justifyContent: "space-between", alignItems: "center" }} mb={4}>
        <Logo />
        <Flex sx={{ justifyContent: "space-between", alignItems: "center" }} mb={4}>

        </Flex>
        <Flex>
        <ConnectWallet />
        </Flex>
  </Flex>
  );
};
  // <>
  //   <Container sx={{ width: "auto" }}>
  //     <Flex
  //       sx={{
  //         mb: 2,
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Flex
  //         sx={{
  //           alignItems: "center",
  //         }}
  //       >
  //         <Box mr={4}>
  //           <Logo />
  //         </Box>
  //         <HeaderLink page={Page.EARN}>Earn</HeaderLink>
  //         <HeaderLink page={Page.FARM}>Farm</HeaderLink>
  //         <HeaderLink page={Page.POSITIONS}>Positions</HeaderLink>
  //       </Flex>
  //     </Flex>
  //   </Container>
  // </>