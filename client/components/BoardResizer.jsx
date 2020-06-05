import React, { useEffect } from 'react';

function boardResizer(props) {

    function newBoard() {
        let element = document.getElementById('selection');
        props.setBoardSize(element.value);
        props.setBombs(props.generateMines(element.value, element.value * 2))
        props.reset();
    }

    return (
        <div id='boardResizer'>
            <select className='selection' id='selection'>
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='18'>18</option>
            </select>
            <button className='selection' onClick={() => { newBoard() }}>New Board</button>
        </div>
    )
}

export default boardResizer;