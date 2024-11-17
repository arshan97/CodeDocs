import ReactDOM from "react-dom/client";
import "bulmaswatch/cyborg/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
