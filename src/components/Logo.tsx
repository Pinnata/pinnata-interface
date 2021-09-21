import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "theme-ui";
import Log from "src/images/logo.png";

export const Logo: React.FC = () => {
  const history = useHistory();

  return (
    <Flex
      sx={{
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      onClick={() => {
        history.push("/");
      }}
    >
      <Box sx={{ fill: "text" }}>
        <img src={Log} alt="Logo" />
      </Box>
      <Text variant="logo" sx={{ fontSize: "1.5rem", marginLeft: "-1rem" }}>
        Dahlia
      </Text>
    </Flex>
  );
};
