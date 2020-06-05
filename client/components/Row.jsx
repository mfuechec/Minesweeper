import React from 'react';
import Square from './Square.jsx';

function Row(props) {

    let columns = [];

    for (let i = 0; i < props.boardSize; i++) {
        columns.push(i);
    }

    return (
        columns.map((column, i) =>
            <div key={i} className={`squares column${i}`}>
                <Square boardSize={props.boardSize} bombs={props.bombs} setSelected={props.setSelected} selected={props.selected} coordinates={[props.row, column]} />
            </div>
        )
    )
}

export default Row;