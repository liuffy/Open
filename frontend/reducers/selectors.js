import _ from 'lodash';

export const selectResult = ({ results }, id) =>{
	const result = results[id] || {};
	return result;
}

export const selectResults = state => _.values(state.results);