import React from "react";

const Try = ({ value, index }) => {
  return (
    <li key={value.try + value.result + index}>
      <div>
        <b>{value.try}</b>
      </div>
      <div>{value.result}</div>
    </li>
  );
};

export default Try;
