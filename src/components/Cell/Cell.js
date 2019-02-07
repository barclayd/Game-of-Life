import React from 'react';
import * as classes from './Cell.module.css';


const cell = (props) => {
    let styling;
    styling = props.cellClass === 'on' ? [classes.box, classes.on] : [classes.box, classes.off];

    return (
    <div
        className={styling.join(' ')}
        id={props.cellId}
        onClick={() => props.selectBoxHandler(props.row, props.column)}>
    </div>
    );
};

export default cell;
