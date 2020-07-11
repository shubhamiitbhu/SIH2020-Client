import React from 'react';
import { Form, Button, Grid, Modal } from 'semantic-ui-react';
import { Icon } from 'react-icons-kit';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { Loader } from 'semantic-ui-react';

import API from '../utils/API';
import JourneyCard from './JourneyCard.js';

class UserForm extends React.Component {
	state = {
		origin: '',
		destination: '',
		date: new Date(),
		trains: [],
		calenderModal: false,
		nearbyButtonView: 'none',
		submitButtonView: 'block',
		loading: false,
	};

	submitData = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const { origin, destination } = this.state;
		const body = { origin: origin, destination: destination };
		try {
			const trains = await API.post(`/direct-trains/`, body);
			console.log(trains.data);
			this.setState({
				trains: trains.data,
				nearbyButtonView: 'block',
				submitButtonView: 'none',
				loading: false,
			});
		} catch (error) {
			console.log(error);
			toast.error('Invalid Station Details');
			this.setState({ loading: false });
		}
	};

	changeInDestinationForm = (event) => {
		event.preventDefault();
		this.setState({
			destination: event.target.value.toUpperCase(),
			trains: null,
			submitButtonView: 'block',
		});
	};

	changeInOriginForm = (event) => {
		event.preventDefault();
		this.setState({
			origin: event.target.value.toUpperCase(),
			trains: null,
			submitButtonView: 'block',
		});
	};

	changeDate = (value) => {
		this.setState({
			date: value,
			calenderView: 'none',
			trains: null,
			nearbyButtonView: 'none',
			calenderModal: !this.state.calenderModal,
		});
	};

	changeCalenderModalView = () => {
		this.setState({ calenderModal: !this.state.calenderModal });
	};

	render() {
		const {
			trains,
			origin,
			destination,
			date,
			calenderModal,
			nearbyButtonView,
			loading,
			submitButtonView,
		} = this.state;

		return (
			<React.Fragment>
				<StyledGrid>
					<Grid.Row>
						<Grid.Column width={2} />
						<Grid.Column width={4}>
							<Form>
								<Form.Field>
									<Form.Input placeholder='Origin Station code' onChange={this.changeInOriginForm} />
								</Form.Field>
							</Form>
						</Grid.Column>
						<Grid.Column width={4}>
							<Form>
								<Form.Field>
									<Form.Input
										placeholder='Destination Station code'
										onChange={this.changeInDestinationForm}
									/>
								</Form.Field>
							</Form>
						</Grid.Column>
						<Grid.Column width={2}>
							<Icon size={32} icon={calendar} onClick={this.changeCalenderModalView} />
							<Modal open={calenderModal} size='small'>
								<Modal.Header>Select Date</Modal.Header>
								<Modal.Content>
									<StyledCalendar
										value={this.state.date}
										onChange={this.changeDate}
										minDate={new Date()}
										maxDate={new Date(new Date().getTime() + 120 * 24 * 60 * 60 * 1000)}
									/>
								</Modal.Content>
							</Modal>
							<br />
						</Grid.Column>

						<Grid.Column width={1}>
							<SubmitButton
								type='submit'
								onClick={(e) => {
									this.submitData(e);
								}}
								display={submitButtonView}
							>
								Submit
							</SubmitButton>
						</Grid.Column>
						<Grid.Column width={3} />
					</Grid.Row>
				</StyledGrid>
				{loading === true ? <Loader active inline='centered' /> : null}
				<Grid>
					<Grid.Row>
						<Grid.Column width={3} />
						<Grid.Column width={10}>
							<ul>
								{trains !== null ? (
									trains.map((train, index) => (
										<JourneyCard
											origin={origin}
											destination={destination}
											train={train}
											index={index}
											key={index}
										/>
									))
								) : null}
								{trains !== null && trains.length === 0 ? <div>No direct trains to show</div> : null}
							</ul>
						</Grid.Column>
						<Grid.Column width={3} />
					</Grid.Row>
				</Grid>
			</React.Fragment>
		);
	}
}

const SubmitButton = styled(Button)`
display: ${(props) => props.display}`;

const StyledCalendar = styled(Calendar)`
	margin-left: auto !important;
	margin-right: auto !important;
	width: 100% !important;
`;
const StyledGrid = styled(Grid)`
    padding-top: 2% !important;
    height: 130px !important;
	background-color: #f6f7f9 !important;
	color: black;
`;
export default UserForm;
