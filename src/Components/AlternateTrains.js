import React from 'react';
import {Form, Button} from 'semantic-ui-react';

import AlternateTrainsRendering from './AlternateTrainsRendering.js';
import API from '../utils/API';

class AlternateTrains extends React.Component
{
    state = 
    {
        results: null,
        search:false
    }

    

    searchForAlternateTrains = async(e)=>
    {
        const {origin, destination}= this.props;
        const alternateTrains = await API.get(`single-break-trains/${origin}/${destination}`);
        this.setState({
            results: alternateTrains.data
        })
    }

    render()
    {
        const {results} = this.state;
        const {origin, destination}= this.props;
        return(
        <React.Fragment>
            <Button onClick={()=>{this.searchForAlternateTrains()}}>  Search For Alternate Routes?</Button>
            {results!==null? results.map((result,index)=><AlternateTrainsRendering 
            origin={origin} destination={destination} result={result}/>) : null}
        </React.Fragment>
        );
    }
}

export default AlternateTrains;