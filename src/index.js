import React from 'react';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App'
import './index.css'
import store from './utils/store'


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<StrictMode>
				<App />
			</StrictMode>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);