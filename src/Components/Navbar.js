import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class NavbarPage extends Component {
	state = {
		isOpen: false,
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<Router>
				<MDBNavbar expand='md' className='scrolling-navbar z-depth-0' color='blue'>
					<MDBNavbarBrand className='p-0'>
						<img alt='no-alt' className='mr-2' src='./magic.png' style={{ width: 2.75 + 'rem' }} />
						<span className='align-middle text-white' style={{ fontWeight: 600, fontSize: 1.75 + 'rem' }}>
							Rail Genie
						</span>
					</MDBNavbarBrand>
				</MDBNavbar>
			</Router>
		);
	}
}
export default NavbarPage;
