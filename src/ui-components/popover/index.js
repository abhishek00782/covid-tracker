import React, { ReactElement } from "react";
import Tippy, { TippyProps } from "@tippyjs/react/headless";
import styled, { css } from "styled-components";

const Container = styled.div`
  ${(props) =>
    props.bordered
      ? css`
          border-top: 2px solid ${(props) => props.theme.colors.PRIMARY};
        `
      : css``}
  box-shadow: 0px 0px 4px rgba(170, 170, 170, 0.5);
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.BACKGROUND};
`;

export function Popover({ content, bordered, ...rest }) {
  return (
    <Tippy
      render={(attrs) => (
        <Container bordered={bordered} {...attrs}>
          {content}
        </Container>
      )}
      trigger="click"
      placement="bottom-end"
      interactive
      offset={[0, 4]}
      {...rest}
    />
  );
}
