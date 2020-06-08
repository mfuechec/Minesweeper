import * as React from 'react';

function Timer(props) {

    function increment() {
        setTimeout(() => {
            let element = document.getElementById('timer');
            element.innerText = JSON.stringify(parseInt(element.innerText) + 1);
            increment();
        }, 1000)
    }

    if (props.reset === false) {
        increment();
    }

    return (
        <div id='timer'>0</div>
    )
}

export default Timer;