import ReactDOM from "react-dom/client";
import "bulmaswatch/slate/bulmaswatch.min.css";
import CodeCell from "./components/CodeCell";
import TextEditor from "./components/TextEditor";

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
