import React from 'react';

import UserForm from './Components//UserForm.js';
import BotDetector from './Helpers/bot-detector.js';
import './App.css';

class App extends React.Component {
	componentDidUpdate() {
		var callback = function(result) {
			if (result.isBot) {
				alert('You are a fucking bot!');
			} else {
				alert('Welcome user!');
			}
		};
		var botDetector = new BotDetector({
			timeout: 1000,
			callback: callback,
		});
	}
	render() {
		return (
			<div>
				{' '}
				<UserForm />{' '}
			</div>
		);
	}
}

export default App;
