import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand } from 'mdbreact';
import styled from 'styled-components';
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
				<StyledNavbar color='white'>
					<StyledMDBNavbar>
						<StyledIcon src='./favicon.png' /> Smart India Hackathon 2020
					</StyledMDBNavbar>
				</StyledNavbar>
			</Router>
		);
	}
}

const StyledMDBNavbar = styled(MDBNavbarBrand)`
    font-size: 23px;
    font-weight: bold;
`;
const StyledNavbar = styled(MDBNavbar)`
    postion: fixed !important;
    top: 0 !important;
    left: 0 !important;
    color: #5f6368 !important;
	height: 60px !important;
	align-items: center !important;
`;

const StyledIcon = styled.img`
	margin-left: 5px;
	margin-top: 10px !important;
	width: 35px;
	height: auto;
`;
export default NavbarPage;
