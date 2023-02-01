import React, { Component, useRef, useState } from "react";

// let timeout;
// let startTime;
// let endTime;

const ResponseTest = () => {
  //state --> 다시 리턴부분 실행 (렌더링)
  //ref --> 바뀌어도 다시 렌더링 실행 x
  const [status, setStatus] = useState('waiting');
  const [message, setMessage] = useState('click to start');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();
  
  const onClickScreen = () => {
    if (status === 'waiting') {
      setStatus('ready');
      setMessage('get ready');

      timeout.current = setTimeout(() => {
        setStatus('now');
        setMessage('click now');
        startTime.current = new Date();

      }, Math.floor((Math.random() * 1000) + 2000));
    } else if (status === 'ready') {
      setStatus('waiting');
      setMessage('you clicked too early, reset game!');
      startTime.current = null;
      clearTimeout(timeout.current);

    } else if (status === 'now') {
      endTime.current = new Date();
      const timePast = endTime.current - startTime.current;
      setStatus('waiting');
      setMessage('click to start');
      setResult((prevResult) => {
        return [...prevResult, timePast]
      });
    }
  }

  return (
    <>
      <div 
      id="screen" 
      className={status}
      onClick={onClickScreen}
      >
        {message}
      </div>
      {result.length === 0 
      ? null 
      : <div>average time: {result.reduce((a, c) => a + c) / result.length} ms</div>
      }
      {result.map((v, i) => {
        return (
          <div>{i + 1}. {v} ms</div>
        )
      })}
      
    </>
  )
}


export default ResponseTest;