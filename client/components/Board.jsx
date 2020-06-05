import React from 'react';
import Row from './Row.jsx';

function Board(props) {

    let rows = [];

    for (let i = 0; i < props.boardSize; i++) {
        rows.push(i);
    }

    return (
        rows.map((row, i) =>
            <div className='rows' key={i} id={`row-${i}`}>
                <Row failure={props.failure} boardSize={props.boardSize} bombs={props.bombs} setSelected={props.setSelected} selected={props.selected} row={row} />
            </div>
        )
    )
}

export default Board;