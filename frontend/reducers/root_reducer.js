import { combineReducers } from 'redux';
import ResultReducer from './result_reducer';
import loadingReducer from './loading_reducer';

const RootReducer = combineReducers({
	loading: loadingReducer,
  results: ResultReducer
});

export default RootReducer;