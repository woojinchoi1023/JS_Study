const add = (a, b)  => a + b;

function calculator(func, a, b) {
  return func(a, b);
}

const onClick = () => (event) => { //리턴되는 함수에 event가 매개변수parameter로 있어야 한다
  console.log('hello');
}

document.querySelector('#header').addEventListener('click', onClick());

//함수의 선언과 호출을 구별

const x = 'x';
function c() {
  const y = 'y';
  console.log('c');
}

function a() {
  const x = 'x';
  console.log('a');
  function b() {
    const z = 'z';
    console.log('b');
    c();
  }
  b();
}

a(); //a b c
c(); // c

//callStack, Background, TaskQue

//ScopeChain

//hoisting = const X, var O, func O,
//let ? const ? hoisting ?? TDZ Temporal dead zone

//this --> window
//use strict --> this = undefined
//this --> 함수가 호출될 때 정해진다
//객체 --> this가 바뀐다. obj로.
//단! 화살표함수 -> 부모의 this
//new --> 자기자신
//.bind (만들기만) .call(만들고 호출) .apply(만들고 호출) ---> this를 바꿔준다
