import axios from "axios";
import * as types from "./action-types";

export const fetchCovidDetails = (filter, sort) => async (dispatch) => {
  try {
    dispatch({
      type: types.SET_COVID_DETAILS_LOADING,
      payload: true,
    });
    const { data } = await axios.get("https://api.covid19api.com/summary");
    dispatch({
      type: types.FETCH_COVID_DETAILS,
      payload: data,
    });
    dispatch({
      type: types.FILTER_COVID_DETAILS,
      payload: filter,
    });
    dispatch({
      type: types.SORT_COVID_DETAILS,
      payload: sort,
    });
  } catch (e) {
    dispatch({
      type: types.SET_COVID_DETAILS_LOADING,
      payload: false,
    });
  }
};

export const sortData = (sort) => {
  return {
    type: types.SORT_COVID_DETAILS,
    payload: sort,
  };
};
export const filterData = (filter) => {
  return {
    type: types.FILTER_COVID_DETAILS,
    payload: filter,
  };
};
