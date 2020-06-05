import React from 'react';

function Square(props) {

    let coordinates = props.coordinates;

    if (props.gameLogic.isBomb(coordinates)) {
        return (
            <button className='square' id={coordinates} onClick={() => props.gameLogic.failure()}>
                <div className='bombs' style={{ display: 'none', backgroundColor: 'red' }}>!!!</div>
            </button>
        )
    } else {
        return (
            <button className='square' id={coordinates} onClick={() => { props.gameLogic.select(coordinates) }}>
                <div className='empty' onClick={() => { props.gameLogic.select(coordinates) }}>{props.gameLogic.numberOfNeighboringBombs(coordinates)}</div>
            </button>
        )
    }
}

export default Square;