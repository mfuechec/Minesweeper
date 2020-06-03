import React from 'react';

function Square(props) {

    function isBomb(coordinates) {
        return false;
    }
    function isSelected(coordinates) {
        return false;
    }

    if (isBomb([props.row, props.column])) {
        return (
            <div onClick={() => splode()}></div>
        )
    } else if (isSelected([props.row, props.column])) {
        return (
            <div>X</div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Square;