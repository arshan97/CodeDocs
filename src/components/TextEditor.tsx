import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "../styles/TextEditor.css";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () =>
      document.removeEventListener("click", listener, { capture: true });
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={cell.content || ""}
          onChange={(v) => updateCell(cell.id, v || "")}
        />
      </div>
    );
  }

  return (
    <div className="text-editor" onClick={() => setEditing(true)}>
      <div className="">
        <MDEditor.Markdown
          source={cell.content || "<h2>Click to edit...</h2>"}
        />
      </div>
    </div>
  );
};

export default TextEditor;
