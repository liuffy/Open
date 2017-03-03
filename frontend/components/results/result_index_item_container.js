import {connect} from 'react-redux';
import TracktlistIndexItem from './result_index_item';


const mapStateToProps = (state, ownProps) => ({
  result: ownProps.result
});



export default connect(
	mapStateToProps)(
	ResultIndexItem);