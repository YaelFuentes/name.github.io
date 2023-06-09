import React from 'react';

const Table = ({ headers, data, bgColor, textColor }) => {
  return (
    <div className={`bg-${bgColor}`}>
      <table className={`w-full text-${textColor}`}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index} className="py-2 px-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;