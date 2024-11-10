import Editor from "@monaco-editor/react";
import React, { useRef } from "react";
import * as prettier from "prettier/standalone";
import parser from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  async function format() {
    const unFormatted = editorRef?.current?.getModel().getValue();
    const formatted = await prettier.format(unFormatted, {
      parser: "babel",
      plugins: [parser, prettierPluginEstree] as any,
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    console.log(formatted);
    editorRef.current.setValue(formatted);
  }

  return (
    <div>
      <button onClick={format}>Format!</button>
      <Editor
        onMount={handleEditorDidMount}
        onChange={onChange}
        language="javascript"
        height="500px"
        theme="vs-dark"
        value={initialValue}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          formatOnType: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
