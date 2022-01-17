import styled from "styled-components";
import { width, space } from "styled-system";

export const InputGroupAddon = styled.div`
  display: inline-flex;
  flex-shrink: 1;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid ${(props) => props.theme.colors.BORDER_LIGHT};
  ${width};
  ${space};
`;

export const InputGroup = styled.div`
  display: inline-flex;
  > input,
  > * {
    margin: 0;
    border-radius: 0;
    padding-right: 0;
    border-right: none;
    :last-child {
      border-right: 1px solid ${(props) => props.theme.colors.BORDER_LIGHT};
    }
    + input,
    + * {
      border-left: none;
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      padding-right: 8px;
    }
  }
  ${width};
  ${space};
`;

InputGroup.displayName = "InputGroup";
