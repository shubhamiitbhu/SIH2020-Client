import React from 'react';
import { Form, Button, Grid, Popup } from 'semantic-ui-react';
import { Icon } from 'react-icons-kit';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { Loader } from 'semantic-ui-react';

import API from '../utils/API';
import JourneyCard from './JourneyCard.js';
import AlternateTrains from './AlternateTrains.js';
import Speech from './Speech.js';

class UserForm extends React.Component {
	state = {
		origin: '',
		destination: '',
		date: '',
		trains: null,
		alternateTrains: null,
		loading: false,
		record: false,
	};

	componentDidMount() {
		var value = new Date();
		value = value.toString();
		const dateSplit = value.split(' ');
		const month = dateSplit[1];
		const day = dateSplit[2];
		const year = dateSplit[3];
		const senderDate = day.toString() + ' ' + month.toLowerCase().toString() + ' ' + year.toString();
		console.log(senderDate);
		this.setState({
			date: senderDate,
		});
	}

	searchAlternateTrains = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const { origin, destination, date } = this.state;
		const body = { origin: origin, destination: destination, date: date };
		try {
			const trains = await API.post(`/alternate-trains/`, body);
			this.setState({
				alternateTrains: trains.data,
				loading: false,
			});
		} catch (error) {
			toast.error('Invalid Station Details');
			this.setState({ loading: false });
		}
	};

	submitData = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const { origin, destination, date } = this.state;
		const body = { origin: origin, destination: destination, date: date };
		try {
			const trains = await API.post(`/direct-trains/`, body);
			this.setState({
				trains: trains.data,
				loading: false,
			});
		} catch (error) {
			toast.error('Invalid Station Details');
			this.setState({ loading: false });
		}
	};

	speechToTextResult = async (origin, destination, date) => {
		this.setState({ loading: true });
		console.log(origin);
		const body = { origin: origin, destination: destination, date: date };
		try {
			const trains = await API.post(`/direct-trains/`, body);
			this.setState({
				trains: trains.data,
				loading: false,
			});
		} catch (error) {
			toast.error('Invalid Station Details');
			this.setState({ loading: false });
		}
	};

	changeInDestinationForm = (event) => {
		event.preventDefault();
		this.setState({
			destination: event.target.value.toUpperCase(),
			trains: null,
			alternateTrains: null,
		});
	};

	changeInOriginForm = (event) => {
		event.preventDefault();
		this.setState({
			origin: event.target.value.toUpperCase(),
			trains: null,
			alternateTrains: null,
		});
	};

	changeDate = (value) => {
		value = value.toString();
		const dateSplit = value.split(' ');

		const month = dateSplit[1];
		const day = dateSplit[2];
		const year = dateSplit[3];

		const senderDate = day.toString() + ' ' + month.toLowerCase().toString() + ' ' + year.toString();
		this.setState({
			date: senderDate,
			calenderView: 'none',
			trains: null,
		});
	};

	render() {
		const { trains, alternateTrains, origin, date, destination, loading } = this.state;

		return (
			<React.Fragment>
				<StyledGrid>
					<Grid.Row>
						<Grid.Column width={2} />
						<Grid.Column width={3}>
							<Form>
								<Form.Field>
									<Form.Input
										placeholder='Origin Station code'
										onChange={this.changeInOriginForm}
										value={origin}
									/>
								</Form.Field>
							</Form>
						</Grid.Column>
						<Grid.Column width={3}>
							<Form>
								<Form.Field>
									<Form.Input
										placeholder='Destination Station code'
										onChange={this.changeInDestinationForm}
										value={destination}
									/>
								</Form.Field>
							</Form>
						</Grid.Column>
						<Grid.Column width={3}>
							<Form>
								<Form.Field>
									<Form.Input
										value={date}
										placeholder='Pick a Date from Calender'
										onChange={this.changeInDestinationForm}
									/>
								</Form.Field>
							</Form>
						</Grid.Column>

						<Grid.Column width={1}>
							<Popup
								trigger={<Icon size={32} icon={calendar} onClick={this.changeCalenderModalView} />}
								content={
									<StyledCalendar
										value={new Date(this.state.date)}
										onChange={this.changeDate}
										minDate={new Date()}
										maxDate={new Date(new Date().getTime() + 120 * 24 * 60 * 60 * 1000)}
									/>
								}
								position='bottom left'
								flowing
								hoverable
							/>
						</Grid.Column>

						<Grid.Column width={1}>
							<SubmitButton
								type='submit'
								onClick={(e) => {
									this.submitData(e);
								}}
							>
								Search
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
										<JourneyCard train={train} index={index} key={index} />
									))
								) : null}
								{trains !== null && trains.length === 0 && alternateTrains === null ? (
									<div>
										No direct trains to show<br />{' '}
										<Button onClick={this.searchAlternateTrains}>
											Search for Alternate Route?
										</Button>
									</div>
								) : null}
								{alternateTrains !== null && alternateTrains.length !== 0 ? (
									<AlternateTrains trains={alternateTrains} />
								) : null}
							</ul>
						</Grid.Column>
						<Grid.Column width={3} />
					</Grid.Row>
				</Grid>
				<Speech
					onSpeechEnd={(origin, destination, date) => {
						this.speechToTextResult(origin, destination, date);
					}}
				/>
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
