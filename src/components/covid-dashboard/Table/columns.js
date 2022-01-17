import React from "react";
import {
  MultiSelectFilter,
  NumberRangeFilter,
} from "../../../ui-components/table/filters";
import { formatNumber } from "../../../common/utils/index";
import { Box } from "reflexbox";
const COLUMNS = (filterprops) => [
  {
    id: "Country",
    Header: "Country",
    accessor: "Country",
    hasFilter: true,
    Filter: MultiSelectFilter,
    filterProps: {
      label: "Country Name",
      inputWidth: 150,
      options: filterprops,
    },
    canSort: true,
    filterOrder: 1,
  },
  {
    id: "Confirmed",
    Header: "Confirmed Cases",
    columns: [
      {
        id: "NewConfirmed",
        Header: "New Confirmed",
        accessor: "NewConfirmed",
        hasFilter: true,
        Filter: NumberRangeFilter,
        filterProps: {
          label: "New confirmed",
          inputWidth: 140,
        },
        Cell: ({ row }) => <Box>{formatNumber(row.original.NewConfirmed)}</Box>,
        canSort: true,
        filterOrder: 2,
      },
      {
        id: "TotalConfirmed",
        Header: "Total Confirmed",
        accessor: "TotalConfirmed",
        Cell: ({ row }) => (
          <Box>{formatNumber(row.original.TotalConfirmed)}</Box>
        ),
        hasFilter: true,
        Filter: NumberRangeFilter,
        filterProps: {
          label: "Total confirmed",
          inputWidth: 140,
        },
        canSort: true,
        filterOrder: 3,
      },
    ],
  },
  {
    id: "Deaths",
    Header: "Death Cases",
    columns: [
      {
        id: "NewDeaths",
        Header: "New Deaths",
        accessor: "NewDeaths",
        Cell: ({ row }) => <Box>{formatNumber(row.original.NewDeaths)}</Box>,
        hasFilter: true,
        Filter: NumberRangeFilter,
        filterProps: {
          label: "New Deaths",
          inputWidth: 140,
        },
        canSort: true,
        filterOrder: 4,
      },
      {
        id: "TotalDeaths",
        Header: "Total Deaths",
        accessor: "TotalDeaths",
        Cell: ({ row }) => <Box>{formatNumber(row.original.TotalDeaths)}</Box>,
        hasFilter: true,
        Filter: NumberRangeFilter,
        filterProps: {
          label: "Total Deaths",
          inputWidth: 140,
        },
        canSort: true,
        filterOrder: 5,
      },
    ],
  },
  {
    id: "Recovered",
    Header: "Recovered Cases",
    columns: [
      {
        id: "NewRecovered",
        Header: "New Recovered",
        accessor: "NewRecovered",
        Cell: ({ row }) => <Box>{formatNumber(row.original.NewRecovered)}</Box>,
        hasFilter: true,
        Filter: NumberRangeFilter,
        filterProps: {
          label: "New Recovered",
          inputWidth: 140,
        },
        canSort: true,
        filterOrder: 6,
      },
      {
        id: "TotalRecovered",
        Header: "Total Recovered",
        accessor: "TotalRecovered",
        Cell: ({ row }) => (
          <Box>{formatNumber(row.original.TotalRecovered)}</Box>
        ),
        hasFilter: true,
        Filter: NumberRangeFilter,
        filterProps: {
          label: "Total Recovered",
          inputWidth: 140,
        },
        canSort: true,
        filterOrder: 7,
      },
    ],
  },
];

export default COLUMNS;
