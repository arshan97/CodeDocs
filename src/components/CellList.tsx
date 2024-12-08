/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { useActions } from "../hooks/useActions";
import TextEditor from "./TextEditor";

const CellList = () => {
  const { fetchCells, saveCells } = useActions();

  const cells = useTypedSelector(({ cells }) => {
    if (!cells) return [];
    const { order, data } = cells;
    return order.map((id) => data[id]);
  });

  useEffect(() => {
    fetchCells();
  }, []);

  useEffect(() => {
    saveCells();
  }, [cells]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      {/* <AddCell nextCellId={cell.id} /> */}
      <CellListItem cell={cell} />
    </Fragment>
  ));

  const markdownText = `
# Welcome to CodeDocs 🚀

**CodeDocs** is your ultimate space for creativity and productivity:  
- **Write with clarity:** Use Markdown to organize your thoughts and document ideas effortlessly.  
- **Code with ease:** Build and execute code directly in your browser—no setup required.  
- **Learn and explore:** Experiment with code and see live results side-by-side with your notes.  

### Ready to Start?  

Here's a simple example to get you started:  

\`\`\`javascript
function welcome(name) {  
  return \`Hello, \${name}! Ready to create with CodeDocs?\`;  
}  

show(welcome("Coder"));  
\`\`\`

Start writing and coding now—because your best ideas deserve a powerful platform.  
`;

  return (
    <div>
      {cells.length === 0 ? (
        <>
          <TextEditor cell={{ id: "1", type: "text", content: markdownText }} />
        </>
      ) : (
        renderedCells
      )}
      <div className={cells.length === 0 ? "force-visible" : ""}>
        <AddCell nextCellId={null} />
      </div>
    </div>
  );
};

export default CellList;
