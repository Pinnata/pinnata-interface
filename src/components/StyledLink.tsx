import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)({
  height: "fit-content",
  textDecoration: "none",
  ":hover": {
    textDecoration: "none"
  },
  ":active": {
    textDecoration: "none"
  },
  color: "var(--theme-ui-colors-primaryText)",
});