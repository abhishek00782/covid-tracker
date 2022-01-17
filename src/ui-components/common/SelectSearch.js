import React, { forwardRef } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { Input, InputGroup, InputGroupAddon, colors } from "..";

const Container = styled(InputGroup)`
  &:focus-within {
    > * {
      border-top-color: ${colors.PRIMARY};
      border-bottom-color: ${colors.PRIMARY};
      :last-child {
        border-right-color: ${colors.PRIMARY};
      }
      :first-child {
        border-left-color: ${colors.PRIMARY};
      }
    }
  }
`;

export const Search = forwardRef((props, ref) => (
  <Container m="8px">
    <Input autoFocus placeholder="Search" {...props} ref={ref} />
    <InputGroupAddon>
      <MdSearch color={colors.PRIMARY} />
    </InputGroupAddon>
  </Container>
));
