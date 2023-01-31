import React, { Component } from "react"; 

class Test extends Component {
  state = {
    counter: 0,
  };

  // shouldComponentUpdate(nextProps, nextStates, nextContext) {
  //   if(this.state.counter !== nextStates.counter) return true;
  //   return false;
  // }
  
  onClick = () => {
    this.setState({});
  };
  
  render() {
    console.log('this.state :>> ', this.state);
    return (
      <div>
        <button onClick={this.onClick}>Click</button>
      </div>
    )
  }
}

export default Test;
