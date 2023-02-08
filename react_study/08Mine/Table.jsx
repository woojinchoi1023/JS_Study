import React, { memo, useContext } from 'react';
import { TableContext } from './Mine';
import Tr from './Tr';


const Table = memo(() => {
  const {tableData} = useContext(TableContext);

  return (
    <table>
      <tbody>
        {Array(tableData.length).fill().map((tr, i) => 
        <Tr key={100 + i} rowIndex={i}/>)}
      </tbody>
    </table>
  );
});
Table.displayName = 'Table';

export default Table;