import {connect} from 'react-redux';
import SearchForm from './search_form';
import {createLocalResults, 
        createCityResults} from '../../actions/search_actions';


const mapStateToProps = (state) =>({
  results:state.results, // need to get this through state 
});

const mapDispatchToProps = dispatch => ({
  createLocalResults: (nameQuery, lat, lng)=> dispatch(createLocalResults(nameQuery, lat, lng)),
  createCityResults: (nameQuery, locationQuery) => dispatch(createCityResults(nameQuery, locationQuery))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(SearchForm)