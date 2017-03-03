 import { REQUEST_SINGLE_RESULT, 
 					REQUEST_RESULTS,
 					RECEIVE_RESULTS,
 					RECEIVE_SINGLE_RESULT
 				} from '../actions/search_actions';


const initialState = {
	indexLoading: false,
	detailLoading:false
}
const loadingReducer = (state = initialState, action) => {
 	Object.freeze(state);
 	let dupState = {};

 	switch(action.type){
 		case REQUEST_SINGLE_RESULT:
 		 	return Object.assign({}, state, { detailLoading: true });
 		case REQUEST_RESULTS:
 			return Object.assign({}, state, { indexLoading: true });
 		case RECEIVE_RESULTS:
 		case RECEIVE_SINGLE_RESULT:
 			return initialState;

 		default:
 			return state;
 	}
 }


export default loadingReducer;