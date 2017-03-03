import {connect} from 'react-redux';
import SearchForm from './search_form';
import {getArtists, 
				getAlbums, 
				getTracks, 
        createTracktlist} from '../../actions/tracktlist_actions';


const mapStateToProps = (state) =>({
  results:state.results, // need to get this through state 
});

const mapDispatchToProps = dispatch => ({
  getArtists: artistNames => dispatch(getArtists(artistNames)),
  getAlbums: artistIds => dispatch(getAlbums(artistIds)),
  getTracks: albumIds => dispatch(getTracks(albumIds)),
  createTracktlist: (artistNames, title, imageUrl) => dispatch(createTracktlist(artistNames, title, imageUrl))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(SearchForm)