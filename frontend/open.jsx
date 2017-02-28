import React from 'react';
import ReactDOM from 'react-dom';
import {getBusinesses, getBusinessHours} from './utils/yelp_api_utils';

document.addEventListener('DOMContentLoaded', () => {
	window.getBusinesses = getBusinesses;
	window.getBusinessHours = getBusinessHours;
  const rootEl = document.getElementById('root');
  ReactDOM.render(<h1>Open is open!</h1>, rootEl);
});