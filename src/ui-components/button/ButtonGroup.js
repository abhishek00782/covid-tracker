import styled, { css } from "styled-components";
import { space } from "styled-system";
import { Button } from ".";

export const ButtonGroup = styled.div`
  display: flex;
  ${Button} {
    margin: 0;
    border-radius: 0;

    + ${Button} {
      border-left: 0;
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  ${(props) =>
    props.justify
      ? css`
          width: 100%;

          ${Button} {
            flex: 1 0 auto;
          }
        `
      : css``};
  ${space};
`;

ButtonGroup.displayName = "ButtonGroup";
