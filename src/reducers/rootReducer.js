import { combineReducers } from "redux";
import gameReducer from './gameReducer'
import count from './counterReducer'


const rootReducer = combineReducers({
  game: gameReducer,
  count: count
});

export default rootReducer