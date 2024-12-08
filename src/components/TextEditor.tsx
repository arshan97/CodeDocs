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
      <div data-color-mode="dark" className="text-editor" ref={ref}>
        <MDEditor
          value={cell.content || ""}
          className="gradient"
          onChange={(v) => updateCell(cell.id, v || "")}
          style={{
            borderRadius: "5px",
          }}
        />
      </div>
    );
  }

  return (
    <div
      data-color-mode="dark"
      className="text-editor"
      onClick={() => setEditing(true)}
    >
      <MDEditor.Markdown
        source={cell.content || "Click to edit..."}
        style={{
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default TextEditor;
