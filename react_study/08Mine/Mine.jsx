import React, { createContext, useReducer, useMemo } from "react";
import Table from "./Table";
import Form from "./Form";

export const CODE = {
  OPENED: 0,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  MINE: -7,
}

const plantMine = (row, cell, mine) => { 
  console.log('row, cell, mine', row, cell, mine);
  const candidate = Array(row * cell).fill().map((v, i) => i)
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
    data.push(rowData);
  }
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell; //ex. 78 --> 7번째줄 8번째 칸에 지뢰
    data[ver][hor] = CODE.MINE;
  }
  console.log('data', data);
  return data;
}

export const TableContext = createContext({
  tableData: [],
  halted: false,
  dispatch: () => {},
});


const initialState = {
  tableData: [],
  timer: 0,
  result: 0,
  halted: false,
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      }
      case OPEN_CELL: {
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        tableData[action.row][action.cell] = CODE.OPENED;
        return {
          ...state,
          tableData,
        }}
      case CLICK_MINE:
        {
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        tableData[action.row][action.cell] = CODE.CLICKED_MINE;
        return {
          ...state,
          tableData,
          halted: true,
        }}
      case FLAG_CELL:
        {
          const tableData = [...state.tableData];
          tableData[action.row] = [...state.tableData[action.row]];
          if (tableData[action.row][action.cell] === CODE.MINE) { ///!== CODE.MINE
            tableData[action.row][action.cell] = CODE.FLAG_MINE;
          } else {
            tableData[action.row][action.cell] = CODE.FLAG;
          }
          return {
            ...state,
            tableData,
          }}
      case QUESTION_CELL: {
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
          tableData[action.row][action.cell] = CODE.QUESTION_MINE;
        } else {
          tableData[action.row][action.cell] = CODE.QUESTION;
        }
        return {
          ...state,
          tableData,
        }
      }
      case NORMALIZE_CELL: {
        console.log('whatthefuck')
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
          tableData[action.row][action.cell] = CODE.MINE;
        } else {
          tableData[action.row][action.cell] = CODE.NORMAL;
        }
        return {
          ...state,
          tableData,
        }
      }
    default:
      return state;
  }
};

const Mine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({tableData: state.tableData, halted: state.halted, dispatch}), [state.tableData]);
  //usememo를 이용한 캐싱
  return(
    <TableContext.Provider value={value}>
    <Form />
    <div>timer: {state.timer}</div>
    <Table/>
    <div>result: {state.result}</div>
    </TableContext.Provider>
  )
}
export default Mine;

