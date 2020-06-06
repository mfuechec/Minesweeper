import * as React from 'react';

function Square(props) {

    let coordinates: string = JSON.stringify(props.coordinates);

    if (props.gameLogic.isBomb(coordinates)) {
        return (
            <button className='square' id={coordinates} onClick={() => props.gameLogic.failure()}>
                <div className='bombs' style={{ display: 'none', backgroundColor: 'red' }}>!!!</div>
            </button>
        )
    } else {
        return (
            <button className='square' id={coordinates} onClick={() => { props.gameLogic.select(props.coordinates) }}>
                <div className='empty' >{props.gameLogic.numberOfNeighboringBombs(props.coordinates)}</div>
            </button>
        )
    }
}

export default Square;