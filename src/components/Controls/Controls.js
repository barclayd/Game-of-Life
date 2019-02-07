import React from 'react';
import * as classes from './Controls.module.css';

let button1 = true;
let button2 = true;
let button3 = true;
let button4 = true;

const controls = props => {

    const btnClickedHandler = (id) => {
        switch (id) {
            case 1:
                button1 ? props.play() : props.pause();
                button1 = !button1;
                break;
            case 2:
                button2 ? props.play() : props.pause();
                button2 = !button2;
                break;
            case 3:
                button3 ? props.seed() : props.clear();
                button3 = !button3;
                break;
            case 4:
                button4 ? props.fast() : props.slow();
                button4 = !button4;
                break;
            case 5:
                props.clear();
                break;
            default:
                return;
        }
    };

    const selectGridSizeHandler = (event) => {
        props.gridSize(event.target.value);
    };

    return (
        <div className={classes.center}>
            <div className={classes.btnToolbar}>

                <span className={classes.toggle}>
                    <input type="checkbox" onClick={() => btnClickedHandler(3)} />
                    <label off="Clear" on="Seed"></label>
                </span>


                <span className={classes.toggle}>
                    <input type="checkbox" onClick={() => btnClickedHandler(2)}/>
                    <label off="&#9724;" on="&#9654;"></label>
                </span>

                <span className={classes.toggle}>
                    <input type="checkbox" onClick={() => btnClickedHandler(4)} />
                    <label off="Slow" on="Fast"></label>
                </span>

                <span>
                    <select className={classes.select} defaultValue={'3'} onChange={(event) => selectGridSizeHandler(event)}>
                      <option value='1'>10x20</option>
                      <option value='2'>25x35</option>
                      <option value='3'>50x70</option>
                    </select>
                </span>
            </div>
        </div>
    );
};

export default controls;
