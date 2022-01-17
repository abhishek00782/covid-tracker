import React, { useState, useEffect, useMemo } from "react";
import colors from "../../../ui-components/colors";
import { Box } from "reflexbox";
import {
  DataGrid,
  useDataGrid,
  StyledContainer,
  Paginator,
  Toolbar,
} from "../../../ui-components/table";
import COLUMNS from "./columns";
import { constructTableData } from "../../../common/utils/index";

const CovidTable = ({
  loading,
  colData,
  filter,
  filterprops,
  sort,
  setFilter,
  setSort,
}) => {
  const initialState = {
    page: 0,
    size: 5,
    tableData: {
      items: [],
      count: 0,
    },
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    setData((preState) => ({
      ...preState,
      tableData: { ...constructTableData(data.page, data.size, colData) },
    }));
  }, [data.page, data.size, colData]);

  const instance = useDataGrid({
    loaded: !loading,
    columns: useMemo(() => COLUMNS(filterprops), [colData]),
    data: data?.tableData?.items || [],
    totalCount: data?.tableData?.count || 0,
    pageIndex: data.page,
    pageSize: data.size,
    disableRowSelect: true,
    filter,
    onFilterChange: (f) => {
      setFilter(f);
    },
    sort,
    onSortChange: setSort,
    onPageIndexChange: (index) => {
      setData((preState) => ({ ...preState, page: index }));
    },
    onPageSizeChange: (s) => {
      setData((preState) => ({ ...preState, size: s }));
      setData((preState) => ({ ...preState, page: 0 }));
    },
  });

  return (
    <Box bg={colors.TEXT_WHITE}>
      <StyledContainer
        style={{
          paddingTop: "0px",
        }}
      >
        <Toolbar instance={instance} />
        <DataGrid instance={instance} />
        <Paginator instance={instance} />
      </StyledContainer>
    </Box>
  );
};

export default CovidTable;
