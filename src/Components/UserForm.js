import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

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
        nearbyButtonView: "none",
        submitButtonView: "block",
        loading: false
    }

   

    submitData = async (event) =>
    {
        event.preventDefault();
        this.setState({loading:true})
        const body = {origin: this.state.origin, destination:this.state.destination, date: this.state.date}
        try{
        const trains = await API.post(`/direct-trains`,body);
        this.setState({trains: trains.data.direct, nearbyButtonView: "block", submitButtonView:"none", loading: false})
        }
        catch(error)
        {
            toast.error("Invalid Station Details");
            this.setState({loading:false})
        }
        
    }

    changeInDestinationForm = (event) =>
    {
        event.preventDefault();
        this.setState({
            destination: event.target.value.toUpperCase(),
            trains: null,
            submitButtonView:"block"
        });
    }

    changeInOriginForm = (event)=>
    {
        event.preventDefault();
        this.setState({
            origin: event.target.value.toUpperCase(),
            trains: null,
            submitButtonView:"block"
        });
        
    }

    changeCalenderView = (e) =>
    {
        e.preventDefault();
        this.state.calenderView==='block'?this.setState({calenderView:"none"}):
        this.setState({calenderView:"block"});
    }

    loadTrainsFromNearby=async (e)=>
    {
        e.preventDefault();
        this.setState({loading:true})
        const body = {origin: this.state.origin, destination:this.state.destination, date: this.state.date}
        
        try{
            const nearbyTrains = await API.post(`/direct-trains/from-nearby-stations`,body);
            nearbyTrains.data.direct.map(train=>
            this.setState({trains: [...this.state.trains,train]}));
            this.setState({nearbyButtonView:"none"})
            }
            
            catch(error)
            {
                toast.error("Invalid Station Details");
            }
        this.setState({loading:false})
    }

    changeDate = (value) =>
    {
        this.setState({date: value, calenderView: "none", trains: null, nearbyButtonView: "none"});
    }
    
    render()
    {
        const {trains, origin, destination, date, calenderView, 
            nearbyButtonView, loading, submitButtonView} = this.state;
      
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
                            minDate={new Date()}
                            maxDate= {new Date((new Date()).getTime()+120*24*60*60*1000)}
                            />
                        </StyledCalender>
                    </Form.Field>
                    <Form.Field>
      
                    </Form.Field>
                    <SubmitButton type='submit' onClick = {(e)=>{this.submitData(e)}} display={submitButtonView}>Submit</SubmitButton>
                </Form>
                
                <ul>
                {trains !==null?trains.map((train,index)=><DirectTrains origin={origin} destination={destination}
                train={train} index={index} key={index} />):null}
                {trains !==null && trains.length===0? <div>No direct trains to show</div>:null}
          
                <StyledButton type="submit" onClick={(e)=>{this.loadTrainsFromNearby(e)}} display={nearbyButtonView}>
                    Suggest alternate route (Direct)
                </StyledButton>
                </ul>
                <div>
                {trains !== null && trains.length === 0 && nearbyButtonView==="none" ?
                <AlternateTrains id={origin+destination} origin={origin} destination={destination} />:null}
                </div>
                <ToastContainer />
                {loading===true?<Loader type="Bars" color="black" height={30} width={30} />:null}
            </React.Fragment>
            );
    }
} 

const StyledCalender = styled.div`
    display: ${props => props.display}
`;

const SubmitButton=styled.button`
    display: ${props=>props.display}
`;

const StyledButton=styled.button`
    display: ${props => props.display}
`;

export default UserForm;