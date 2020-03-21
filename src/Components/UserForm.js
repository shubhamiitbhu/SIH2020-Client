import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import API from '../utils/API';
import DirectTrains from './DirectTrains.js';
import AlternateTrains from './AlternateTrains.js'


class UserForm extends React.Component
{
    state = {
        origin: '',
        destination: '',
        trains: null
    }

   

    submitData = async (e) =>
    {
        e.preventDefault();
        const origin = this.state.origin.toUpperCase();
        const destination = this.state.destination.toUpperCase();

        try{
        const trains = await API.get(`direct-trains/${origin}/${destination}`);
        this.setState({trains: trains.data.direct})
        }
        catch(error)
        {
            toast.error("Invalid Station Details");
        }
        
    }

    changeInDestinationForm = (e) =>
    {
        e.preventDefault();
        this.setState({
            destination: e.target.value,
            trains: null
        });
    }

    changeInOriginForm = (e)=>
    {
        e.preventDefault();
        this.setState({
            origin: e.target.value,
            trains: null
        });
        
    }
    
    render()
    {
        const {trains, origin, destination} = this.state;
      
        return(
            <React.Fragment>
                <Form>
                    <Form.Field>
                        <label>Origin </label>
                        <Form.Input placeholder='Origin Station code' onChange={this.changeInOriginForm}/>
                    </Form.Field>
                    <Form.Field>
                        <br />
                        <label>Destination  </label>
                        <Form.Input placeholder='Destination Station code' onChange={this.changeInDestinationForm}/>
                    </Form.Field>
                    <Form.Field>
      
                    </Form.Field>
                    <Button type='submit' onClick = {(e)=>{this.submitData(e)}}>Submit</Button>
                </Form>
                <ul>
                {trains !==null?trains.map((train,index)=><DirectTrains train={train} index={index} key={index} />):null}
                </ul>
                <div>
                {trains !== null && trains.length === 0?<AlternateTrains id={origin+destination} origin={origin} destination={destination} />:null}
                </div>
                <ToastContainer />
            </React.Fragment>
            );
    }
} 

export default UserForm;