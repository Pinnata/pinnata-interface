import styled from "@emotion/styled";
import React from "react";
import { Logo } from "src/components/Logo";
import { Box, Divider } from "theme-ui";
import { Link } from "react-router-dom";

const NavLink = styled(Link)({
  textDecoration: "none",
  color: "white",
});

export const SideNav: React.FC = () => {
  return (
    <div>
      <Box mb={4}>
        <Logo />
      </Box>
      <Box sx={{ cursor: "pointer" }}>
        <NavLink to="/search">Search</NavLink>
        <Divider />
      </Box>
      <Box sx={{ cursor: "pointer" }}>
        <NavLink to="/manage">Manage</NavLink>
        <Divider />
      </Box>
    </div>
  );
};
