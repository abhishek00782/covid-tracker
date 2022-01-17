/* eslint-disable jsx-a11y/label-has-for */
import React, { forwardRef } from "react";
import { FormGroupWrapper, IconWrapper } from "./styles";

export { FormGroupCombo } from "./styles";

export const FormGroup = forwardRef(
  (
    { name, label = "", className = "", icon, leftIcon, children, ...rest },
    ref
  ) => (
    <FormGroupWrapper
      left={!!leftIcon}
      right={!!icon}
      className={className}
      ref={ref}
      {...rest}
    >
      {children}
      {icon && (
        <IconWrapper right left={false}>
          {icon}
        </IconWrapper>
      )}
      {leftIcon && (
        <IconWrapper right={false} left>
          {leftIcon}
        </IconWrapper>
      )}
      {label && (
        <label htmlFor={name}>
          <small>{label}</small>
        </label>
      )}
    </FormGroupWrapper>
  )
);
