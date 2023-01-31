import React, { createRef } from "react";
import { Component } from "react";
import Try from './Try';

function getNumbers() {
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (candidate.length)), 1)[0]; //제거한 요소를 담은 배열 반환
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [], //push 쓰면 안 돼요. 새로운 배열이 필요하다
  }

  onSubmitForm = (e) => {
    // const { value, tries, answer } = this.state; //비구조화할당
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState((prevState) => {
        return {
          result: 'homerun~',
          tries: [...prevState.tries, {try: prevState.value, result: 'homerun~'}],
        }
      })
      alert('restart game');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      })
    } else {
      const answerArray = this.state.value.split('').map((v) => parseInt(v)); //한개씩 쪼개서 array로
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `you tried too much. answer is ${this.state.answer.join('')}`
        });
        alert('restart game');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        })
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike++;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball++;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, {try: prevState.value, result: `${strike} Strike ${ball} Ball`}],
            value: '',
            result:  `${strike} Strike ${ball} Ball`,
          }
        })
        this.inputRef.current.focus();
      }
    }
  }

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef(); //createRef --> current를 써야함


  fruits = [
    {fruit: '사과', taste: '맛있다'}, 
    {fruit: '배', taste: '쏘소'},
    {fruit: '귤', taste: '굿'}, 
    {fruit: '밤', taste: '와우'},
    ];
  

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput}></input>
        </form>
        <div>tries: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((val, i) => {
            return (
              <Try key={val.try + val.result + i } value={val} index={i} />
            )
          })}
        </ul>
      </>
    )
  }
}

export default NumberBaseball;