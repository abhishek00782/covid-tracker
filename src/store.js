import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { CovidDetailsReducer } from "./components/covid-dashboard/reducer";
const reducers = { CovidDetailsReducer };

const rootReducer = combineReducers(reducers);

export const configureStore = () =>
  createStore(rootReducer, applyMiddleware(thunk));
