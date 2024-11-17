import ReactDOM from "react-dom/client";
import "bulmaswatch/slate/bulmaswatch.min.css";
import TextEditor from "./components/TextEditor";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/CellList";

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: "20px" }}>
        <CellList />
      </div>
    </Provider>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
