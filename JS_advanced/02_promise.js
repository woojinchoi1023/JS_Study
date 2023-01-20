setTimeout(() => {
  console.log('a');
}, 1000);

function calculator(callback, a , b) {
  return callback(a,b);
}

calculator(function(x, y) {return x + y}, 3, 5)

//동기임

setTimeout(() => {
  console.log('a');
}, 1000);

const promise = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve();
}, 1000);
});

promise.then(() => {
  console.log('a');
})

//한번 비동기는 영원한 비동기
//비동기는 동시의 문제가 아니다. 순서의 문제다.

setTimeout(() => {
  console.log('a');
}, 0);
setTimeout(() => {
  console.log('b');
}, 1000);
setTimeout(() => {
  console.log('c');
}, 2000);

//Promise란, 실행은 바로 하되, 결괏값은 나중에 사용
