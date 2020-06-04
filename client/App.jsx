import React, { useState, useEffect } from 'react';
import Board from './components/Board.jsx';
import SplodeModal from './components/Message/SplodeModal.jsx';
import WinnersModal from './components/Message/WinnersModal.jsx';
import BoardResizer from './components/BoardResizer.jsx';

function App() {

    let [boardSize, setBoardSize] = useState(10);
    let numOfMines = boardSize * 2;
    let [bombs, setBombs] = useState(generateMines(boardSize, numOfMines));
    let [selected, setSelected] = useState({});

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

    return (
        <div id='boardContainer'>
            <SplodeModal />
            <WinnersModal />
            <BoardResizer setBoardSize={setBoardSize} />
            <Board boardSize={boardSize} bombs={bombs} setBombs={setBombs} selected={selected} setSelected={setSelected} />
        </div>
    )

}

export default App;