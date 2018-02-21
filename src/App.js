import React, { Component } from 'react';
import './App.css';

import Gradient from './shaders/Gradient';
import Retro from './shaders/Retro';
import { Surface } from 'gl-react-dom';

import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    RETRO_RES_Y,
    RETRO_RES_X
} from './constants/dimensions';
import { GREEN, BLUE, PINK, PURPLE, RED, YELLOW } from './constants/colors';

import timeLoop from './helpers/timeLoop';

class Animated extends Component {
    render() {
        const { time } = this.props;
        return (
            <Surface width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
                <Retro
                    res_x={this.props.retro_res_x}
                    res_y={this.props.retro_res_y}>
                    <Gradient
                        color_stop_1={this.props.color_stop_1}
                        color_stop_2={this.props.color_stop_2}
                        time={time}
                    />
                </Retro>
            </Surface>
        );
    }
}

const AnimatedGradient = timeLoop(Animated);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            retro_res_x: RETRO_RES_X,
            retro_res_y: RETRO_RES_Y,
            color_stop_1: BLUE,
            color_stop_2: PURPLE
        };
        this.handleXResUpdate = this.handleXResUpdate.bind(this);
        this.handleYResUpdate = this.handleYResUpdate.bind(this);
    }
    handleXResUpdate(res) {
        this.setState({
            retro_res_x: parseInt(res)
        });
    }
    handleYResUpdate(res) {
        this.setState({
            retro_res_y: parseInt(res)
        });
    }
    render() {
        return (
            <div className="App">
                <AnimatedGradient {...this.state} />
                <form action="">
                    <label htmlFor="x">
                        X Resolution
                        <input
                            ame="x"
                            type="range"
                            min={0}
                            max={CANVAS_WIDTH}
                            onChange={e => {
                                this.handleXResUpdate(e.target.value);
                            }}
                        />
                    </label>
                    <label htmlFor="y">
                        Y Resolution
                        <input
                            name="y"
                            type="range"
                            min={0}
                            max={CANVAS_HEIGHT}
                            onChange={e => {
                                this.handleYResUpdate(e.target.value);
                            }}
                        />
                    </label>
                </form>
            </div>
        );
    }
}

export default App;
