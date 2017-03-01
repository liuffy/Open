import React from 'react';
import ReactDOM from 'react-dom';
import {getBusinesses, getLocalBusinesses} from './utils/yelp_api_utils';

document.addEventListener('DOMContentLoaded', () => {
	window.getBusinesses = getBusinesses;
	window.getLocalBusinesses = getLocalBusinesses;
  const rootEl = document.getElementById('root');
  ReactDOM.render(<h1>Open is open!</h1>, rootEl);
});