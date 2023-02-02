import React, {memo, PureComponent} from "react";

const Ball = memo(({number}) => { //함수컴포넌트, memo: high order component, HOC
    let background;
    if (number <= 10) {
      background = 'red';
    } else if (number <= 20) {
      background = 'orange'
    } else if (number <= 30) {
      background = 'yellow'
    } else if (number <= 40) {
      background = 'blue'
    } else {
      background = 'green'
    };
    return (
      <div className="ball" style={{background}}>{number}</div>
    );
});

// class Ball extends PureComponent {
//   render() {
//     const {number} = this.props;
//     let background;
//     if (number <= 10) {
//       background = 'red';
//     } else if (number <= 20) {
//       background = 'orange'
//     } else if (number <= 30) {
//       background = 'yellow'
//     }else if (number <= 40) {
//       background = 'blue'
//     }else {
//       background = 'green'
//     }
//     return (
//       <div className="ball" style={{background}}>{number}</div>
//     )
//   }
// }


export default Ball;