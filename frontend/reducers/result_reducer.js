import {
	RECEIVE_RESULTS, 
	RECEIVE_SINGLE_RESULT
} from '../actions/search_actions';


const ResultReducer = (state = {}, action) =>{
	Object.freeze(state);

	switch(action.type) {
		case RECEIVE_RESULTS:
			return action.results;

		case RECEIVE_SINGLE_RESULT:
			return Object.assign({}, state, {
				[action.result.id]: action.result
			})

		default:
			return state;
	}
}

export default ResultReducer;