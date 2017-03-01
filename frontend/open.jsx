import React from 'react';
import ReactDOM from 'react-dom';
import {getBusinessesByCity, getLocalBusinesses, getBusinessData} from './utils/yelp_api_utils';

document.addEventListener('DOMContentLoaded', () => {
	window.getBusinessesByCity = getBusinessesByCity;
	window.getLocalBusinesses = getLocalBusinesses;
	window.getBusinessData = getBusinessData;
  const rootEl = document.getElementById('root');
  ReactDOM.render(<h1>Open is open!</h1>, rootEl);
});