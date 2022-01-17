import styled, { css } from "styled-components";
import { space, width } from "styled-system";

const floatLabel = () => css`
  & ~ label {
    top: 0;
    left: 9px;
    padding: 0 4px;
    transform: translateY(-50%) scale(1);
    background-color: ${(props) => props.theme.colors.BACKGROUND};
  }
`;

export const FormGroupWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 8px;
  label {
    position: absolute;
    transition: transform 0.1s ease-out, top 0.1s ease-out, left 0.1s ease-out;
    display: inline-block;
    transform: translateY(-55%) scale(1.18);
    transform-origin: left;
    left: ${(props) => (props.left ? "32px" : "12px")};
    top: 18px;
    pointer-events: none;
  }
  > .form-control {
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.BACKGROUND};
    &:not(textarea) {
      height: 36px;
    }
    &:hover,
    &:focus,
    &.active {
      border: 1px solid ${(props) => props.theme.colors.PRIMARY};
    }
    &:focus,
    &.active,
    &.non-empty,
    &[value]:not([value=""]) {
      ${floatLabel};
    }
    ${(props) =>
      props.right
        ? css`
            padding-right: 32px;
          `
        : css``};
    ${(props) =>
      props.left
        ? css`
            padding-left: 32px;
          `
        : css``};
  }
  > textarea.form-control {
    &:not(:empty) {
      ${floatLabel};
    }
  }
  ${space};
  ${width};
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  width: 20px;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.right
      ? css`
          right: 8px;
        `
      : css``};
  ${(props) =>
    props.left
      ? css`
          left: 8px;
        `
      : css``};
`;

export const FormGroupCombo = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  margin-top: 8px;
  border: 1px solid ${(props) => props.theme.colors.BORDER_LIGHT};
  &:hover,
  &:focus-within,
  &.active {
    border: 1px solid ${(props) => props.theme.colors.PRIMARY};
  }
  ${FormGroupWrapper} {
    margin-top: 0;
  }
  .form-control {
    border: none;
    &:not(textarea) {
      height: 34px;
    }
    &:hover,
    &:focus,
    &.active {
      border: none;
    }
  }
  ${space};
`;
