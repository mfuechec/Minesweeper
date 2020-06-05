import React, { useState } from 'react';
import Board from './components/Board.jsx';
import Message from './components/Message/Message.jsx';
import BoardResizer from './components/BoardResizer.jsx';
import Timer from './components/Timer/Timer.jsx';

function App() {

    let [boardSize, setBoardSize] = useState(10);
    let [difficulty, setDifficulty] = useState(2)
    let [bombs, setBombs] = useState(generateMines(boardSize, boardSize * difficulty));
    let [selected, setSelected] = useState({ numbers: 0 });
    let [message, setMessage] = useState('Good luck, dude!');
    let [startTime, setStartTime] = useState(Date.now());
    let [currentTime, setCurrentTime] = useState(Date.now());

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

    function resetBoard() {

        let element = document.getElementById('sizeSelector');
        setBoardSize(element.value);
        setBombs(generateMines(element.value, element.value * difficulty))

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
            elements[i].style.backgroundColor = '#2192bc';
        }

        setSelected({});
        setMessage('Good Luck, dude!');
        setStartTime(Date.now());
        setCurrentTime(Date.now());
    }

    function showBombs() {
        let bombs = document.getElementsByClassName('bombs');

        for (let i = 0; i < bombs.length; i++) {
            bombs[i].style.display = 'block';
        }
    }

    function updateCurrentTime() {
        setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000)
    }

    updateCurrentTime();

    let gameLogic = {

        failure() {
            showBombs();

            let element = document.getElementsByClassName('square');
            for (let i = 0; i < element.length; i++) {
                element[i].disabled = true;
            }

            setMessage('You Lose, Loser!')
        },

        victory() {
            let element = document.getElementsByClassName('square');
            for (let i = 0; i < element.length; i++) {
                element[i].disabled = true;
            }

            setMessage(`You won in ${Math.floor((currentTime - startTime) / 1000)} seconds!`)
        },

        select(coordinates) {
            if (selected[coordinates] !== 1) {
                let newSelected = selected;
                newSelected[coordinates] = 1;
                newSelected.numbers++;
                setSelected(newSelected);
                gameLogic.toggle(coordinates);
                if (gameLogic.bordersBombs(coordinates) === false) {
                    gameLogic.selectAllNeighbors(coordinates);
                }
            }
            if (selected.numbers === (boardSize * boardSize - boardSize * difficulty)) {
                gameLogic.victory();
            }
        },

        toggle(coordinates) {
            let element = document.getElementById(coordinates);
            element.children[0].style.display = 'block';
            element.style.backgroundColor = '#EEEEEE';
        },

        bordersBombs(coordinates) {
            let row = coordinates[0];
            let column = coordinates[1];

            if (gameLogic.isBomb([(row - 1), (column - 1)])) { return true };
            if (gameLogic.isBomb([(row - 1), (column)])) { return true };
            if (gameLogic.isBomb([(row - 1), (column + 1)])) { return true };
            if (gameLogic.isBomb([(row), (column - 1)])) { return true };

            if (gameLogic.isBomb([(row), (column + 1)])) { return true };
            if (gameLogic.isBomb([(row + 1), (column - 1)])) { return true };
            if (gameLogic.isBomb([(row + 1), (column)])) { return true };
            if (gameLogic.isBomb([(row + 1), (column + 1)])) { return true };

            return false;
        },

        numberOfNeighboringBombs(coordinates) {
            let row = coordinates[0];
            let column = coordinates[1];
            let count = 0;

            if (gameLogic.isBomb([(row - 1), (column - 1)])) { count++ };
            if (gameLogic.isBomb([(row - 1), (column)])) { count++ };
            if (gameLogic.isBomb([(row - 1), (column + 1)])) { count++ };
            if (gameLogic.isBomb([(row), (column - 1)])) { count++ };

            if (gameLogic.isBomb([(row), (column + 1)])) { count++ };
            if (gameLogic.isBomb([(row + 1), (column - 1)])) { count++ };
            if (gameLogic.isBomb([(row + 1), (column)])) { count++ };
            if (gameLogic.isBomb([(row + 1), (column + 1)])) { count++ };

            return count;
        },

        selectAllNeighbors(coordinates) {
            let row = coordinates[0];
            let column = coordinates[1];

            if (row - 1 > -1 && column - 1 > -1 && row - 1 < boardSize && column - 1 < boardSize) { gameLogic.select([row - 1, column - 1]) };
            if (row - 1 > -1 && column > -1 && row - 1 < boardSize && column < boardSize) { gameLogic.select([row - 1, column]) };
            if (row - 1 > -1 && column + 1 > -1 && row - 1 < boardSize && column + 1 < boardSize) { gameLogic.select([row - 1, column + 1]) };
            if (row > -1 && column - 1 > -1 && row < boardSize && column - 1 < boardSize) { gameLogic.select([row, column - 1]) };

            if (row > -1 && column + 1 > -1 && row < boardSize && column + 1 < boardSize) { gameLogic.select([row, column + 1]) };
            if (row + 1 > -1 && column - 1 > -1 && row + 1 < boardSize && column - 1 < boardSize) { gameLogic.select([row + 1, column - 1]) };
            if (row + 1 > -1 && column > -1 && row + 1 < boardSize && column < boardSize) { gameLogic.select([row + 1, column]) };
            if (row + 1 > -1 && column + 1 > -1 && row + 1 < boardSize && column + 1 < boardSize) { gameLogic.select([row + 1, column + 1]) };
        },

        isBomb(coordinates) {
            if (bombs[coordinates] === 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    return (
        <div id='fullScreen'>
            <div id='settingsContainer'>
                <BoardResizer resetBoard={resetBoard} />
            </div>
            <div id='gameContainer' style={{ marginTop: `${36 - boardSize * 2}vh` }}>
                <Board gameLogic={gameLogic} boardSize={boardSize} bombs={bombs} setBombs={setBombs} selected={selected} />
            </div>
            <div id='messageContainer'>
                <div id='messageWindow' >
                    <Timer currentTime={currentTime} startTime={startTime} />
                    <Message message={message} />
                </div>
            </div>
        </div>
    )

}

export default App;