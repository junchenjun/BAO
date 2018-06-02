import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk'; // a middleware
import Router from './Router';
import storage from './RNAsyncStorage';

class App extends Component {

	render() {
		// the second arg is for any initial state you wanna pass 
		// the third arg is called store enhancers
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={ store }>
				<Router/>
			</Provider>
		);
	}
}



export default App;