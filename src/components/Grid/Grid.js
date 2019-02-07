import React from 'react';
import Box from '../Cell/Cell';
import * as classes from './Grid.module.css';

const Grid = (props) => {

    const width = props.columns * 16;

    let cellClass = "";
    const cellsArray = props.gridFull.map((rowArr, rowIndex) =>
        rowArr.map((item, colIndex) => {
            const cellId = `${rowIndex}_${colIndex}`;

            cellClass = props.gridFull[rowIndex][colIndex] ? "on" : "off";
            return (
                <Box
                    cellClass={cellClass}
                    cellId={cellId}
                    key={cellId}
                    row={rowIndex}
                    column={colIndex}
                    selectBoxHandler={props.selectBoxHandler}/>
            );
        })
    );
        return (
            <div className={classes.grid} style={{width: width}}>
                {cellsArray}
            </div>
        )
};

export default Grid;
