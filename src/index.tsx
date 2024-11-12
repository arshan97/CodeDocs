import ReactDOM from "react-dom/client";
import "bulmaswatch/slate/bulmaswatch.min.css";
import CodeCell from "./components/CodeCell";

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <CodeCell />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
