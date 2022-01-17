import { Card, CardItem } from "../../ui-components/card";
import React from "react";
import { connect } from "react-redux";
import { Box, Flex } from "reflexbox";
import colors from "../../ui-components/colors";
import { IoMdSquare } from "react-icons/io";
import { ContentLoaders, ChartLoaders } from "../../common/utils/ContentLoader";
import { formatNumber } from "../../common/utils/index";
import { DoughnutChart } from "./charts/charts";

const GlobalSummaryCard = ({ summaryData, isLoading }) => {
  return (
    <>
      <Card bg={colors.BACKGROUND} p={4} width={"100%"}>
        <CardItem>
          <CardItem.Left
            width="50%"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <Flex width={"100%"}>
              <strong>Coronavirus Cases</strong> - worldwide
            </Flex>
            <Flex width={"100%"} flexWrap="wrap">
              <Box
                width={[1, 1 / 2]}
                p={3}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                }}
              >
                <Box width={[1]} p={3}>
                  <p>Total Confirmed Cases</p>
                  {isLoading ? (
                    <ContentLoaders />
                  ) : (
                    <h3>
                      <IoMdSquare color={colors.WARNING} />{" "}
                      {formatNumber(summaryData?.TotalConfirmed)}
                    </h3>
                  )}
                </Box>

                <Box width={[1]} p={3}>
                  <p>Total Death Cases</p>
                  {isLoading ? (
                    <ContentLoaders />
                  ) : (
                    <h3>
                      <IoMdSquare color={colors.FAILURE} />{" "}
                      {formatNumber(summaryData?.TotalDeaths)}
                    </h3>
                  )}
                </Box>

                <Box width={[1]} p={3}>
                  <p>Total Recovered Cases</p>
                  {isLoading ? (
                    <ContentLoaders />
                  ) : (
                    <h3>
                      <IoMdSquare color={colors.STATUS_GREEN} />{" "}
                      {formatNumber(summaryData?.TotalRecovered)}
                    </h3>
                  )}
                </Box>
              </Box>
              <Box width={[1, 1 / 2]} p={3} style={{ width: "40%" }}>
                {isLoading ? (
                  <ChartLoaders />
                ) : (
                  <DoughnutChart
                    label={[
                      "Total Confirmed",
                      "Total Deaths",
                      "Total Recovered",
                    ]}
                    data={[
                      summaryData?.TotalConfirmed,
                      summaryData.TotalDeaths,
                      summaryData.TotalRecovered,
                    ]}
                    colors={[
                      colors.WARNING,
                      colors.FAILURE,
                      colors.STATUS_GREEN,
                    ]}
                  />
                )}
              </Box>
            </Flex>
          </CardItem.Left>
          <CardItem.Right
            style={{
              borderLeft: `1px dashed ${colors.BORDER_LIGHT}`,
              overflowY: "auto",
              width: "50%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Flex width={"100%"} p={3}>
              <strong>Coronavirus Cases</strong> - worldwide (Recent)
            </Flex>
            <Flex width={"100%"} flexWrap="wrap">
              <Box width={[1, 1 / 2]} p={3}>
                <Box width={[1]} p={3}>
                  <p>New Confirmed Cases</p>
                  {isLoading ? (
                    <ContentLoaders />
                  ) : (
                    <h3>
                      <IoMdSquare color={colors.WARNING} />{" "}
                      {formatNumber(summaryData?.NewConfirmed)}
                    </h3>
                  )}
                </Box>
                <Box width={[1]} p={3}>
                  <p>New Death Cases</p>
                  {isLoading ? (
                    <ContentLoaders />
                  ) : (
                    <h3>
                      <IoMdSquare color={colors.FAILURE} />{" "}
                      {formatNumber(summaryData?.NewDeaths)}
                    </h3>
                  )}
                </Box>
                <Box width={[1]} p={3}>
                  <p>New Recovered Cases</p>
                  {isLoading ? (
                    <ContentLoaders />
                  ) : (
                    <h3>
                      <IoMdSquare color={colors.STATUS_GREEN} />{" "}
                      {formatNumber(summaryData?.NewRecovered)}
                    </h3>
                  )}
                </Box>
              </Box>
              <Box width={[1, 1 / 2]} p={3} style={{ width: "40%" }}>
                {isLoading ? (
                  <ChartLoaders />
                ) : (
                  <DoughnutChart
                    label={["New Confirmed", "New Deaths", "New Recovered"]}
                    data={[
                      summaryData?.NewConfirmed,
                      summaryData.NewDeaths,
                      summaryData.NewRecovered,
                    ]}
                    colors={[
                      colors.WARNING,
                      colors.FAILURE,
                      colors.STATUS_GREEN,
                    ]}
                  />
                )}
              </Box>
            </Flex>
          </CardItem.Right>
        </CardItem>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.CovidDetailsReducer.loading,
    summaryData: state.CovidDetailsReducer.globalData,
  };
};

export default connect(mapStateToProps)(GlobalSummaryCard);
