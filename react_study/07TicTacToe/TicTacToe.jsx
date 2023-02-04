import React, { Component, useCallback, useReducer, useState } from "react";
import Table from "./Table";

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['','',''],['','',''],['','','']],
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      //state.winner = action.winner 이렇게 하면 안됨!
      return { //새 객체 만들어서 바뀐 값만 넣어야함. 불변성!
        ...state, //얕은 복사
        winner: action.winner,
      };  
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
      }
      case CHANGE_TURN:
        return {
          ...state,
          turn: state.turn === 'O'? 'X': 'O',
        }
    default:
      break;
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState(null);
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

  const onClickTable = useCallback(() => { //component에 넣는 함수-->useCallback
    dispatch({type: 'SET_WINNER', winner: 'O'}) //dispatch 안에는 action 객체
  }, []);
  
  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}></Table>
      {state.winner && <div>{state.winner} wins!</div>}
    </>
  )
}

export default TicTacToe;