import React from 'react';



const DirectTrains = ({train, index}) =>
{
    console.log(train);
    const trainNumber = train.number;
    const trainName = train.name!==undefined?train.name[0]:null;
    return (
    <li id={index}>{trainNumber} - {trainName}</li>
    );
}

export default DirectTrains;