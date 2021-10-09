import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "theme-ui";
import Log from "src/images/logo.png";


export const Logo: React.FC = () => {
  const history = useHistory();

  return (
    <Flex
      sx={{ cursor: "pointer", alignItems: "center", justifyContent: "center"}}
      onClick={() => {
        history.push("/");
      }}
    >
      <Box sx={{ fill: "text" }}>
        <img src={Log} alt='Logo'/>
      </Box>
        <Text variant="logo"></Text>
    </Flex>
  );
};
