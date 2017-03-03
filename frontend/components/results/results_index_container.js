import {connect} from 'react-redux';
import ResultsIndex from './results_index';

const mapStateToProps = (state) => ({
  loading: state.loading.indexLoading,
  results: state.results
});

export default connect(
	mapStateToProps, 
	null)(
	ResultsIndex);