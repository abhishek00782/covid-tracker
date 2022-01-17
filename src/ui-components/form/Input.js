import styled, { css } from "styled-components";
import { space, width, height } from "styled-system";

export const Input = styled.input`
  appearance: none;
  display: inline-block;
  color: inherit;
  border-width: 1px;
  border-style: solid;
  margin: 0;
  font-family: inherit;
  min-width: 1px;
  padding: 5px 10px;
  border-radius: 4px;

  ${({ theme }) => css`
    border-color: ${theme.colors.BORDER_LIGHT};
    ::placeholder {
      color: ${theme.colors.TEXT_DISABLED};
    }
    :focus {
      outline: none;
    }
  `};
  ${width};
  ${space};
  ${height};
`;

Input.defaultProps = {
  width: "100%",
  height: 28,
};

Input.displayName = "Input";
