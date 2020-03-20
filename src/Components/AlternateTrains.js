import React from 'react';
import {Button} from 'semantic-ui-react';

import AlternateTrainsRendering from './AlternateTrainsRendering.js';
import API from '../utils/API';

class AlternateTrains extends React.Component
{
    state = 
    {
        trains: null,
    }

    searchForAlternateTrains = async(e)=>
    {
        const {origin, destination}= this.props;
        const alternateTrains = await API.get(`single-break-trains/${origin}/${destination}`);
        this.setState({
            trains: alternateTrains.data
        })
    }

    render()
    {
        const {trains} = this.state;
        const {origin, destination}= this.props;
        return(
        <React.Fragment>
            <div>No Direct trains to show.</div>
            <Button onClick={()=>{this.searchForAlternateTrains()}}>  Search For Alternate Routes?</Button>
            {trains!==null? trains.map((train,index)=><AlternateTrainsRendering 
            origin={origin} destination={destination} trains={train} key={index}/>) : null}
        </React.Fragment>
        );
    }
}

export default AlternateTrains;