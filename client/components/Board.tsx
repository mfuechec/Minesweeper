import * as React from 'react';
import Row from './Row';

function Board(props) {

    let rows: Array<number> = [];

    for (let i: number = 0; i < props.boardSize; i++) {
        rows.push(i);
    }

    let element: any = rows.map((row, i) => {
        return (
            <div className='rows' key={i} id={`row-${i}`}>
                <Row gameLogic={props.gameLogic} key={`row${i}`} boardSize={props.boardSize} row={row} />
            </div>
        )
    })

    return element;
}

export default Board;