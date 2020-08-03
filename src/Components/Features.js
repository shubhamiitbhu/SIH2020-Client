import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';class Features extends React.Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4} />
                    <Grid.Column width={2}>
                        <a href='/enquiry'>
                            <Icon name='comments' size='huge' />
                            <br />
                            Smart Enquiry
                        </a>
                    </Grid.Column>                    <Grid.Column width={1} />
                    <Grid.Column width={2}>
                        <a href='/uts'>
                            <Icon name='newspaper outline' size='huge' />
                            <br />
                            Smart UTS Booking
                        </a>
                    </Grid.Column>
                    <Grid.Column width={1} />                    <Grid.Column width={2}>
                        <a href='/logger'>
                            <Icon name='chart line' size='huge' />
                            <br />
                            Smart Logger for Developers
                        </a>
                    </Grid.Column>
                    <Grid.Column width={4} />
                </Grid.Row>
            </Grid>
        );
    }
}export default Features;