import styled, { css } from "styled-components";
import { Box } from "reflexbox";
import colors from "./../colors";

export const StyledBox = styled(Box)`
  overflow: hidden;
  word-wrap: break-word;
  position: relative;
  box-shadow: 0 2px 10px 0 ${colors.CARD_SHADOW},
    0 5px 15px 0 ${colors.CARD_SHADOW};
  ${({ outline }) =>
    outline
      ? css`
          border: 1px solid #f7f7f5;
        `
      : css``};
`;
