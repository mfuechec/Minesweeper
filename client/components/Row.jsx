import React from 'react';
import Square from './Square.jsx';

function Row(props) {

    let columns = [];

    for (let i = 0; i < 10; i++) {
        columns.push(i);
    }

    return (
        columns.map((column, i) =>
            <div key={i} className={`squares column${i}`}>
                <Square row={props.row} column={column} />
            </div>
        )
    )
}

export default Row;