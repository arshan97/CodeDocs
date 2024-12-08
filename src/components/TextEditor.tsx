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

  const markdownText = `
# Welcome to CodeDocs 🚀

**CodeDocs** is a platform for building, testing, and documenting your code in real-time. With CodeDocs, you can:

- **Write clear documentation** using Markdown.
- **Build and test your code** with a live preview.
- **Collaborate and share** your work with ease.
`;

  return (
    <div
      data-color-mode="dark"
      className="text-editor"
      onClick={() => setEditing(true)}
    >
      <MDEditor.Markdown
        source={cell.content || markdownText}
        style={{
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default TextEditor;
