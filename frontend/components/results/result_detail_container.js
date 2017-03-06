import { connect } from 'react-redux';
import ResultDetail from './result_detail';
import { selectResult } from '../../reducers/selectors';

const mapStateToProps = (state, { params }) => {
	const businessName = params.businessName;
	const individualBusiness = selectResult(state, businessName);

	  return {
			businessName,
			individualBusiness
	  };
};


export default connect(
  mapStateToProps,
 null
)(ResultDetail);