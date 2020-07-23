import React, { Component } from 'react';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBNavbarToggler,
	MDBCollapse,
} from 'mdbreact';
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
						<img className='mr-2' src='./magic.png' style={{ width: 2.5 + 'rem' }} />
						<span className='align-middle text-white' style={{ fontWeight: 600, fontSize: 1.5 + 'rem' }}>
							Rail Genie
						</span>
					</MDBNavbarBrand>
					{/*<MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Features</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Pricing</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>*/}
				</MDBNavbar>
			</Router>
		);
	}
}
export default NavbarPage;
