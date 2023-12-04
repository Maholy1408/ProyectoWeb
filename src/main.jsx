import React from "react";
import ReactDOM from "react-dom/client";

// Store
import { store } from "./app/store";
import { Provider } from "react-redux";

// Componentes
import { App } from "./components/App";

// Estilos
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
