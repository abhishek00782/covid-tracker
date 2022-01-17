import React from "react";
import { Box, Flex } from "reflexbox";
import { StyledBox } from "./styles";
import { Divider } from "..";

export const Card = ({ header, children, ...restProps }) => {
  return (
    <StyledBox {...restProps}>
      {header && <Box mb="6px">{header}</Box>}
      {children}
    </StyledBox>
  );
};

export const CardItem = ({ borderTop, borderBottom, ...restProps }) => {
  return (
    <>
      {borderTop && <Divider />}
      <Flex {...restProps} />
      {borderBottom && <Divider />}
    </>
  );
};

CardItem.Left = Flex;
CardItem.Right = Flex;
