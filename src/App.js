import React from 'react';

import UserForm from './Components/UserForm.js';
import BotDetector from './Helpers/bot-detector.js';
import './App.css';

import 'react-calendar/dist/Calendar.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'bootstrap-css-only/css/bootstrap.min.css';

import NavbarPage from './Components/Navbar.js';

class App extends React.Component {
	render() {
		return (
			<div>
				{' '}
				<NavbarPage />
				<UserForm />{' '}
			</div>
		);
	}
}

export default App;
