import React from 'react';
import {withRouter, Link} from 'react-router';
import ReactDOM from 'react-dom';
import ResultIndexItem from './result_index_item';

class ResultsIndex extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
        console.log(store.getState())

  	const {results, loading} = this.props;
  	let loadedResults;


    if (Object.keys(results).length === 0){
      loadedResults = <div><span className="no-matches-text">No matches!</span>
                      <span className="no-matches-text-small">This is likely due to the following:</span>
                      <ul>
                        <li className="no-matches-text-small">1. You searched based on 'current location' and the business doesn't fall within a 3 mi radius</li>
                        <li className="no-matches-text-small">2. It's a new business that isn't established online yet.</li>
                        <li className="no-matches-text-small">3. You were so excited about using Open that you mispelled something.</li>
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
    
  <img className="loader-logo" src="../../../assets/images/open_cursive.png"/>
  <span className="loader-text">Searching for the best matches...</span>
    <Link 
          className="results-button waiting"
          to={'/'}>&times; cancel</Link>
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