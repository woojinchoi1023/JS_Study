import React, { memo, useCallback, useEffect, useRef } from "react";
import { CLICK_CELL, CHANGE_TURN } from "./TicTacToe";

const Td = memo(({rowIndex, cellIndex, cellData, dispatch}) => {
  // console.log('rendered');
  // const ref = useRef([]);
  // useEffect(() => {
  //   console.log('check :>> ', rowIndex === ref.current[0], cellIndex === ref.current[1], cellData === ref.current[2], dispatch === ref.current[3] );
  //   //false --> 바뀐것 --> 리렌더링
  //   console.log('cellData, ref.current :>> ', cellData, ref.current);
  //   ref.current = [rowIndex, cellIndex, cellData, dispatch];
  // })

  const onClickTd = useCallback(()=> {
    // console.log('rowIndex, cellIndex :>> ', rowIndex, cellIndex);
    if (cellData) return;
    dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
    // dispatch({type: CHANGE_TURN});
  }, [cellData]); //celldata 바뀔때마다 함수 새로 만듬
  return (
    <td onClick={onClickTd}>{cellData}</td>
  )
})

export default Td;