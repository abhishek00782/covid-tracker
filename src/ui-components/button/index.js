import styled, { css } from "styled-components";
import { space, width } from "styled-system";
const buttonHoverShadow = () => css`
  box-shadow: 2px 4px 8px 0 #e6e6e6;
`;

const buttonColors = ({ theme, outline, clear }) => css`
  color: ${theme.colors.BACKGROUND};
  border-color: ${theme.colors.PRIMARY};
  background: ${theme.colors.PRIMARY};
  &:hover:not(:disabled) {
    ${buttonHoverShadow};
    background: ${theme.colors.PRIMARY};
  }
  &:active:not(:disabled) {
    background: ${theme.colors.BUTTON_PRESSED};
  }

  ${outline &&
  css`
    color: ${theme.colors.PRIMARY};
    border-color: ${theme.colors.PRIMARY};
    background: ${theme.colors.BACKGROUND};
    &:hover:not(:disabled) {
      ${buttonHoverShadow};
      background: ${theme.colors.BACKGROUND_HOVER};
      color: ${theme.colors.PRIMARY};
    }
    &:active:not(:disabled),
    &.active:not(:disabled) {
      color: ${theme.colors.BUTTON_PRESSED};
      border-color: ${theme.colors.BUTTON_PRESSED};
    }
  `};

  ${clear &&
  css`
    color: ${theme.colors.TEXT_ACTION};
    &:hover:not(:disabled) {
      background: ${theme.colors.BACKGROUND_HOVER};
      box-shadow: none;
    }
    &:active:not(:disabled),
    &.active:not(:disabled) {
      background: ${theme.colors.BUTTON_PRESSED};
      color: ${theme.colors.BACKGROUND};
    }
  `};
`;

export const Button = styled.button`
  padding: 5px 20px;
  min-width: 100px;
  text-align: center;
  text-decoration: none;
  border: 1px solid currentColor;
  cursor: pointer;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }
  &:focus {
    outline: none;
  }

  &:hover {
    text-decoration: none;
  }
  ${buttonColors};
  ${(props) =>
    props.big
      ? css`
          padding: 10px 20px;
        `
      : css``};
  ${(props) =>
    props.clear
      ? css`
          border: none;
          background: transparent;
          padding: 0;
          min-width: auto;
        `
      : css``};
  ${space};
  ${width};
`;

Button.displayName = "Button";
