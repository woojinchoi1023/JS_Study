import React, { Component, useCallback, useEffect, useReducer, useState } from "react";
import Table from "./Table";

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['','',''],['','',''],['','','']],
  recentCell: [-1, -1]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

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
        recentCell: [action.row, action.cell]
      }
      case CHANGE_TURN:
        return {
          ...state,
          turn: state.turn === 'O'? 'X': 'O',
        }
      case RESET_GAME:
        return {
          ...state,
          turn: 'O',
          tableData: [['','',''],['','',''],['','','']],
          recentCell: [-1, -1]
        }
    default:
      return state;
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, turn, winner, recentCell} = state
  // const [winner, setWinner] = useState(null);
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

  const onClickTable = useCallback(() => { //component에 넣는 함수-->useCallback
    dispatch({type: 'SET_WINNER', winner: 'O'}) //dispatch 안에는 action 객체
  }, []);

  useEffect(() => { //비동기
    let win = false;
    let all = true;
    const [row, cell] = recentCell
    if (row < 0) return;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    if (win) {
      dispatch({type: SET_WINNER, winner: turn});
      dispatch({type: RESET_GAME});
    } else {
      //tie
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        })
      });
      if (all) { //tie
        dispatch({type: RESET_GAME});
      } else {
        dispatch({type: CHANGE_TURN}); //여기서 changeturn
      }
    }
  },[recentCell])
  
  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}></Table>
      {winner && <div>{winner} wins!</div>}
    </>
  )
}

export default TicTacToe;