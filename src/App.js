import React from 'react';

import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';


import 'react-calendar/dist/Calendar.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './App.css';
import UserForm from './Components//UserForm.js';
import Navbar from './Components/Navbar.js';

class App extends React.Component {
	render() {
		return (
			<div>
				{' '}
				<Navbar />
				<UserForm />{' '}
			</div>
		);
	}
}
export default App;
