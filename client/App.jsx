import React, { useState, useEffect } from 'react';
import Board from './components/Board.jsx';
import Message from './components/Message/Message.jsx';
import BoardResizer from './components/BoardResizer.jsx';
import Timer from './components/Timer/Timer.jsx';

function App() {

    let [boardSize, setBoardSize] = useState(10);
    let numOfMines = boardSize * 2;
    let [bombs, setBombs] = useState(generateMines(boardSize, numOfMines));
    let [selected, setSelected] = useState({});
    let [message, setMessage] = useState('Good luck, dude!');

    function generateMines(boardSize, numOfMines) {
        let mines = {};

        while (numOfMines > 0) {
            let coordinates = [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)];
            if (mines[coordinates] === undefined) {
                mines[coordinates] = 1;
                numOfMines--;
            }
        }
        return mines;
    }

    function reset() {
        let elements = document.getElementsByClassName('empty');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }

        elements = document.getElementsByClassName('bombs');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }

        elements = document.getElementsByClassName('messageContainer');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }

        elements = document.getElementsByClassName('square');
        for (let i = 0; i < elements.length; i++) {
            elements[i].disabled = false;
        }
    }

    return (
        <div id='fullScreen'>
            <div id='settingsContainer'>
                <BoardResizer reset={reset} setSelected={setSelected} setBombs={setBombs} generateMines={generateMines} setBoardSize={setBoardSize} />
            </div>
            <div id='gameContainer'>
                <Board boardSize={boardSize} bombs={bombs} setBombs={setBombs} selected={selected} setSelected={setSelected} />
            </div>
            <div id='messageContainer'>
                <div id='messageWindow' >
                    <Timer />
                    <Message message={message} />
                </div>
            </div>
        </div>
    )

}

export default App;