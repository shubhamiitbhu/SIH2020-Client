import React from 'react';

const AlternateTrainsRendering =({origin, destination, trains})=>
{
    const connectionStation = trains.connection;
    const distance = trains.distance;
    const trainsFromOriginToConnection = trains["origin-connection"];
    const trainsFromConnectionToDestination = trains["connection-destination"];

    return(
    <React.Fragment>
        <div>Distance: {distance}</div>
        <div>Connecting Station: {connectionStation} </div>
        <br />
        <div>
            Trains Between {origin.toUpperCase()} to {connectionStation} <br />
            <ul>{trainsFromOriginToConnection.map((train, index)=><
                li key={index}>{train.number} - {train.name !== undefined?train.name[0]:"MEMU Passenger"}</li>)}
            </ul>
        </div>

        <div>
            Trains Between {connectionStation} to {destination.toUpperCase()} <br />
            <ul>{trainsFromConnectionToDestination.map((train, index)=><li key={index}>{train.number} - {train.name !== undefined?train.name[0]:"MEME Passenger"}</li>)}</ul>
        </div>
    </React.Fragment>
    )
}

export default AlternateTrainsRendering;