import * as React from 'react';

function boardResizer(props) {

    return (
        <div id='boardResizer'>
            <div className='resizerText' >Size</div>
            <select className='selection' id='sizeSelector'>
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='18'>18</option>
            </select>
            {/* <div className='resizerText' >Difficulty</div>
            <select className='selection' id='difficultySelector'>
                <option value='1.5'>Easy</option>
                <option value='1.75'>Medium</option>
                <option value='2'>Hard</option>
            </select> */}
            <button className='selection' onClick={() => { props.resetBoard() }}>New Board</button>
        </div>
    )
}

export default boardResizer;