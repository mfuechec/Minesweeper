import * as React from 'react';
import Square from './Square';

function Row(props) {

    let columns: Array<number> = [];

    for (let i: number = 0; i < props.boardSize; i++) {
        columns.push(i);
    }

    let element: any = columns.map((column, i) => {
        return (
            <div key={i} className={`squares column${i}`}>
                <Square gameLogic={props.gameLogic} coordinates={[props.row, column]} />
            </div>
        )
    })

    return element;
}

export default Row;