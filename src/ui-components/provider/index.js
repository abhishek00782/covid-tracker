import React from "react";
import { ThemeProvider } from "styled-components";
import colors from "../colors";
import Typography from "./Typography";
import GlobalStyles from "./GlobalStyles";

const defaultTheme = {
  colors,
};

export const Provider = ({ theme = defaultTheme, children }) => (
  <ThemeProvider theme={theme}>
    <Typography />
    <GlobalStyles />
    {children}
  </ThemeProvider>
);
