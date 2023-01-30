import React, {Component} from "react";

class Try extends Component {
  render() {
    return (
      <li key={this.props.value.try + this.props.value.result + this.props.index}><b>{this.props.value.try}</b> - {this.props.value.result}</li>
    )
  }
}

export default Try;
