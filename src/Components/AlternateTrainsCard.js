import React from 'react';
import { Grid, Button, Segment, Header, Divider, Icon } from 'semantic-ui-react';

import JourneyCard from './JourneyCard.js';

import styled from 'styled-components';

class AlternateTrainsCard extends React.Component {
	render() {
		const { journey } = this.props;
		console.log(journey);
		const { originToConnection, connectionToDestination, timeGap, connection } = this.props.journey;
		return (
			<React.Fragment>
				<JourneyCard train={originToConnection} />
				<Divider horizontal>
					Connecting Station {': '}
					{'    '}
					{connection} {'Time Gap:'}
					{timeGap.hour + ':' + timeGap.minute}
				</Divider>
				<JourneyCard train={connectionToDestination} />
				<br />
			</React.Fragment>
		);
	}
}

export default AlternateTrainsCard;
