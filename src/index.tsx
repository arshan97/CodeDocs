import ReactDOM from "react-dom/client";
import "bulmaswatch/darkly/bulmaswatch.min.css";
import CodeCell from "./components/CodeCell";

const App = () => {
  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
