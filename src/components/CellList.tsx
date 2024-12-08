/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { useActions } from "../hooks/useActions";

const CellList = () => {
  const { fetchCells, saveCells, insertCellBefore } = useActions();

  const cells = useTypedSelector(({ cells }) => {
    if (!cells) return [];
    const { order, data } = cells;
    return order.map((id) => data[id]);
  });

  useEffect(() => {
    fetchCells();
  }, []);

  useEffect(() => {
    if (cells.length === 0) {
      // Insert default cells if none exist
      insertCellBefore(
        null,
        "text",
        `# Welcome to CodeDocs 🚀\n\nStart creating amazing things!`
      );
      insertCellBefore(
        null,
        "code",
        `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        marginTop: '50px',
      }}
    >
      <h1 style={{ color: '#333' }}>Hello, CodeDocs! 🚀</h1>
      <p style={{ fontSize: '18px' }}>
        Click the button to increase the count:
      </p>

      <button
        style={{
          backgroundColor: '#6200ea',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
        onClick={() => setCount(count + 1)}
      >
        Click Me
      </button>

      <p style={{ fontSize: '22px', marginTop: '20px' }}>
        You clicked <strong>{count}</strong> times!
      </p>
    </div>
  );
};

// Attach the app to the root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);
        `
      );
    }
  }, [cells]);

  useEffect(() => {
    saveCells();
  }, [cells]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <div className={cells.length === 0 ? "force-visible" : ""}>
        <AddCell nextCellId={null} />
      </div>
    </div>
  );
};

export default CellList;
