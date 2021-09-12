import React from "react";
import { Text, TextProps } from "theme-ui";

export const BlockText: React.FC<TextProps> = (props) => {
  return <Text sx={{ ...props.sx, display: "block" }} {...props} />;
};
