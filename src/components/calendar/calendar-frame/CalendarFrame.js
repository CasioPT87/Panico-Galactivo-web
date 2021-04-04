import React from 'react'

export default function({children, month, numRows, tableDays, weekLength}) {

  const daysOrderedByRow = () => {
    const daysOrderedByRow = [];
    for (let i = 0; i < numRows; i++) {
      daysOrderedByRow[i] = tableDays.slice(i * weekLength, (i + 1) * (weekLength - 1));
    }
    return daysOrderedByRow;
  }

  const row = (rowData, rowIndex) => {
    return rowData.map(day => {
      const key = `${month}, ${rowIndex}, ${day.index}`
      return children(key, day);
    })
  }

 
  return (
    <div>
      {daysOrderedByRow().map((rowData, i) => {
        return (
          <div>
            {row(rowData, i)}
          </div>
        )
      })}
    </div>
  );
}