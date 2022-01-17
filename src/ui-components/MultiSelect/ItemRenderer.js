import React from "react";
import { colors } from "..";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { Option, CheckboxContainer } from "../common/styles";

export function MultiSelectItemRenderer({ data, style, index }) {
  const {
    getItemProps,
    itemToValue,
    highlightedIndex,
    itemToString,
    items,
    selectedSet,
  } = data;
  const item = items[index];
  return (
    <Option
      style={style}
      className={highlightedIndex === index ? "active" : ""}
      {...getItemProps({
        index,
        item,
      })}
      title={itemToString(item)}
    >
      <CheckboxContainer>
        {selectedSet.has(itemToValue(item)) ? (
          <MdOutlineCheckBox size={18} color={colors.PRIMARY} />
        ) : (
          <MdOutlineCheckBoxOutlineBlank size={18} />
        )}
      </CheckboxContainer>
      <span>{itemToString(item)}</span>
    </Option>
  );
}
