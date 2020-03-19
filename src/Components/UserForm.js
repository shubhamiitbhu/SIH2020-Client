import React from 'react';
import {Form, Button} from 'semantic-ui-react';

import API from '../utils/API';
import DirectTrains from './DirectTrains.js';
import AlternateTrains from './AlternateTrains.js'

class UserForm extends React.Component
{
    state = {
        origin: '',
        destination: '',
        result: null
    }

    submitData = async (e) =>
    {
        e.preventDefault();
        const origin = this.state.origin.toUpperCase();
        const destination = this.state.destination.toUpperCase();

        try{
        const result = await API.get(`direct-trains/${origin}/${destination}`);
        this.setState({result: result.data.direct})
        console.log(result.data.direct);
        }
        catch(error)
        {
            console.log(error);
        }
        
    }

    changeInDestinationForm = (e) =>
    {
        e.preventDefault();
        this.setState({
            destination: e.target.value,
            result: null
        });
    }

    changeInOriginForm = (e)=>
    {
        e.preventDefault();
        this.setState({
            origin: e.target.value,
            result: null
        });
        
    }
    
    render()
    {
        const {result, origin, destination} = this.state;

        return(
            <React.Fragment>
                <Form>
                    <Form.Field>
                        <label>Origin </label>
                        <input placeholder='First Name' onChange={this.changeInOriginForm}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Destination  </label>
                        <input placeholder='Last Name' onChange={this.changeInDestinationForm}/>
                    </Form.Field>
                    <Form.Field>
      
                    </Form.Field>
                    <Button type='submit' onClick = {(e)=>{this.submitData(e)}}>Submit</Button>
                </Form>
                <ul>
                {result !==null?result.map((result,index)=><DirectTrains results={result} index={index}/>):null}
                </ul>
                <div>
                {result !== null && result.length === 0?<AlternateTrains origin={origin} destination={destination}/>:null}
                </div>

            </React.Fragment>
            );
    }
} 

export default UserForm;