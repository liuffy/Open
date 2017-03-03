import React from 'react';
import { Provider } from 'react-redux';
import SearchForm from './search_form/search_form';

const Root = ({ store }) => {
  return(
    <Provider store={store}>
    	<SearchForm/>
    </Provider>
  );
};

export default Root;