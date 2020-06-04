import React, { useEffect } from 'react';

function boardResizer(props) {

    function newBoard() {
        let element = document.getElementById('selection');
        props.setBoardSize(element.value);
    }

    return (
        <div id='boardResizer'>
            <select id='selection'>
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='20'>20</option>
            </select>
            <button onClick={() => { newBoard() }}>New Board</button>
        </div>
    )
}

export default boardResizer;