import React from 'react';



const DirectTrains = ({origin, destination, train, index}) =>
{
    const trainNumber = train.number;
    const trainName = train.name!==undefined?train.name[0]:"MEMU Passenger";
    const timeOfDepartureAtOrigin = train.originDepartTime;
    return (
    <>
        <li id={index}>{trainNumber} - {trainName}</li>
        Time of Arrival at {origin}:{" "}{timeOfDepartureAtOrigin}
    </>
    );
}

export default DirectTrains;