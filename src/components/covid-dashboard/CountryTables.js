import { Card } from "../../ui-components/card";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import colors from "../../ui-components/colors";
import CovidTable from "./Table/index";
import { sortData, filterData } from "./action";

const CountryTable = ({
  countryData,
  loading,
  countryList,
  sortData,
  resetandFilterData,
}) => {
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState({
    by: null,
    order: null,
  });
  useEffect(() => {
    if (sort?.by && sort?.order) {
      sortData(sort);
    }
  }, [sort, sortData]);
  useEffect(() => {
    resetandFilterData(filter, sort);
  }, [filter, resetandFilterData]);
  return (
    <>
      <Card
        header={<strong>Covid Details</strong>}
        width="100%"
        px={3}
        py={3}
        mr={2}
        bg={colors.BACKGROUND}
      >
        <CovidTable
          colData={countryData || []}
          loading={loading}
          filter={filter}
          sort={sort}
          filterprops={countryList}
          setSort={setSort}
          setFilter={setFilter}
        />
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    countryData: state.CovidDetailsReducer.countriesData || [],
    countryList: state.CovidDetailsReducer.countryList || [],
    loading: state.CovidDetailsReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => ({
  sortData: (sort) => dispatch(sortData(sort)),
  filterData: (filter) => dispatch(filterData(filter)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CountryTable);
