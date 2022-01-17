import React from "react";
import Downshift from "downshift";

function MultiDownshift({
  onChange,
  children,
  selectedItems,
  itemClicked,
  ...rest
}) {
  const stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          inputValue: state.inputValue,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
        };
      default:
        return changes;
    }
  };

  const getStateAndHelpers = (downshift) => {
    return {
      selectedItems,
      ...downshift,
    };
  };
  const handleSelection = (item, downshift) => {
    const callOnChange = (items) => {
      if (onChange) {
        onChange(items, getStateAndHelpers(downshift));
      }
    };
    if (item) {
      itemClicked(item, callOnChange);
    }
  };

  return (
    <Downshift
      {...rest}
      stateReducer={stateReducer}
      onChange={handleSelection}
      selectedItem={null}
    >
      {(downshift) => children(getStateAndHelpers(downshift))}
    </Downshift>
  );
}

export default MultiDownshift;
