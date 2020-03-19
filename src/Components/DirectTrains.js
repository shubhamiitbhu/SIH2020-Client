import React from 'react';



const DirectTrains = ({results, index}) =>
{
    return (
    <li id={index}>{results}</li>
    );
}

export default DirectTrains;