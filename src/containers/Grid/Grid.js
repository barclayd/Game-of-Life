import React from 'react';
import Box from '../../components/Box/Box';
import * as classes from './Grid.module.css';

const Grid = (props) => {

    const width = props.columns * 16;

    let boxClass = "";
    const rowsArray = props.gridFull.map((rowArr, rowIndex) =>
        rowArr.map((item, colIndex) => {
            const boxId = `${rowIndex}_${colIndex}`;

            boxClass = props.gridFull[rowIndex][colIndex] ? "on" : "off";
            return (
                <Box
                    boxClass={boxClass}
                    boxId={boxId}
                    key={boxId}
                    row={rowIndex}
                    column={colIndex}
                    selectBox={props.selectBox}
                    selectBoxHandler={props.selectBoxHandler}/>
            );
        })
    );
        return (
            <div className={classes.grid} style={{width: width}}>
                {rowsArray}
            </div>
        )
};

export default Grid;
