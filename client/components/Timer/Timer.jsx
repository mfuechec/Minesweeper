import * as React from 'react';

function Timer(props) {
    return (
        <div id='timer'>{Math.floor((props.currentTime - props.startTime) / 1000)}</div>
    )
}

export default Timer;