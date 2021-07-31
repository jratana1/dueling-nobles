import { combineReducers } from "redux";
import readingsReducer from './readingsReducer'
import count from './counterReducer'


const rootReducer = combineReducers({
  readings: readingsReducer,
  count: count
});

export default rootReducer