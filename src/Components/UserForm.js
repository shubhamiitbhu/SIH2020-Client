import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';

import API from '../utils/API';
import DirectTrains from './DirectTrains.js';
import AlternateTrains from './AlternateTrains.js'

class UserForm extends React.Component
{
    state = {
        origin: '',
        destination: '',
        date: new Date(),
        trains: null,
        calenderView: "none",
    }

   

    submitData = async (event) =>
    {
        event.preventDefault();
        
        const body = {origin: this.state.origin, destination:this.state.destination, date: this.state.date}
        try{
        const trains = await API.post(`/direct-trains`,body);
        this.setState({trains: trains.data.direct})
        }
        catch(error)
        {
            toast.error("Invalid Station Details");
        }
        
    }

    changeInDestinationForm = (event) =>
    {
        event.preventDefault();
        this.setState({
            destination: event.target.value.toUpperCase(),
            trains: null
        });
    }

    changeInOriginForm = (event)=>
    {
        event.preventDefault();
        this.setState({
            origin: event.target.value.toUpperCase(),
            trains: null
        });
        
    }

    changeCalenderView = (e) =>
    {
        e.preventDefault();
        this.state.calenderView==='block'?this.setState({calenderView:"none"}):
        this.setState({calenderView:"block"});
    }

    changeDate = (value) =>
    {
        this.setState({date: value, calenderView: "none"});
    }
    
    render()
    {
        const {trains, origin, destination, date, calenderView} = this.state;
      
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
                        <br />
                        <label>
                            Date: {("0"+date.getDate()).slice(-2) + "-"
                            + ("0"+(parseInt(date.getMonth(),10)+1)).slice(-2) + "-"
                            + (date.getFullYear())}
                        </label> 
                        {" "}

                        <Button onClick={this.changeCalenderView}>Change Date</Button>
                        <StyledCalender display={calenderView}>
                            <Calendar 
                            value={this.state.date}
                            onChange={this.changeDate}
                            />
                        </StyledCalender>
                    </Form.Field>
                    <Form.Field>
      
                    </Form.Field>
                    <Button type='submit' onClick = {(e)=>{this.submitData(e)}}>Submit</Button>
                </Form>
                <ul>
                {trains !==null?trains.map((train,index)=><DirectTrains origin={origin} destination={destination}
                train={train} index={index} key={index} />):null}
                </ul>
                <div>
                {trains !== null && trains.length === 0?<AlternateTrains id={origin+destination} origin={origin} destination={destination} />:null}
                </div>
                <ToastContainer />
            </React.Fragment>
            );
    }
} 

const StyledCalender = styled.div`
    display: ${props => props.display}
`;

export default UserForm;