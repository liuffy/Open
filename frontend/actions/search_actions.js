export const REQUEST_RESULTS = "REQUEST_RESULTS";
export const RECEIVE_RESULTS = "RECEIVE_RESULTS";
export const REQUEST_SINGLE_RESULT = "REQUEST_SINGLE_RESULT";
export const RECEIVE_SINGLE_RESULT = "RECEIVE_SINGLE_RESULT";

import * as YelpAPIUtil from '../util/yelp_api_util';

export function createLocalResults(nameQuery){
	return (dispatch) =>
	return YelpAPIUtil.getLocalBusinesses()
	// Gotta stuff everything into one object literal 
		.then (businessIds => dispatch(businessDataObject()))
}

export function createCityResults(nameQuery, locationQuery){
	return (dispatch) =>
		return YelpAPIUtil.getLocalBusinesses()
		.then (businessIds => dispatch(businessDataObject()))
}

export const requestResults = () =>({
	type: REQUEST_RESULTS
})

// For single result from list 
export const requestResults = () =>({
	type: REQUEST_RESULTS
})

export const receiveResults = results => ({
  type: RECEIVE_RESULTS,
  results
});

export const receiveSingleResult = singleResult => ({
  type: RECEIVE_SINGLE_RESULT,
  singleResult
});
