import * as types from "./action-types";

const initialState = {
  globalData: {},
  countriesData: [],
  countryList: [],
  lastUpdated: "",
  loading: true,
};
const sort = (data, payload) => {
  return data.sort((a, b) => {
    if (payload.order === "desc") {
      if (
        typeof b[payload.by] == "number" &&
        typeof a[payload.by] === "number"
      ) {
        return b[payload.by] - a[payload.by];
      } else {
        return b[payload.by] > a[payload.by] ? 1 : -1;
      }
    } else {
      if (
        typeof b[payload.by] == "number" &&
        typeof a[payload.by] === "number"
      ) {
        return a[payload.by] - b[payload.by];
      } else {
        return a[payload.by] > b[payload.by] ? 1 : -1;
      }
    }
    // ? b[payload.by] > a[payload.by]
    // : a[payload.by] < b[payload.by]
  });
};

//pipe function for filtering using nested fiters
const pipe = (action, filterFn) => (data) =>
  action.reduce((data, act) => filterFn(data, act), data);

//filtering logic
const filterPipeFn = (data, action) => {
  return action.value.length
    ? data.filter((el) => action.value.indexOf(el[action.id]) > -1)
    : typeof action.value === "object" && action.value.from
    ? data.filter(
        (el) =>
          el[action.id] >= parseInt(action.value.from) &&
          el[action.id] <= parseInt(action.value.to)
      )
    : data;
};

const filter = (data, payload) => {
  let composed = pipe(payload, filterPipeFn)(data);
  console.log(composed, "composed");
  return composed;
};
export function CovidDetailsReducer(state = initialState, action) {
  //   console.log(action);
  switch (action.type) {
    case types.FETCH_COVID_DETAILS:
      return {
        ...state,
        globalData: action.payload.Global,
        countriesData: action.payload.Countries,
        countryList: action.payload.Countries.map((el) => el.Country),
        lastUpdated: action.payload.Global.Date,
        loading: false,
      };
    case types.SET_COVID_DETAILS_LOADING:
      return { ...state, loading: action.payload };
    case types.SORT_COVID_DETAILS:
      let sortedArray = sort(state.countriesData, action.payload);
      return {
        ...state,
        countriesData: [...sortedArray],
      };
    case types.FILTER_COVID_DETAILS:
      let filteredArray = filter(state.countriesData, action.payload);
      return {
        ...state,
        countriesData: [...filteredArray],
      };
    default:
      return state;
  }
}
