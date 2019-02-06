import React from 'react';
import * as classes from './Buttons.module.css';

let button1 = true;
let button2 = true;
let button3 = true;

const buttons = props => {

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
                button3 ? props.play() : props.pause();
                button3 = !button3;
                break;
        }
    };

    return (
        <div className={classes.center}>
            <div className={classes.btnToolbar}>
                <span className={classes.toggle}>
                    <input type="checkbox" onClick={() => btnClickedHandler(1)}/>
                    <label off="&#10122;" on="&#10123;"></label>
                </span>

                <span className={classes.toggle}>
                    <input type="checkbox" onClick={() => btnClickedHandler(2)}/>
                    <label off="&#9724;" on="&#9654;"></label>
                </span>

                <span className={classes.toggle}>
                    <input type="checkbox" onClick={() => btnClickedHandler(3)} />
                    <label off="Stop" on="Play"></label>
                </span>
            </div>
        </div>
    );
};

export default buttons;