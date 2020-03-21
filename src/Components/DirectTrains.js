import React from 'react';



const DirectTrains = ({train, index}) =>
{
    console.log(train);
    const trainNumber = train.number;
    const trainName = train.name[0];
    return (
    <li id={index}>{trainNumber} - {trainName}</li>
    );
}

export default DirectTrains;