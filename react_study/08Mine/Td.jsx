import React, { memo, useContext } from "react";
import { CODE, TableContext } from "./Mine";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return {
        background: '#444',
      }  
    case CODE.OPENED:
      return {
        background: 'white',
      }
    default:
      return {
        background: '#444',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return ''
    case CODE.MINE:
      return 'X'
    default:
      return ''
  }
};

const Td = memo(({rowIndex, cellIndex}) => {
  const {tableData} = useContext(TableContext);

  return(
  <td
    style={getTdStyle(tableData[rowIndex][cellIndex])}
  >{getTdText(tableData[rowIndex][cellIndex])}</td>
  )
})

export default Td;