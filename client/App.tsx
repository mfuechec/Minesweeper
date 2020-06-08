import * as React from 'react';
import { useState } from 'react';
import Board from './components/Board';
import Message from './components/Message/Message';
import BoardResizer from './components/BoardResizer';
import Timer from './components/Timer/Timer';

function App() {

    let [boardSize, setBoardSize] = useState(10);
    let [difficulty, setDifficulty] = useState(2);
    let [bombs, setBombs] = useState(generateMines(boardSize, boardSize * difficulty));
    let [selected, setSelected] = useState({});
    let [message, setMessage] = useState('Good luck, dude!');
    let [reset, setReset] = useState(false);
    let [stopped, setStopped] = useState(false);

    function generateMines(boardSize, numOfMines) {
        let mines = {};

        while (numOfMines > 0) {
            let coordinates: Array<number> = [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)];
            let coords: string = JSON.stringify(coordinates);
            if (mines[coords] === undefined) {
                mines[coords] = 1;
                numOfMines--;
            }
        }
        return mines;
    }

    function resetBoard() {

        let element = document.getElementById('sizeSelector') as HTMLInputElement;
        setBoardSize(parseInt(element.value));
        setBombs(generateMines(element.value, parseInt(element.value) * difficulty))

        let elements = document.getElementsByClassName('empty') as HTMLCollectionOf<HTMLInputElement>;
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }

        elements = document.getElementsByClassName('bombs') as HTMLCollectionOf<HTMLInputElement>;
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }

        elements = document.getElementsByClassName('messageContainer') as HTMLCollectionOf<HTMLInputElement>;
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }

        elements = document.getElementsByClassName('square') as HTMLCollectionOf<HTMLInputElement>;
        for (let i = 0; i < elements.length; i++) {
            elements[i].disabled = false;
            elements[i].style.backgroundColor = '#2192bc';
        }

        setSelected({});
        setMessage('Good Luck, dude!');
        let timer = document.getElementById('timer') as HTMLInputElement;
        timer.innerText = '0';
        setReset(true);
    }

    function showBombs() {
        let bombs = document.getElementsByClassName('bombs') as HTMLCollectionOf<HTMLInputElement>;

        for (let i = 0; i < bombs.length; i++) {
            bombs[i].style.display = 'block';
        }
    }

    let gameLogic = {

        failure() {
            showBombs();

            let element = document.getElementsByClassName('square') as HTMLCollectionOf<HTMLInputElement>;
            for (let i = 0; i < element.length; i++) {
                element[i].disabled = true;
            }

            setMessage('You Lose, Loser!')
            setStopped(true);
        },

        victory() {
            let element = document.getElementsByClassName('square') as HTMLCollectionOf<HTMLInputElement>;
            for (let i = 0; i < element.length; i++) {
                element[i].disabled = true;
            }

            let timer = document.getElementById('timer') as HTMLInputElement;

            setMessage(`You won in ${timer.innerText} seconds!`)
        },

        select(coordinates) {
            let newSelected = selected;
            let coords: string = JSON.stringify(coordinates);
            if (selected[coords] !== 1) {
                newSelected[coords] = 1;
                setSelected(newSelected);
                gameLogic.toggle(coords);
                if (gameLogic.bordersBombs(coordinates) === false) {
                    gameLogic.selectAllNeighbors(coordinates);
                }
            }
            if (Object.keys(newSelected).length === ((boardSize * boardSize) - (boardSize * difficulty))) {
                gameLogic.victory();
            }
        },

        toggle(coordinates) {
            let element = document.getElementById(coordinates) as HTMLInputElement;
            let child = element.children[0] as HTMLInputElement;
            child.style.display = 'block';
            element.style.backgroundColor = '#EEEEEE';
        },

        bordersBombs(coordinates) {
            let row = coordinates[0];
            let column = coordinates[1];

            if (gameLogic.isBomb(JSON.stringify([(row - 1), (column - 1)]))) { return true };
            if (gameLogic.isBomb(JSON.stringify([(row - 1), (column)]))) { return true };
            if (gameLogic.isBomb(JSON.stringify([(row - 1), (column + 1)]))) { return true };
            if (gameLogic.isBomb(JSON.stringify([(row), (column - 1)]))) { return true };

            if (gameLogic.isBomb(JSON.stringify([(row), (column + 1)]))) { return true };
            if (gameLogic.isBomb(JSON.stringify([(row + 1), (column - 1)]))) { return true };
            if (gameLogic.isBomb(JSON.stringify([(row + 1), (column)]))) { return true };
            if (gameLogic.isBomb(JSON.stringify([(row + 1), (column + 1)]))) { return true };

            return false;
        },

        numberOfNeighboringBombs(coordinates) {
            let row = coordinates[0];
            let column = coordinates[1];
            let count = 0;

            if (gameLogic.isBomb(JSON.stringify([(row - 1), (column - 1)]))) { count++ };
            if (gameLogic.isBomb(JSON.stringify([(row - 1), (column)]))) { count++ };
            if (gameLogic.isBomb(JSON.stringify([(row - 1), (column + 1)]))) { count++ };
            if (gameLogic.isBomb(JSON.stringify([(row), (column - 1)]))) { count++ };

            if (gameLogic.isBomb(JSON.stringify([(row), (column + 1)]))) { count++ };
            if (gameLogic.isBomb(JSON.stringify([(row + 1), (column - 1)]))) { count++ };
            if (gameLogic.isBomb(JSON.stringify([(row + 1), (column)]))) { count++ };
            if (gameLogic.isBomb(JSON.stringify([(row + 1), (column + 1)]))) { count++ };

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

    console.log('rendering')

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
                    <Timer stopped={stopped} reset={reset} />
                    <Message message={message} />
                </div>
            </div>
        </div>
    )

}

export default App;