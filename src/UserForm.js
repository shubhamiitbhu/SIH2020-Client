import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import API from './utils/API';

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
        const result = await API.get(`status/${origin}/${destination}`);
        this.setState({result: result})
        console.log(result);
        }
        catch(e)
        {
            console.log(e);
        }
        
    }

    changeInDestinationForm = (e) =>
    {
        e.preventDefault();
        this.setState({
            destination: e.target.value
        });
    }

    changeInOriginForm = (e)=>
    {
        e.preventDefault();
        this.setState({
            origin: e.target.value
        });
    }
    
    render()
    {
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

    </React.Fragment>
            
    );
    }
} 

export default UserForm;