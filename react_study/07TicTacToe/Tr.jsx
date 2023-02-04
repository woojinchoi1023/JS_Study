import React from "react";
import Td from "./Td";

const Tr = ({rowIndex ,rowData, dispatch}) => {
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => {
        return (<Td key={rowIndex * 10 + i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch} >{''}</Td>)
      })}
      
    </tr>
  )
}

export default Tr;