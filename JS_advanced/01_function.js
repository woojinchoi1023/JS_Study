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