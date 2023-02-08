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
  dispatch: () => {},
  
});

export const START_GAME = 'START_GAME';

const initialState = {
  tableData: [],
  timer: 0,
  result: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      }
      
  
    default:
      return state;
  }
};

const Mine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({tableData: state.tableData, dispatch}), [state.tableData]);
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

