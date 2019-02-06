import React, {Component} from 'react';
import * as classes from './Grid.module.css';

class Grid extends Component {

    render() {
        return (
            <div className={classes.grid}>
                <p>Grid goes here!</p>
            </div>
        )
    }
}

export default Grid;
