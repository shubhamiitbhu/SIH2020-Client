import React from 'react';
import { Grid, Button, Segment, Header, Divider, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';

import FeedbackCard from './FeedbackCard.js';
import FareCalculator from './FareCalculator.js';

const ratings = [ [ 'Security', 2.5 ], [ 'Pentry', 4.3 ], [ 'Hygiene', 3 ] ];

class JourneyCard extends React.Component {
	state = {
		collapsible: false,
	};

	changeCollapsible = () => {
		this.setState({
			collapsible: !this.state.collapsible,
		});
	};

	render() {
		const { collapsible } = this.state;

		const {
			name,
			number,
			origin,
			destination,
			duration,
			originDeparture,
			destinationArrival,
			totalDistance,
		} = this.props.train;
		return (
			<React.Fragment>
				<StyledSegment clearing>
					<StyledTrainName as='h3'>
						{number} - {name}
					</StyledTrainName>
					<Grid>
						<Grid.Row>
							<Grid.Column width={3}>
								<Header as='h4'>
									<StyledDot type='origin' /> {originDeparture.slice(0, 5)} | {origin}
								</Header>
							</Grid.Column>
							<Grid.Column width={3}>
								<Header as='h4'>
									<StyledDot type='destination' /> {destinationArrival.slice(0, 5)} | {destination}
								</Header>
							</Grid.Column>
							<Grid.Column width={3}>
								<Header as='h4'>
									<StyledIcon name='stopwatch' />
									{duration}
								</Header>
							</Grid.Column>
							<Grid.Column width={3}>
								<Header as='h4'>
									<StyledIcon name='road' />
									{totalDistance} kms
								</Header>
							</Grid.Column>
							<Grid.Column width={4}>
								<Button
									size='mini'
									content='Details'
									icon='angle down'
									onClick={this.changeCollapsible}
								/>
								<Button size='mini' content='Book' />
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Collapsible open={collapsible} transitionTime={200}>
						<Divider horizontal>Journey Details</Divider>
						<Grid>
							<Grid.Row>
								<Grid.Column width={5}>
									<FeedbackCard ratings={ratings} key={1} />
								</Grid.Column>
								<Divider vertical />
								<Grid.Column width={5}>
									<FareCalculator ratings={ratings} key={2} />
								</Grid.Column>
								<Grid.Column width={5}>
									<FareCalculator ratings={ratings} key={3} />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Collapsible>
				</StyledSegment>
			</React.Fragment>
		);
	}
}

const StyledIcon = styled(Icon)`
	display: inline-block !important;
	font-size: 16px !important;
`;
const StyledSegment = styled(Segment)`
	:hover{box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19) !important;}
`;
const StyledTrainName = styled(Header)`
	text-align: center !important;
	
`;

const StyledDot = styled.span`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.type === 'origin' ? 'green' : 'red')};
  border-radius: 50%;
  display: inline-block;
}
`;

const StyledHorizontalLine = styled.hr`border: 0px 0px 1px 0px;`;

export default JourneyCard;
