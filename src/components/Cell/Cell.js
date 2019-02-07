import React from 'react';
import * as classes from './Cell.module.css';


const cell = (props) => {
    let styling;
    styling = props.cellClass === 'on' ? [classes.cell, classes.on] : [classes.cell, classes.off];

    return (
        <div
            className={styling.join(' ')}
            id={props.cellId}
            onClick={() => props.selectCellHandler(props.row, props.column)}>
        </div>
    );
};

export default cell;
