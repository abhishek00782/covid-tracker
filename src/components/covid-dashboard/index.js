import React, { useCallback, useEffect } from "react";
import { Box, Flex } from "reflexbox";
import colors from "../../ui-components/colors";
import GlobalSummaryCard from "./GlobalSummary";
import CountryTable from "./CountryTables";
import { fetchCovidDetails } from "./action";
import { connect } from "react-redux";
import { Button } from "../../ui-components";
import { MdRefresh } from "react-icons/md";

const Dashboard = ({ getCovidData, lastUpdated }) => {
  useEffect(() => {
    getCovidData([], null);
  }, [getCovidData]);
  const resetData = useCallback(
    (filter, sort) => getCovidData(filter, sort),
    [getCovidData]
  );
  return (
    <>
      <Flex
        style={{
          boxShadow: "0px -3px 4px 0px rgba(170, 170, 170, 0.5)",
          paddingRight: "10px",
          zIndex: 1,
          position: "sticky",
          backgroundColor: colors.BACKGROUND,
          top: 0,
        }}
        height={60}
        justifyContent="flex-end"
        alignItems="center"
        width={"100%"}
        ml="auto"
        flexGrow={1}
      >
        <Box>
          <Button onClick={() => resetData([], null)}>
            <MdRefresh size={18} />
            Refresh
          </Button>
        </Box>
        <Box p={3}>
          <p
            style={{ color: colors.TEXT_LIGHT_2 }}
          >{`Last Updated: ${lastUpdated}`}</p>
        </Box>
      </Flex>
      <Flex
        width="100%"
        px={20}
        py={20}
        style={{
          background: colors.BACKGROUND_GRAY,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <GlobalSummaryCard />
        <CountryTable resetandFilterData={resetData} />
      </Flex>
    </>
  );
};
const mapStateToProps = (state) => {
  return { lastUpdated: state.CovidDetailsReducer.lastUpdated };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCovidData: (filter, sort) => dispatch(fetchCovidDetails(filter, sort)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
