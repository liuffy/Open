
import { createStore, 
				 applyMiddleware, 
				 compose 
			 } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/root_reducer';


const configureStore = (preloadedState = {}) => (
	createStore(
		RootReducer,
		preloadedState,
		compose(
			applyMiddleware(thunk)
			)
		)
	)



export default configureStore;