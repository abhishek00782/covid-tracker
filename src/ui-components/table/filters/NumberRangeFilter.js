import React from "react";
import { NumberRangePicker } from "./NumberRange";
import { useToolbarContext } from "../context";

export const NumberRangeFilter = (props) => {
  const context = useToolbarContext();
  console.log(props.column);
  const { label, ...filterProps } = props.column["filterProps"];
  return (
    <NumberRangePicker
      label={label || props.column.render("Header")}
      value={props.column["filterValue"] || {}}
      onChange={props.column["setFilter"]}
      mr="8px"
      {...filterProps}
    />
  );
};
