import React from 'react';
import {withRouter, Link} from 'react-router';
import ReactDOM from 'react-dom';
import ResultIndexItem from './result_index_item';

class ResultsIndex extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
  	const {results, loading} = this.props;
  	
  	return loading ? <div className="spinner">
  <img className="loader-logo" src="http://res.cloudinary.com/liuffy/image/upload/v1488581396/open_cursive_sligtq.png"/>
  <span className="loader-text">Searching...</span>
</div> :
		<div className="result-index">

			<span className = "results-label">Results</span>

			<div className="loaded-results">

			 { Object.keys(results).map( (result, idx) => {
            return <ResultIndexItem
              className="index-item"
	             individualResult={results[result]}
               key={idx}/>
				})}

			</div>
		</div>
		
  }
}


export default withRouter(ResultsIndex);