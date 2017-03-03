import {connect} from 'react-redux';
import SearchForm from './search_form';
import {createLocalResults, 
        createCityResults} from '../../actions/search_actions';


const mapStateToProps = (state) =>({
  results:state.results, // need to get this through state 
});

const mapDispatchToProps = dispatch => ({
  createLocalResults: nameQuery => dispatch(createLocalResults(nameQuery)),
  createCityResults: (nameQuery, locationQuery) => dispatch(createCityResults(nameQuery, locationQuery))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(SearchForm)