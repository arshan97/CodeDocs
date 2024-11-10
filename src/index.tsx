import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/CodeEditor";
import "bulmaswatch/darkly/bulmaswatch.min.css";
import Preview from "./components/Preview";
import bundler from "./bundler";

const App = () => {
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

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
