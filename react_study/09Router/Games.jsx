import React from "react";
import { BrowserRouter, HashRouter, Link, Route, Routes } from "react-router-dom";
import NumberBaseball from '../03NumberBaseball/NumberBaseballClass'
import RSP from '../05RSP/RSPClass';
import Lottery from '../06Lottery/LotteryClass'
import GameMatcher from "./GameMatcher";

const Games = () => {
  //router 사용하려면 브라우저라우터로 최상단을 감싼다
  //route -> link 이용. a 쓰면 안됨
  // /있고 없고 -> 절대경로 vs 상대경로. 아예 다름
  return(
      <BrowserRouter>
        <Link to="/game/number-baseball?query=100&hello=woojin&bye=react">numberbaseball</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">rsp</Link>
        &nbsp;
        <Link to="/game/lotto-generator">lottery</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>

        <div>
        <Routes>
          <Route path="/game/*" element={<GameMatcher />} />
        </Routes>
        </div>
      </BrowserRouter>
  )
}
export default Games;
