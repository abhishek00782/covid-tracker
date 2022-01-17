import styled, { css } from "styled-components";
import { Box } from "reflexbox";
import colors from "../colors";
const tableShadow = () => css`
  box-shadow: 0 2px 4px 0 ${colors.TABLE_SHADOW};
`;
export const CenterRow = styled.div`
  text-align: center !important;
  color: ${(props) =>
    props.error
      ? props.theme.colors.FAILURE
      : props.theme.colors.TEXT_DISABLED};
`;

export const StyledContainer = styled(Box)`
  ${tableShadow};
  background-color: ${(props) => props.theme.colors.BACKGROUND};
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  .table-container {
    overflow-x: scroll;
  }
  .toolbar ~ .table-container {
    margin-top: 60px;
  }
  .table {
    .thead {
      background-color: #f6faff;
    }
    .thead:hover .resizer {
      border-right: 1px solid #e1e6ea;
    }
    .resizer {
      display: inline-block;
      width: 10px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      touch-action: none;
      &.isResizing {
        background: #e1e6ea;
      }
    }
    .sortable {
      cursor: pointer;
    }
    .tr {
      border-bottom: 1px solid #e1e6ea;
      .th,
      .td {
        padding: 12px;
        text-align: left;
      }
      .th {
        padding: 0;
        outline: none;
        user-select: none;
      }
      .td {
        word-break: break-all;
      }
      .th::before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
    }
  }
  .pagination {
    box-shadow: none;
    border-top: none;
    padding: 5px 10px;
    justify-content: flex-end;
    color: #757e86;
    display: flex;
    align-items: center;
    height: 44px;
    input,
    select {
      font-size: 11px;
      height: 24px;
      border: none;
      background: #f7f7f5;
    }
    button {
      color: ${(props) => props.theme.colors.TEXT};
    }
    select {
      margin-right: 8px;
      width: 48px;
    }
    input {
      text-align: center;
      width: 24px;
      border-radius: 2px;
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    .left-separator {
      border-left: 1px solid #e1e6ea;
    }
    .circle {
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #e1e6ea;
      border-radius: 3px;
    }
    .currentPage {
      padding: 0 10px;
      border-left: 1px solid #757e86;
    }
    .pageOptions {
      margin-right: 10px;
    }
  }
`;

const sort = ({ order }) => {
  if (!order) {
    return css`
      display: none;
    `;
  }
  if (order === "asc") {
    return css`
      top: 0;
    `;
  }
  if (order === "desc") {
    return css`
      bottom: 0;
    `;
  }
  return css``;
};

export const SortIndicator = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  background-color: ${(props) => props.theme.colors.PRIMARY};
  ${sort};
`;

export const Row = styled.div`
  ${(props) =>
    props.isSelected
      ? css`
          background-color: #ecf3fb;
        `
      : css``};
  ${(props) =>
    props.isDisabled
      ? css`
          opacity: 0.4;
        `
      : css``};
`;

export const FiltersContainer = styled(Box)`
  overflow-x: hidden;
  padding: 12px;
  padding-right: 8px;
  padding-top: 4px;
  min-width: 78%;
  white-space: nowrap;
  overflow: hidden;
`;
