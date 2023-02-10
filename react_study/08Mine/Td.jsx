import React, { memo, useCallback, useContext } from "react";
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext } from "./Mine";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return {
        background: '#444',
      }  
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white',
      }
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return {
          background: 'yellow',
        }
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        return {
          background: 'red',
        };
      case CODE.MINE:
        return {
          background: '#444',
        };
    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    default:
      return code || '';
  }
};

const Td = memo(({rowIndex, cellIndex}) => {
  const {tableData, halted, dispatch} = useContext(TableContext);
  const onClickTd = useCallback(() => { 
    if (halted) return;
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return;
      case CODE.NORMAL:
        dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
        break;
      case CODE.MINE:
        dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex});
    
      default:
        break;
    }
    }, [tableData[rowIndex][cellIndex], halted])

  const onRightClickTd =  useCallback(
    (e) => {
      e.preventDefault();
      if (halted) return;
      switch(tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({type:FLAG_CELL, row: rowIndex, cell: cellIndex});
          break;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex});
          break;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
          break;
        default:
          break;
      }
    },
    [tableData[rowIndex][cellIndex], halted],
  )
  
  
  return(
  <td
    style={getTdStyle(tableData[rowIndex][cellIndex])}
    onClick={onClickTd}
    onContextMenu={onRightClickTd}
  >{getTdText(tableData[rowIndex][cellIndex])}</td>
  )
})

export default Td;