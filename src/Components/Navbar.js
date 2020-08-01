import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Grid, Popup, Modal, Dropdown, Image, Radio } from 'semantic-ui-react';
import WithContexts from './WithContexts.js';
const languages = [
	{
		key: 'en',
		text: 'English',
		value: 'en',
	},
	{
		key: 'hi-In',
		text: 'हिन्दी',
		value: 'hi-In',
	},
	{
		key: 'ml',
		text: 'മലയാളം',
		value: 'ml',
	},
];

class NavbarPage extends Component {
	state = {
		isOpen: false,
	};

	changeLanguage = (event, { value }) => {
		event.preventDefault();
		this.props.context.changeLanguage(value);
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<React.Fragment>
				<MDBNavbar expand='md' className='scrolling-navbar z-depth-0' color='blue'>
					<MDBNavbarBrand className='p-0'>
						<img alt='no-alt' className='mr-2' src='./magic.png' style={{ width: 2.75 + 'rem' }} />
						<span className='align-middle text-white' style={{ fontWeight: 600, fontSize: 1.75 + 'rem' }}>
							Rail Genie
						</span>
					</MDBNavbarBrand>
					<MDBNavbarNav right>
						<MDBNavItem style={{padding: .5+'rem',background: 'white',borderRadius: .3+'rem'}}>
							<Dropdown placeholder='English' options={languages} onChange={this.changeLanguage} />
						</MDBNavItem>
					</MDBNavbarNav>
					
				</MDBNavbar>
				
			</React.Fragment>
		);
	}
}
export default WithContexts(NavbarPage);