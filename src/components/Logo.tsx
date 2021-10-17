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
        <img src={"https://raw.githubusercontent.com/Dahlia-Finance/dahlia-interface/54767e90c58389912d8b0df55882a0b4138a13ee/src/images/logo.png"} alt='Logo'/>
      </Box>
        <Text color="text" variant="logo">Dahlia</Text>
    </Flex>
  );
};
