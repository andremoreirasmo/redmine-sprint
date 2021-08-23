import { combineReducers } from 'redux';
import MainReducer from "./mainReducer";

const rootReducer =  combineReducers({
  main: MainReducer,
});

export default rootReducer;
