import React, { useRef, useState } from "react";
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

const NumberBaseball = () => {
  
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers); //함수의 리턴값이 처음 한번만 들어감. 다시 실행 안됨! lazy init
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);
  
  const onSubmitForm = (e) => {
    // const { value, tries, answer } = this.state; //비구조화할당
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('homerun~');
      setTries((prevTries)=>{ return [...prevTries, {try: value, result: 'homerun~'}]});//옛날거로 새로운걸 만들땐 함수형
      alert('restart game');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split('').map((v) => parseInt(v)); //한개씩 쪼개서 array로
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`you tried too much. answer is ${answer.join('')}`);
        alert('restart game');
        setValue('');
        setAnswer(getNumbers()); //lazy init 해당 없음!! 
        setTries([]);

      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }
        setTries((prevTries)=>{return [...prevTries, {try: value, result: `${strike} Strike ${ball} Ball`}]});
        setValue('');
        setResult(`${strike} Strike ${ball} Ball`);
        inputEl.current.focus();
      }
    }
  }

  const onChangeInput = (e) => {
    console.log(answer);
    setValue(e.target.value);
  };

  return(
    <>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
          <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput}></input>
        </form>
        <div>tries: {tries.length}</div>
        <ul>
          {tries.map((val, i) => {
            return (
              <Try key={val.try + val.result + i } value={val} index={i} />
            )
          })}
        </ul>
      </>
  )
}


export default NumberBaseball;