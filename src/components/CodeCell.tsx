import { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "../styles/CodeCell.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state: any) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    if (!state.cells) return [];
    const { data, order } = state.cells;
    const orderedCells = order?.map((id) => data[id]);
    const cumulativeCode = [
      `
    import _React from 'react';
    import _ReactDOM from 'react-dom';

    const show = (value) => {
    const root = document.querySelector("#root");
    if (typeof value === "object") {
    if (value.$$typeof && value.props) {
      _ReactDOM.render(value, root);
    } else {
      root.innerHTML = JSON.stringify(value);
    }
    } else {
    root.innerHTML = value;
    }
    };
    `,
    ];
    for (let c of orderedCells) {
      // if (c.type === "code") {
      //   cumulativeCode.push(c.content);
      // }
      if (c.id === cell.id) {
        cumulativeCode.push(c.content);
        // break;
      }
    }
    return cumulativeCode;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join("\n"));
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join("\n"));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode.join("\n"), createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-success" max="100">
                Loading...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
