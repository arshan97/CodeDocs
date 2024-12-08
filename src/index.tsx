import ReactDOM from "react-dom/client";
import "bulmaswatch/cyborg/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/CellList";
import "./styles/title.css";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <div style={{ padding: "20px" }}>
          <h1
            className="codedocs-title"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: "800",
            }}
          >
            CodeDocs
          </h1>
          <CellList />
        </div>
      </Provider>
    </>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
