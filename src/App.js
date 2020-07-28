import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import UserForm from './Components//UserForm.js';
import Navbar from './Components/Navbar.js';
import Logger from './Components/Logger.js';

import UserContext from './contexts/UserContext.js';

class App extends React.Component {
	static contextType = UserContext;

	state = {
		language: 'en',
	};

	changeLanguage = (language) => {
		this.setState({
			language: language,
		});
	};
	render() {
		return (
			<div>
				{' '}
				<Navbar />
				<UserContext.Provider value={{ language: this.state.language, changeLanguage: this.changeLanguage }}>
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
				</UserContext.Provider>
			</div>
		);
	}
}

export default App;
