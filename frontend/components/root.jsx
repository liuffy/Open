import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import SearchFormContainer from './search_form/search_form_container';
import ResultsIndexContainer from './results/results_index_container';
import ResultDetailContainer from './results/result_detail_container';

const Root = ({ store }) => {
  return(
    <Provider store={store}>
		  <Router history={ hashHistory }>
    	 <Route path="/" component= {SearchFormContainer}/>
    	 <Route path="/results" component= {ResultsIndexContainer}/>
    	 <Route path="/:businessName" component= {ResultDetailContainer}/>
  	  </Router>
    </Provider>
  );
};

export default Root;