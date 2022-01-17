import React, { useCallback, useState } from "react";
import { FormGroup, FormGroupCombo, Input } from "../..";

export const NumberRangePicker = ({
  label,
  value,
  onChange,
  disabled = false,
  inputWidth,
  ...rest
}) => {
  const [selecting, setSelecting] = useState(null);

  const updateCalendar = useCallback(
    (inputValue) => {
      try {
        if (selecting === "from") {
          onChange({
            from: inputValue,
            to: value.to,
          });
        } else if (selecting === "to") {
          onChange({
            from: value.from,
            to: inputValue,
          });
        }
      } catch (err) {
        // invalid date, do nothing
      }
    },
    [onChange, selecting, value]
  );

  return (
    <FormGroupCombo
      style={{
        position: "relative",
      }}
      {...rest}
    >
      <FormGroup
        name={`${label} start`}
        label={`${label} start`}
        width={inputWidth}
      >
        <Input
          className="form-control"
          type="text"
          {...(selecting === "from"
            ? {
                onChange: (e) => {
                  updateCalendar(e.target.value);
                },
              }
            : {
                value: value.from || "",
              })}
          value={value.from || ""}
          onFocus={() => {
            setSelecting("from");
          }}
          disabled={disabled}
        />
      </FormGroup>
      -
      <FormGroup
        name={`${label} end`}
        label={`${label} end`}
        width={inputWidth + 10}
      >
        <Input
          className="form-control"
          type="text"
          {...(selecting === "to"
            ? {
                onChange: (e) => {
                  updateCalendar(e.target.value);
                },
              }
            : {
                value: value.to || "",
              })}
          value={value.to || ""}
          onFocus={() => {
            setSelecting("to");
          }}
          disabled={disabled}
        />
      </FormGroup>
    </FormGroupCombo>
  );
};
