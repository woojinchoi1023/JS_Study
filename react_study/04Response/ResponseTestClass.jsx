import React, { Component, useRef, useState } from "react";

// let timeout;
// let startTime;
// let endTime;


class ResponseTest extends Component {
  state = {
    state: 'waiting',
    message: 'click to start',
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result} = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: 'ready!!',

      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: 'click now!',
        });
        this.startTime = new Date();
      }, Math.floor((Math.random() * 1000) + 2000));
    } else if (state === 'ready') {
      this.setState({
        state: 'waiting',
        message: 'you clicked too early, reset game!'
      });
      this.startTime = null;
      clearTimeout(this.timeout);
    } else if (state === 'now') {
      this.endTime = new Date();
      const timePast = this.endTime - this.startTime;
      this.setState((prevState) => {
        return{
        state: 'waiting',
        message: 'click to start',
        result: [...prevState.result, timePast]
        }});
      
    }
  };

  render() {
    return (
      <>
        <div 
        id="screen" 
        className={this.state.state}
        onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.state.result.length === 0 
        ? null 
        : <div>average time: {this.state.result.reduce((a, c) => a + c) / this.state.result.length} ms</div>
        }
        {this.state.result.map((v, i) => {
          return (
            <div>{i + 1}. {v} ms</div>
          )
        })}
        
      </>
    )
  }
}

export default ResponseTest;