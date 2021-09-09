import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "theme-ui";
import { LogoIcon } from "src/icons/LogoIcon";


export const Logo: React.FC = () => {
  const history = useHistory();

  return (
    <Flex
      sx={{ cursor: "pointer" }}
      onClick={() => {
        history.push("/");
      }}
    >
      <Box sx={{ fill: "text" }} mr={2}>
        <LogoIcon />
      </Box>
        <Text variant="logo">Dahlia</Text>
    </Flex>
  );
};
