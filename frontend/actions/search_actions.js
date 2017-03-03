export const REQUEST_RESULTS = "REQUEST_RESULTS";
export const RECEIVE_RESULTS = "RECEIVE_RESULTS";
export const REQUEST_SINGLE_RESULT = "REQUEST_SINGLE_RESULT";
export const RECEIVE_SINGLE_RESULT = "RECEIVE_SINGLE_RESULT";

import * as YelpAPIUtil from '../utils/yelp_api_utils';

// Thunk allows you to write action creators that return a function instead of an action
export function createLocalResults(nameQuery){
	  // Redux Thunk will inject dispatch here:
return (dispatch) => {
	// Reducers may handle this to set a flag like isFetching
	dispatch(requestResults());

	return YelpAPIUtil.localBusinesses(nameQuery)
		.then( (dataObject) => {
			return YelpAPIUtil.businessDataObject(dataObject)
		}).then( (resultObject) => {
			 dispatch(receiveResults(resultObject))})
	}
}

// YelpAPIUtil.getBusinessesByCity(nameQuery, locationQuery)
// YelpAPIUtil.businessDataObject(dataObject)


export function createCityResults(nameQuery, locationQuery){
	  // Redux Thunk will inject dispatch here:
	return (dispatch) => {
	// Reducers may handle this to set a flag like isFetching
	dispatch(requestResults());

	return YelpAPIUtil.getBusinessesByCity(nameQuery, locationQuery)
		.then( (dataObject) => {
			return YelpAPIUtil.businessDataObject(dataObject)
		}).then( (resultObject) => {
			 dispatch(receiveResults(resultObject))})
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