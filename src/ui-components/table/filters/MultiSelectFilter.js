import React from "react";
import { MultiSelect } from "../../MultiSelect";
import { useToolbarContext } from "../context";

export const MultiSelectFilter = (props) => {
  const context = useToolbarContext();
  const { label, ...filterProps } = props.column["filterProps"];
  return (
    <MultiSelect
      label={label || props.column.render("Header")}
      value={props.column["filterValue"] || []}
      onChange={props.column["setFilter"]}
      mr="8px"
      onOpen={context?.expand}
      onClose={context?.collapse}
      {...filterProps}
    />
  );
};
