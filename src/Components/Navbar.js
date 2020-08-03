import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Grid, Popup, Modal, Dropdown, Image, Radio, Menu } from 'semantic-ui-react';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Login from './Login';
import Signup from './Signup';
import Cookie from 'js-cookie';

class NavbarPage extends Component {
	state = {
		isOpen: false,
		isLoginOpen: false,
		isSignupOpen: false,
		token: Cookie.get('token') ? Cookie.get('token') : null,
		username: Cookie.get('username') ? Cookie.get('username') : null,
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	redirecttohome = () => {
		window.location.href = '/';
	};
	render() {
		return (
			<Router>
				<div id='google_translate_element' 
					style={{backgroundColor:'#2196f3'}}
				/>
				<Menu secondary
					style={{backgroundColor:'#2196f3',margin:0}}>
					<img
						alt='no-alt'
						onClick={this.redirecttohome}
						href='/'
						src='./magic.png'
						style={{ width: 2.75 + 'rem' }}
					/>
					<span style={{fontSize:2+'rem',color:'white'}}>Rail Genie</span>
					
					<StyledContainer>
						{(() => {
							if (this.state.token) {
								return (
									<Dropdown
										trigger={
											<Avatar className='orange'>{this.state.username[0].toUpperCase()}</Avatar>
										}
										icon={null}
									>
										<Dropdown.Menu>
											<Dropdown.Item
												text='Logout'
												onClick={() => {
													Cookie.remove('token');
													Cookie.remove('id');
													Cookie.remove('username');
													this.setState({
														token: null,
														username: null,
													});
												}}
											/>
										</Dropdown.Menu>
									</Dropdown>
								);
							} else {
								return (
									<React.Fragment>
										<StyledModal
											size='mini'
											onClose={() => this.setState({ isLoginOpen: false })}
											onOpen={() => this.setState({ isLoginOpen: true })}
											open={this.state.isLoginOpen}
											dimmer='blurring'
											trigger={<Button secondary>Login</Button>}
										>
											<Login />
										</StyledModal>

										<StyledModal
											size='mini'
											onClose={() => this.setState({ isSignupOpen: false })}
											onOpen={() => this.setState({ isSignupOpen: true })}
											open={this.state.isSignupOpen}
											dimmer='blurring'
											trigger={<Button secondary>Signup</Button>}
										>
											<Signup />
										</StyledModal>
									</React.Fragment>
								);
							}
						})()}
					</StyledContainer>
				</Menu>
			</Router>
		);
	}
}
export default NavbarPage;

const StyledModal = styled(Modal)`
  left: 35em !important;
  height: auto;
  top: 10em;
  width: 30% !important;

  padding: 2em !important;
`;

const StyledContainer = styled.div`
	position: absolute !important;
	right: 2em !important;
`;
