import React from 'react';
import Row from './Row.jsx';

function Board() {

    let rows = [];

    for (let i = 0; i < 10; i++) {
        rows.push(i);
    }

    return (
        rows.map((row, i) =>
            <div className='rows' key={i} id={`row-${i}`}>
                <Row row={row} />
            </div>
        )
    )
}

export default Board;