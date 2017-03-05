export const selectResult = ({ results }, id) =>{
	const result = results[id] || {};
	return result;
}
