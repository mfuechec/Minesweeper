import React from 'react';

function boardResizer(props) {

    return (
        <div id='boardResizer'>
            <select className='selection' id='selection'>
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='18'>18</option>
            </select>
            <button className='selection' onClick={() => { props.resetBoard() }}>New Board</button>
        </div>
    )
}

export default boardResizer;