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
  	let loadedResults;


    if (Object.keys(results).length === 0){
      loadedResults = <div><span className="no-matches-text">No matches!</span>
                      <span className="no-matches-text-small">This may be due to the following:</span>
                      <ul>
                        <li className="no-matches-text-small">You did a local search and the business doesn't fall within a 2 mi radius</li>
                        <li className="no-matches-text-small">You made a typo in one of the fields</li>
                      </ul>
                      </div>

    } else {
      loadedResults = Object.keys(results).map( (result, idx) => {
            return <ResultIndexItem
              className="index-item"
               individualResult={results[result]}
               key={idx}/>
        })
    }
  	return loading ? <div className="spinner">
  <img className="loader-logo" src="http://res.cloudinary.com/liuffy/image/upload/v1488581396/open_cursive_sligtq.png"/>
  <span className="loader-text">Searching...</span>
</div> :
		<div className="result-index">

			<span className = "results-label">Results</span>
      <Link 
          className="search-button new-search"
          to={'/'}>new search</Link>

      <div className="loaded-results">
       { loadedResults}
      </div>
		</div>
		
  }
}


export default withRouter(ResultsIndex);