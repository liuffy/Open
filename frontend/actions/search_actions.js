export const REQUEST_RESULTS = "REQUEST_RESULTS";
export const RECEIVE_RESULTS = "RECEIVE_RESULTS";
export const REQUEST_SINGLE_RESULT = "REQUEST_SINGLE_RESULT";
export const RECEIVE_SINGLE_RESULT = "RECEIVE_SINGLE_RESULT";

import * as YelpAPIUtil from '../utils/yelp_api_utils';

export function createLocalResults(nameQuery){
	return (dispatch) => {
		return YelpAPIUtil.getLocalBusinesses()
			.then (dataObject => dispatch(businessDataObject()))
				.then(resultObject => 
						dispatch(receiveResults(resultObject)))
	}
}

export function createCityResults(nameQuery, locationQuery){
	return (dispatch) => {
		return YelpAPIUtil.getLocalBusinesses()
		.then (dataObject => dispatch(businessDataObject()))
				.then(resultObject => 
						dispatch(receiveResults(resultObject)))
	}
}

export const requestResults = () =>({
	type: REQUEST_RESULTS
})



export const receiveResults = results => ({
  type: RECEIVE_RESULTS,
  results
});

export const requestSingleResult = () => ({
  type: REQUEST_SINGLE_RESULT,
});

export const receiveSingleResult = singleResult => ({
  type: RECEIVE_SINGLE_RESULT,
  singleResult
});
