import React from 'react';
import Cell from '../Cell/Cell';
import * as classes from './Grid.module.css';

const Grid = (props) => {

    const width = props.columns * 16;

    let cellClass = "";
    const cellsArray = props.grid.map((rowArr, rowIndex) =>
        rowArr.map((item, colIndex) => {
            const cellId = `${rowIndex}_${colIndex}`;

            cellClass = props.grid[rowIndex][colIndex] ? "on" : "off";
            return (
                <Cell
                    cellClass={cellClass}
                    cellId={cellId}
                    key={cellId}
                    row={rowIndex}
                    column={colIndex}
                    selectCellHandler={props.selectCellHandler}/>
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
