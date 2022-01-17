import React, {
  useState,
  useRef,
  useCallback,
} from "react";
import { FixedSizeList as List } from "react-window";
import { Button, FormGroup, colors, Box, Popover } from "..";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineIndeterminateCheckBox,
  MdArrowDropUp,
  MdArrowDropDown,
} from "react-icons/md";

import {
  ControllerButton,
  DropdownContentHeader,
  OptionList,
  DropdownContentItem,
  SelectAll,
  Placeholder,
} from "../common/styles";
import MultiDownshift from "../common/MultiDownshift";
import { Search } from "../common/SelectSearch";
import { MultiSelectItemRenderer } from "./ItemRenderer";

function isPresent(items, item, itemToValue) {
  let found = false;
  for (let i = 0; i < items.length; i += 1) {
    if (itemToValue(items[i]) === itemToValue(item)) {
      found = true;
      break;
    }
  }
  return found;
}

export function MultiSelect({
  options,
  value,
  onChange,
  label = "Select...",
  itemToString: itemToStringBase = (item) => item || "",
  className = "",
  disabled = false,
  itemToValue = (item) => item,
  onClose,
  onOpen,
  filterOption,
  showSearch: _showSearch,
  noOptionsText = "No options",
  dropdownWidth = 280,
  ...rest
}) {
  const [showSelected, setShowSelected] = useState(false);
  const inputRef = useRef(null);
  const inputPropsOptions = {
    ref: inputRef,
  };
  let showSearch = _showSearch;
  if (_showSearch === undefined) {
    showSearch = options.length > 5;
  }
  const getButtonText = (items, its, isOpen) => {
    if (!items.length) {
      return isOpen ? (
        <Placeholder>Not selected</Placeholder>
      ) : (
        <span style={{ visibility: "hidden" }}>{label}</span>
      );
    }
    if (items.length === 1) {
      return its(items[0]);
    }
    return `${items.length} Selected`;
  };
  const removeItem = (item) => {
    return value.filter((i) => itemToValue(i) !== itemToValue(item));
  };

  const addSelectedItem = (item) => {
    return [...value, item];
  };
  const defaultFilterOption = useCallback(
    (option, filterString) => {
      if (!filterString) {
        return true;
      }
      if (
        itemToStringBase &&
        itemToStringBase(option)
          .toLowerCase()
          .includes(filterString.toLowerCase())
      ) {
        return true;
      }
      return false;
    },
    [itemToStringBase]
  );
  return (
    <MultiDownshift
      onChange={(selected) => {
        onChange(selected);
      }}
      selectedItems={value}
      itemToString={itemToStringBase}
      itemClicked={(item, cb) => {
        if (isPresent(value, item, itemToValue)) {
          cb(removeItem(item));
        } else if (item) {
          cb(addSelectedItem(item));
        }
      }}
      onOuterClick={() => {
        if (onClose) onClose();
      }}
    >
      {({
        getInputProps,
        getRootProps,
        isOpen,
        inputValue,
        getItemProps,
        getToggleButtonProps,
        selectedItems,
        highlightedIndex,
        itemToString,
      }) => {
        const selectedSet = new Set(
          selectedItems
            .filter((item) => {
              if (filterOption) {
                return filterOption(item, inputValue);
              }
              return defaultFilterOption(item, inputValue);
            })
            .map(itemToValue)
        );
        const workingSet = (
          showSelected
            ? options.filter((item) => selectedSet.has(itemToValue(item)))
            : options
        ).filter((item) => {
          if (filterOption) {
            return filterOption(item, inputValue);
          }
          return defaultFilterOption(item, inputValue);
        });
        const renderSelectAllIcon = () => {
          if (selectedSet.size === 0) {
            return <MdOutlineCheckBoxOutlineBlank size={18} />;
          }
          if (selectedSet.size === workingSet.length) {
            return <MdOutlineCheckBox color={colors.PRIMARY} size={18} />;
          }
          return (
            <MdOutlineIndeterminateCheckBox color={colors.PRIMARY} size={18} />
          );
        };
        const onSelectAll = () => {
          if (selectedSet.size === 0) {
            onChange([...value, ...workingSet]);
            return;
          }
          if (selectedSet.size === workingSet.length) {
            onChange(
              value.filter((item) => !selectedSet.has(itemToValue(item)))
            );
            return;
          }
          onChange([
            ...value,
            ...workingSet.filter((item) => !selectedSet.has(itemToValue(item))),
          ]);
        };

        return (
          <FormGroup
            className={className}
            label={label}
            {...rest}
            {...getRootProps()}
          >
            <Popover
              visible={isOpen}
              placement="bottom-start"
              content={
                <Box width={dropdownWidth}>
                  <DropdownContentHeader>
                    {showSearch ? (
                      <Search {...getInputProps(inputPropsOptions)} />
                    ) : null}
                    <DropdownContentItem>
                      {!showSelected ? (
                        <SelectAll
                          onClick={() => {
                            onSelectAll();
                            return inputRef.current?.focus();
                          }}
                        >
                          {renderSelectAllIcon()}
                          <span>Select All</span>
                        </SelectAll>
                      ) : null}
                      {showSelected ? (
                        <Button
                          type="button"
                          clear
                          px="4px"
                          onClick={() => {
                            setShowSelected(false);
                            return inputRef.current?.focus();
                          }}
                        >
                          &lt; Show all
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          clear
                          px="4px"
                          ml="auto"
                          onClick={() => {
                            setShowSelected(true);
                            return inputRef.current?.focus();
                          }}
                        >
                          Show only selected &gt;
                        </Button>
                      )}
                    </DropdownContentItem>
                  </DropdownContentHeader>

                  {!workingSet.length ? (
                    <OptionList>
                      <Box px={15} py="4px" color={colors.TEXT_DISABLED}>
                        {noOptionsText}
                      </Box>
                    </OptionList>
                  ) : null}
                  <List
                    width="100%"
                    height={
                      workingSet.length <= 5 ? workingSet.length * 28 : 160
                    }
                    itemCount={workingSet.length}
                    itemSize={28}
                    itemData={{
                      items: workingSet,
                      getItemProps,
                      highlightedIndex,
                      itemToString,
                      selectedSet,
                      itemToValue,
                    }}
                  >
                    {MultiSelectItemRenderer}
                  </List>
                </Box>
              }
            >
              <ControllerButton
                type="button"
                minTextLength={label.length}
                width={rest.width}
                {...getToggleButtonProps({
                  "aria-label": label,
                  className: `form-control ${value.length ? "non-empty" : ""} ${
                    isOpen ? "active" : ""
                  }`,
                  disabled,
                  onClick: () => {
                    if (isOpen) {
                      if (onClose) onClose();
                    } else if (onOpen) onOpen();
                  },
                })}
              >
                <span>
                  {getButtonText(selectedItems, itemToString, isOpen)}
                </span>
                {isOpen ? (
                  <MdArrowDropUp size={18} />
                ) : (
                  <MdArrowDropDown size={18} />
                )}
              </ControllerButton>
            </Popover>
          </FormGroup>
        );
      }}
    </MultiDownshift>
  );
}
