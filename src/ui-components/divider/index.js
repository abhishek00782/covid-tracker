import styled, { css } from "styled-components";
import { space, width, height } from "styled-system";
import { colors } from "..";

export const Divider = styled.div`
  ${(props) =>
    props.vertical
      ? css`
          align-self: stretch;
          width: 1px;
        `
      : css`
          height: 1px;
          width: 100%;
        `};

  background-color: ${colors.BORDER_TILE};
  ${space};
  ${width};
  ${height};
`;

Divider.defaultProps = {
  vertical: false,
};

Divider.displayName = "Divider";
