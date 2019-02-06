import React, {Component} from 'react';
import Box from '../../components/Box/Box';
import * as classes from './Grid.module.css';

class Grid extends Component {

    selectBoxHandler = (row, col) => {
        // pass in row and col to function
    };

    render() {
        let rowsArray = [];
        let boxClass = "";
        for (let i = 0; i < this.props.rows; i++) {
            for (let j=0; j < this.props.columns; j++) {
                let boxId = i + "_" + j;
                boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
                rowsArray.push(
                    <Box
                        boxClass={boxClass}
                        boxId={boxId}
                        key={boxId}
                        row={i}
                        column={j}
                        selectBox={this.selectBoxHandler} />
                )
            }
        }

        const width = this.props.columns * 16;

        return (
            <div className={classes.grid} style={{width: width}}>
                {rowsArray}
            </div>
        )
    }
}

export default Grid;
