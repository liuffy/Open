import React from 'react';
import {withRouter, Link} from 'react-router';
import ReactDOM from 'react-dom';

class ResultsIndex extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
  	let {results, loading} = this.props;
  	
  	return loading ? <div className="spinner">
  <img className="loader-logo" src="http://res.cloudinary.com/liuffy/image/upload/v1488582630/faster_loader_ni2gtf.gif"/>
</div> :
    		<div className="result-index">
  			<span className = "results-label">Results</span>
  		</div>
		
  }
}


export default withRouter(ResultsIndex);