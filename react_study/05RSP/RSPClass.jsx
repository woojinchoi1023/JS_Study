import React, { Component } from "react";

//class경우 constructor -> render -> ref -> componentDidMount -> 
// setstate -> shouldComponentUpdate(true) -> render -> componentDidUpdate -> 
// ComponentWillUnmount -> 소멸

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};
//나 - 상대
//가위 일때 승리: 2, 비김: 0, 패배: 1
//바위 일대 승리: -1, 비김: 0, 패배: 1
//보 일때 승리: -1, 비김: 0, 패배: -2 

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => v[1] === imgCoord)[0];
};


class RSP extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
  };

  interval;

  changeHand = () => {
    const {imgCoord} = this.state; //비동기일때 밖에꺼 참조하면 클로저문제 발생
  if (imgCoord === rspCoords.바위) {
    this.setState({
      imgCoord: rspCoords.가위,
    });
  } else if (imgCoord === rspCoords.가위) {
    this.setState({
      imgCoord: rspCoords.보,
    });
  } else if (imgCoord === rspCoords.보) {
    this.setState({
      imgCoord: rspCoords.바위,
    });
  }
    
  }

  componentDidMount() { //컴포넌트 첫 렌더링된 후 . 여기에 비동기 요청을 많이 해요
    this.interval = setInterval(this.changeHand, 100);
  };

  // componentDidUpdate() { //리렌더링 후

  // }

  componentWillUnmount() { //컴포넌트가 제거되기 직전, 부모에 의해 없어지는것. 비동기 요청 정리
  }

  onClickBtn = (choice) => () => { //onClick 안에 함수 호출하는 함수가 들어있다 --> 중간에 ()추가
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: 'tie'
      });
    } else if ([-1, 2].includes(diff)) { //win
      this.setState((prevState) => {
        return {
          result: 'you win',
          score: prevState.score + 1,
        }
      })
    } else { //lose
      this.setState((prevState) => {
        return {
          result: 'you lose',
          score: prevState.score - 1,
        }
      })
    }
    setTimeout(() => {
      this.interval = setInterval( this.changeHand, 100);
    }, 1000);
  };


  render() {
    const { result, score, imgCoord } = this.state;
    return(
      <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>

    )
  }
}

export default RSP;