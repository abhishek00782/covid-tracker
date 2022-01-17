import React, { useRef, useEffect, useMemo } from "react";
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useFilters,
  useRowSelect,
  useRowState,
  useExpanded,
} from "react-table";

const IndeterminateCheckbox = ({ indeterminate, ...rest }) => {
  const resolvedRef = useRef(null);

  useEffect(() => {
    if (resolvedRef.current && indeterminate !== undefined)
      resolvedRef.current.indeterminate = indeterminate;
  }, [indeterminate, resolvedRef]);

  return <input type="checkbox" ref={resolvedRef} {...rest} />;
};

const selectionHook = (hooks) => {
  hooks.visibleColumns.push((columns, table) => {
    if (table.instance["disableRowSelect"]) {
      return columns;
    }
    return [
      // Let's make a column for selection
      {
        id: "selection",
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        minWidth: 45,
        width: 45,
        maxWidth: 45,
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox
              {...row.getToggleRowSelectedProps()}
              disabled={!!row["state"]["disabled"]}
            />
          </div>
        ),
      },
      ...columns,
    ];
  });
};

const hooks = [
  useFilters,
  useResizeColumns,
  useFlexLayout,
  selectionHook,
  useRowState,
  useExpanded,
  useRowSelect,
];

export function useDataGrid({
  pageSize = 5,
  pageIndex = 0,
  totalCount = 0,
  sizeOptions = [5, 10, 20, 50, 100],
  columns,
  renderRowSubComponent = () => null,
  showRowSubComponent = false,
  ...props
}) {
  const filter = useMemo(() => props.filter || [], [props.filter]);
  const instance = useTable(
    {
      initialState: {
        filters: filter,
      },
      filter,
      pageSize,
      pageIndex,
      totalCount,
      sizeOptions,
      manualFilters: true,
      columns: useMemo(
        () =>
          columns.map((it) => ({
            ...it,
            disableFilters: !it.hasFilter,
          })),
        [columns]
      ),
      showRowSubComponent,
      renderRowSubComponent,
      ...props,
    },
    ...hooks
  );

  useEffect(() => {
    instance["setAllFilters"](filter);
  }, [instance, filter]);
  return instance;
}
