import styled, { css } from "styled-components";
import { space, width } from "styled-system";
import colors from "../colors";
const dropdownShadow = () => css`
  box-shadow: 0 0 4px 0 ${colors.DROPDOWN_SHADOW};
`;
const dropdownItemStyles = () => css`
  padding: 4px 7px;
  display: flex;
  align-items: center;
  span {
    margin-left: 8px;
  }
`;

export const Placeholder = styled.span`
  color: ${(props) => props.theme.colors.TEXT_DISABLED};
`;

export const ControllerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.BACKGROUND};
  border: 1px solid ${(props) => props.theme.colors.BORDER_LIGHT};
  cursor: pointer;
  height: 30px;
  padding-left: 10px;
  padding-right: 3px;
  min-width: ${(props) => props.minTextLength * 8}px;
  &:hover,
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.PRIMARY};
  }
  &:disabled {
    cursor: default;
  }
  > span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  ${width};
`;

export const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  max-height: 160px;
`;

export const CheckboxContainer = styled.div`
  flex-shrink: 1;
`;

export const SearchDropdownContent = styled.div`
  background: white;
  position: absolute;
  border-radius: 4px;
  z-index: 10;
  margin-top: 4px;
  border-top: ${(props) => (props.color ? `2px solid ${props.color}` : "none")};
  ${dropdownShadow};
  ${space};
  ${width};
  max-width: 100%;
`;

export const DropdownTitle = styled.small`
  margin-bottom: 12px;
`;

export const DropdownContentHeader = styled.div`
  border-bottom: 1px dashed ${(props) => props.theme.colors.BORDER_LIGHT};
  display: flex;
  flex-direction: column;
`;

export const DropdownContentItem = styled.div`
  ${dropdownItemStyles};
  ${space};
`;

export const SelectAll = styled.div`
  cursor: pointer;
  user-select: none;
  &:focus {
    outline: none;
  }
`;

export const Option = styled.li`
  cursor: pointer;
  &.active {
    background-color: ${(props) => props.theme.colors.BACKGROUND_GRAY};
  }
  ${dropdownItemStyles};
  > span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
