import React, { memo, useState } from "react";

const Try = memo(({ value, index }) => { //memo --> 부모컴포넌트가 리렌더링될때 자식이 리렌더링 되는 것을 막는다
  const [result, setResult] = useState(value.result); //자식은 props 바꾸면 안된다
  //바꾸고 싶으면 state를 써서 state를 바꾼다
  const onClick = () => {
    setResult('1');
  }

  return (
    <li key={value.try + value.result + index}>
      <div>
        <b>{value.try}</b>
      </div>
      <div onClick={onClick}>{result}</div>
    </li>
  );
});
Try.displayName = 'Try';

export default Try;
