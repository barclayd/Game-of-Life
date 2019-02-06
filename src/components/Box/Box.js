import React from 'react';
import * as classes from './Box.module.css';


const box = (props) => {
    let styling;
    styling = props.boxClass === 'on' ? [classes.box, classes.on] : [classes.box, classes.off];

    return (
    <div
        className={styling.join(' ')}
        id={props.boxId}
        onClick={() => props.selectBoxHandler(props.row, props.column)}>
    </div>
    );
};

export default box;
