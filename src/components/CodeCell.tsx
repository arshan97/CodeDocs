import { useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundler from "../bundler";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue=""
        onChange={(value: string) => setInput(value)}
      />

      <Preview code={code} />

      <div>
        <button onClick={onClick}>Submit!</button>
      </div>
    </div>
  );
};

export default CodeCell;
