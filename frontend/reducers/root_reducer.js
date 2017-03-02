import { combineReducers } from 'redux';
import ResultReducer from './result_reducer';


const RootReducer = combineReducers({
  result: ResultReducer
});

export default RootReducer;