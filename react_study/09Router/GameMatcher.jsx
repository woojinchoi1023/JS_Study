import React , {Component}from "react";
import NumberBaseball from "../03NumberBaseball/NumberBaseballClass";
import RSP from "../05RSP/RSPClass";
import Lottery from "../06Lottery/LotteryClass";
import {Route, Routes, useLocation, useNavigate} from "react-router";

const GameMatcher = () => { 
  const location = useLocation();
  const navigate = useNavigate();
  let urlSearchParams = new URLSearchParams(location.search.slice(1));
  console.log('hello', urlSearchParams.get('hello'));
  console.log('page', urlSearchParams.get('page'));
  console.log('location', location);

  return(
    <>
    <button onClick={() => {navigate(-1)}}>go Back</button>
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

    </>
  )
 }

 const WrappedComponent = (props) => {
  const location = useLocation()

  return <GameMatcher location={location} {...props} />
}

export default WrappedComponent;

