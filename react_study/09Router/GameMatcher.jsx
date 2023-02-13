import React , {Component}from "react";
import NumberBaseball from "../03NumberBaseball/NumberBaseballClass";
import RSP from "../05RSP/RSPClass";
import Lottery from "../06Lottery/LotteryClass";
import {Route, Routes, useLocation} from "react-router";

class GameMatcher extends Component {
  render() {
    console.log('this.props', this.props)
    //queryString 이용
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log(urlSearchParams.get('hello'));
    return (
      <Routes>
        <Route path="number-baseball" element={<NumberBaseball />} />
        <Route path="rock-scissors-paper" element={<RSP />} />
        <Route path="lotto-generator" element={<Lottery />} />
        <Route
          path="*"
          element={<div>
            일치하는 게임이 없습니다.
          </div>}
        />
      </Routes>
    );
  }
}

const WrappedComponent = (props) => {
  const location = useLocation()

  return <GameMatcher location={location} {...props} />
}

export default WrappedComponent;