import MarkdownEditor from "@uiw/react-markdown-editor";
import React, { useEffect, useRef, useState } from "react";

const TextEditor = () => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
      <div ref={ref}>
        <MarkdownEditor visible height="200px" />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)}>
      <MarkdownEditor.Markdown source="Click here to Edit!" />
    </div>
  );
};

export default TextEditor;
