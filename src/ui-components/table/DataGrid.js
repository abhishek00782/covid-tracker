import React, { useCallback } from "react";
import { Box } from "reflexbox";
import { Button } from "../button";
import colors from "../colors";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdUnfoldMore,
} from "react-icons/md";
// import { ICON_NAME } from 'react-icons/md'
import { TableBodyLoader } from "./Loader";
import { SortIndicator, Row, CenterRow } from "./styles";

export function DataGrid({ instance, className }) {
  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    pageSize,
    sort,
    onSortChange,
    data,
    loaded,
    error,
    handleRefresh = () => {},
    visibleColumns,
    renderRowSubComponent,
    showRowSubComponent,
  } = instance;
  const getStyles = (_props, align = "left") => [
    _props,
    {
      style: {
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        alignItems: "flex-start",
        display: "flex",
        textAlign: align,
      },
    },
  ];
  const headerProps = (_props, { column }) =>
    getStyles(_props, column && column.align);

  const cellProps = (_props, { cell }) =>
    getStyles(_props, cell.column && cell.column.align);

  const renderDummyRows = useCallback(() => {
    if (pageSize !== undefined) {
      const dummyRowsCount = pageSize - data.length;
      const dummyRows = [];

      for (let i = 0; i < dummyRowsCount; i += 1) {
        dummyRows.push(<Box className="tr" height={44} key={i} />);
      }

      // Show informational text in case table contains no results / error
      if (error || data.length === 0) {
        dummyRows[Math.min(Math.ceil(dummyRowsCount / 2), 4)] = (
          <Row className="tr" key={"error_text"}>
            <CenterRow error={error} className="td">
              {error ? (
                <>
                  Something went wrong.
                  <Button px="4px" mx="4px" clear onClick={handleRefresh}>
                    Try Again
                  </Button>
                </>
              ) : (
                "No matching results"
              )}
            </CenterRow>
          </Row>
        );
      }

      return dummyRows;
    }
    return [];
  }, [data, error, handleRefresh, pageSize]);

  const onSortClick = (id, canSort) => {
    if (canSort) {
      if (sort?.by !== id) {
        if (onSortChange)
          onSortChange({
            by: id,
            order: "asc",
          });
      } else if (sort?.order === "asc") {
        if (onSortChange)
          onSortChange({
            by: sort?.by,
            order: "desc",
          });
      } else if (sort?.order === "desc") {
        if (onSortChange) {
          onSortChange({
            by: null,
            order: null,
          });
        }
      }
    }
  };

  const renderSortIndicator = (id) => {
    if (id === sort?.by) {
      return <SortIndicator order={sort.order} />;
    }
    return <SortIndicator />;
  };

  const renderSortArrows = (id) => {
    if (id === sort?.by) {
      return sort.order === "desc" ? (
        <MdKeyboardArrowDown size={18} color={colors.PRIMARY} />
      ) : (
        <MdKeyboardArrowUp size={18} color={colors.PRIMARY} />
      );
    }
    return <MdUnfoldMore size={18} />;
  };

  return (
    <div className={`${className} table-container`}>
      <div className="table" {...getTableProps()}>
        <div className="thead">
          {headerGroups.map((headerGroup) => (
            <div className="tr" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                column.hideColumn ? null : (
                  <div
                    className={`th ${column.canSort ? "sortable" : ""}`}
                    onClick={() => onSortClick(column.id, column.canSort)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onSortClick(column.id, column.canSort);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    {...column.getHeaderProps(headerProps)}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "12px",
                      }}
                    >
                      {column.render("Header")}
                      {column.canSort ? renderSortArrows(column.id) : null}
                    </span>
                    {column.canSort ? renderSortIndicator(column.id) : null}

                    {column.canResize ? (
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? "isResizing" : ""
                        }`}
                      />
                    ) : null}
                  </div>
                )
              )}
            </div>
          ))}
        </div>

        {loaded ? (
          <div className="tbody" {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return (
                <Row
                  isDisabled={row.state.disabled}
                  isSelected={row.isSelected}
                  className="tr"
                >
                  <div {...rowProps}>
                    {row.cells.map((cell) =>
                      cell.column.hideColumn ? null : (
                        <div className="td" {...cell.getCellProps(cellProps)}>
                          {cell.render("Cell")}
                        </div>
                      )
                    )}
                  </div>

                  <Box width="100%" className="subComponent">
                    {/* If showRowSubComponent is true then sub component will be shown always  */}
                    {showRowSubComponent || row.isExpanded
                      ? renderRowSubComponent({
                          row,
                          rowProps,
                          visibleColumns,
                        })
                      : null}
                  </Box>
                </Row>
              );
            })}
            {renderDummyRows()}
          </div>
        ) : (
          <TableBodyLoader size={pageSize} />
        )}
      </div>
    </div>
  );
}
