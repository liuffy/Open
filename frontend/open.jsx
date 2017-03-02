import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import {createLocalResults, createCityResults} from './actions/search_actions';

// import {getBusinessesByCity, getLocalBusinesses, getBusinessData} from './utils/yelp_api_utils';

document.addEventListener('DOMContentLoaded', () => {
	// window.getBusinessesByCity = getBusinessesByCity;
	// window.getLocalBusinesses = getLocalBusinesses;
	// window.getBusinessData = getBusinessData;
	// store.dispatch(action()) to see if it works;
	let store = configureStore();
	window.store = store;
	window.createLocalResults = createLocalResults;
	window.createCityResults = createCityResults;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});

