import { combineReducers } from 'redux';
import ResultReducer from './result_reducer';


const RootReducer = combineReducers({
  results: ResultReducer
});

export default RootReducer;