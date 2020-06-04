import React from 'react';

function Square(props) {

    let coordinates = props.coordinates;

    function select(coordinates) {
        if (props.selected[coordinates] !== 1) {
            let newSelected = props.selected;
            newSelected[coordinates] = 1;
            props.setSelected(newSelected);
            toggle(coordinates);
            if (bordersBombs(coordinates) === false) {
                selectAllNeighbors(coordinates);
            }
        }
    }

    function toggle(coordinates) {
        let element = document.getElementById(coordinates);
        element.innerText = `${numberOfNeighboringBombs(coordinates)}`;
    }

    function bordersBombs(coordinates) {
        let row = coordinates[0];
        let column = coordinates[1];

        if (isBomb([(row - 1), (column - 1)])) { return true };
        if (isBomb([(row - 1), (column)])) { return true };
        if (isBomb([(row - 1), (column + 1)])) { return true };
        if (isBomb([(row), (column - 1)])) { return true };

        if (isBomb([(row), (column + 1)])) { return true };
        if (isBomb([(row + 1), (column - 1)])) { return true };
        if (isBomb([(row + 1), (column)])) { return true };
        if (isBomb([(row + 1), (column + 1)])) { return true };

        return false;
    }

    function numberOfNeighboringBombs(coordinates) {
        let row = coordinates[0];
        let column = coordinates[1];
        let count = 0;

        if (isBomb([(row - 1), (column - 1)])) { count++ };
        if (isBomb([(row - 1), (column)])) { count++ };
        if (isBomb([(row - 1), (column + 1)])) { count++ };
        if (isBomb([(row), (column - 1)])) { count++ };

        if (isBomb([(row), (column + 1)])) { count++ };
        if (isBomb([(row + 1), (column - 1)])) { count++ };
        if (isBomb([(row + 1), (column)])) { count++ };
        if (isBomb([(row + 1), (column + 1)])) { count++ };

        return count;
    }

    function selectAllNeighbors(coordinates) {
        let row = coordinates[0];
        let column = coordinates[1];

        if (row - 1 > -1 && column - 1 > -1 && row - 1 < props.boardSize && column - 1 < props.boardSize) { select([row - 1, column - 1]) };
        if (row - 1 > -1 && column > -1 && row - 1 < props.boardSize && column < props.boardSize) { select([row - 1, column]) };
        if (row - 1 > -1 && column + 1 > -1 && row - 1 < props.boardSize && column + 1 < props.boardSize) { select([row - 1, column + 1]) };
        if (row > -1 && column - 1 > -1 && row < props.boardSize && column - 1 < props.boardSize) { select([row, column - 1]) };

        if (row > -1 && column + 1 > -1 && row < props.boardSize && column + 1 < props.boardSize) { select([row, column + 1]) };
        if (row + 1 > -1 && column - 1 > -1 && row + 1 < props.boardSize && column - 1 < props.boardSize) { select([row + 1, column - 1]) };
        if (row + 1 > -1 && column > -1 && row + 1 < props.boardSize && column < props.boardSize) { select([row + 1, column]) };
        if (row + 1 > -1 && column + 1 > -1 && row + 1 < props.boardSize && column + 1 < props.boardSize) { select([row + 1, column + 1]) };
    }

    function isBomb(coordinates) {
        if (props.bombs[coordinates] === 1) {
            return true;
        } else {
            return false;
        }
    }

    function failure() {
        let element = document.getElementById('lost');
        element.style.display = 'block';

        showBombs();

        element = document.getElementsByClassName('square');
        for (let i = 0; i < element.length; i++) {
            element[i].disabled = true;
        }
    }

    function showBombs() {
        let bombs = Object.keys(props.bombs);

        for (let i = 0; i < bombs.length; i++) {
            let element = document.getElementById(bombs[i]);
            element.innerText = '!!!';
            element.style.backgroundColor = 'red';
        }
    }

    if (isBomb(coordinates)) {
        return (
            <button className='square' id={coordinates} onClick={() => failure()}></button>
        )
    } else {
        return (
            <button className='square' id={coordinates} display='none' onClick={() => { select(coordinates) }}></button>
        )
    }
}

export default Square;