import React from 'react';
import * as classes from './Box.module.css';


const box = (props) => (
    <div
        className={classes.box}
        id={props.boxId}
        onClick={() => props.selectBox(props.row, props.column)}>
    </div>
);

export default box;
