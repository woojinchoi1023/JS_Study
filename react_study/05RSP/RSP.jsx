import React, { Component, useEffect, useState } from "react";

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

const RSP = () => {

  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  let interval;
  
  const changeHand = () => {
    console.log('imgCoord :>> ', imgCoord, rspCoords.바위);
  if (imgCoord === rspCoords.바위) {
    setImgCoord(rspCoords.가위);
  } else if (imgCoord === rspCoords.가위) {
    setImgCoord(rspCoords.보);
  } else if (imgCoord === rspCoords.보) {
    setImgCoord(rspCoords.바위);
  }
  }
  
  useEffect(() => {
    interval = setInterval(changeHand, 100);
    // setTimeout(changeHand, 100);

    return () => {//componentWillUnmount 부분
      clearInterval(interval);
    }
  },[imgCoord])

  const onClickBtn = (choice) => () => { //onClick 안에 함수 호출하는 함수가 들어있다 --> 중간에 ()추가
    clearInterval(interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('tie');
    } else if ([-1, 2].includes(diff)) { //win
      setResult('win');
      setScore((prevScore) => {
        return prevScore + 1;
      })
    } else { //lose
      setResult('lose');
      setScore((prevScore) => {
        return prevScore - 1;
      })
    }
    setTimeout(() => {
      interval = setInterval( changeHand, 100);
    }, 1000);
  };
  
  return (
  <>
  <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
  <div>
    <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
    <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
    <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
  </div>
  <div>{result}</div>
  <div>현재 {score}점</div>
  </>
  )
}

export default RSP;