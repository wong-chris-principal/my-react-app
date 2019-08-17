import React, { Component } from 'react';
import { SimonColor } from './SimonColor';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import './SimonGame.css';

export default class SimonGame extends Component {

    constructor() {
        super();
        this.state = {
            title: "Simon Game",
            says: [],
            level: 0,
            activeButton: "",
            interval: 1000,
            isPlayerTerm: false
        }
    }

    s;

    beginLevel(level) {
        const source = interval(1000).pipe(take(level));
        this.setState(
            {
                says: [],
                level: level,
                isPlayerTerm: false
            },
            () => {
                // for(var i=0;i<this.state.level;i++){
                //     this.simonSays();
                // }
                this.s = source.subscribe((idx) => {
                    this.simonSays();
                }, () => { }, () => {
                    if (this.s) {
                        this.s.unsubscribe();
                    }
                    this.setState({
                        isPlayerTerm: true
                    })
                })
            }
        );

        return source;
    }

    playerSays(color) {
        if (this.state.says.length > 0) {
            const nextColor = this.state.says[0];
            if (color != nextColor) {
                this.beginLevel(1);
            }
            else {
                this.setState((prevState, props) => {
                    return {
                        says: prevState.says.slice(1)
                    }
                }, () => {
                    if (this.state.says.length == 0) {
                        this.beginLevel(this.state.level + 1);
                    }
                })
            }
        }
    }

    simonSays() {
        this.setState(
            (prevState, props) => {
                const color = this.generateColor();
                return {
                    says: [...prevState.says, color],
                    activeButton: color
                }
            },
            () => {
                setTimeout(() => {
                    this.setState({
                        activeButton: ""
                    })
                }, 0.7 * this.state.interval);
            }
        )
    }

    generateColor() {
        return this.getRandomColor();
    }

    getRandomColor() {
        var rand = Math.floor(Math.random() * 4) + 1;
        switch (rand) {
            case 1:
                return SimonColor.RED;
            case 2:
                return SimonColor.BLUE;
            case 3:
                return SimonColor.GREEN;
            case 4:
                return SimonColor.YELLOW;
        }

        return null;
    }

    render() {
        const { activeButton, isPlayerTerm } = this.state;
        return (
            <div className="container">
                <div>
                    <h1>Simon Game</h1>
                    {/* debug */}
                    <h3>LEVEL - <span className="level-display">{this.state.level}</span></h3>
                    <div className='simon-board'>
                        <div onClick={() => this.playerSays(SimonColor.RED)} className={activeButton == SimonColor.RED ? "pad-button red active" : "pad-button red"} />
                        <div onClick={() => this.playerSays(SimonColor.BLUE)} className={activeButton == SimonColor.BLUE ? "pad-button blue active" : "pad-button blue"} />
                        <div onClick={() => this.playerSays(SimonColor.GREEN)} className={activeButton == SimonColor.GREEN ? "pad-button green active" : "pad-button green"} />
                        <div onClick={() => this.playerSays(SimonColor.YELLOW)} className={activeButton == SimonColor.YELLOW ? "pad-button yellow active" : "pad-button yellow"} />
                        <div className={isPlayerTerm ? "simon-overlay" : "simon-overlay active"} />
                    </div>
                    <button onClick={() => this.beginLevel(1)} className="start">Start</button>
                </div>
                <div>
                    <div>Active:{activeButton}</div>
                    <select style={{ height: "100%", margin: "0px 15px 15px 15px" }} name="fruit" multiple>
                        {this.state.says.map((item, index) => (
                            <option>{item}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }

}