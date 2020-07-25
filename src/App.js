import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import UserForm from './Components//UserForm.js';
import Navbar from './Components/Navbar.js';
import Logger from './Components/Logger.js';

class App extends React.Component {
	render() {
		return (
			<div>
				{' '}
				<Navbar />
				<Router>
					<Switch>
						<Route path='/' exact>
							<UserForm />
						</Route>
						<Route path='/logger' exact>
							<Logger />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
