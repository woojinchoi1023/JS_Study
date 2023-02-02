import React, { Component } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v,i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p,c) => p - c);
  return [... winNumbers, bonusNumber];
}


class Lottery extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  }

  timeouts = [];

  runTimeouts = () => {
    const {winNumbers} = this.state;
    for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls : [... prevState.winBalls, winNumbers[i]]
          }
        })
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true
      })
    }, 7000);
  }

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) { //setState할 때마다 실행됩니다
    if (this.state.winBalls.length === 0) { //업데이트 될 조건
      this.runTimeouts();
    }
  }

  componentWillUnmount() { //혹시나 메모리 누수
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    })
  }

  onClickRedo = () => { //초기화
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  }


  render() {
    const {winBalls, bonus, redo} = this.state;
    return(
      <>
      <div>Win numbers:</div>
      <div id="result">
        {winBalls.map((v) => <Ball key={v} number={v}/>)}
      </div>
      <div>Bonus!</div>
      {bonus && <Ball number={bonus} />}
      {redo? <button onClick={redo? this.onClickRedo : () => {}}>restart</button> : null}
      {/* <button onClick={redo? this.onClickRedo : () => {}}>restart</button> */}
      </>

    )
  }
}

export default Lottery;