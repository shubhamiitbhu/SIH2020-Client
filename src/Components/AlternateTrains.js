import React from 'react';
import {Button} from 'semantic-ui-react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import AlternateTrainsRendering from './AlternateTrainsRendering.js';
import API from '../utils/API';

class AlternateTrains extends React.Component
{
    state = 
    {
        trains: null,
        loading: false
    }

    searchForAlternateTrains = async(e)=>
    {
        const {origin, destination}= this.props;
        this.setState({loading:true})
        const alternateTrains = await API.get(`single-break-trains/${origin}/${destination}`);
        this.setState({
            trains: alternateTrains.data,
            loading:false
        });
    }

    render()
    {
        const {trains,loading} = this.state;
        const {origin, destination}= this.props;
        return(
        <React.Fragment>
            <Button onClick={()=>{this.searchForAlternateTrains()}}>  Search For Alternate Routes?</Button>
            {loading===true?<Loader type="Bars" color="black" height={30} width={30} />:null}
            {trains!==null? trains.map((train,index)=><AlternateTrainsRendering 
            origin={origin} destination={destination} trains={train} key={index}/>) : null}
        </React.Fragment>
        );
    }
}

export default AlternateTrains;