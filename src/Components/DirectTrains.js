import React from 'react';



const DirectTrains = ({trains, index}) =>
{
    return (
    <li id={index}>{trains}</li>
    );
}

export default DirectTrains;