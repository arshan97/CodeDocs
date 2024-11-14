import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "../styles/TextEditor.css";

const TextEditor = () => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState("# Click here to edit!");

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
          value={value}
          onChange={(v) => setValue(v || "")}
          preview="live"
        />
      </div>
    );
  }

  return (
    <div className="text-editor" onClick={() => setEditing(true)}>
      <div className="">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
