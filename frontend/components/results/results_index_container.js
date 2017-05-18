import { connect } from 'react-redux';
import ResultsIndex from './results_index';
import { selectResults } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  loading: state.loading.indexLoading,
  results: selectResults(state)
});

export default connect(
	mapStateToProps, 
	null)(
	ResultsIndex);
