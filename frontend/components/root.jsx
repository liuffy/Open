import React from 'react';
import { Provider } from 'react-redux';

const Root = ({ store }) => {
  return(
    <Provider store={store}>
    	<div><h1>Hi</h1></div>
    </Provider>
  );
};

export default Root;