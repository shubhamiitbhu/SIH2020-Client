import React from 'react';

const AlternateTrainsRendering =({origin, destination, result})=>
{
    const connectionStation = result.connection;
    const distance = result.distance;
    const trainsFromOriginToConnection = result["origin-connection"];
    const trainsFromConnectionToDestination = result["connection-destination"];

    return(
    <React.Fragment>
        <div>Distance: {distance}</div>
        <div>Connecting Station: {connectionStation} </div>
        <br />
        <div>
            Trains Between {origin.toUpperCase()} to {connectionStation} <br />
            <ul>{trainsFromOriginToConnection.map((train)=><li>{train}</li>)}</ul>
        </div>

        <div>
            Trains Between {connectionStation} to {destination.toUpperCase()} <br />
            <ul>{trainsFromConnectionToDestination.map((train)=><li>{train}</li>)}</ul>
        </div>
    </React.Fragment>
    )
}

export default AlternateTrainsRendering;