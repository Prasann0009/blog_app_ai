import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer
      position="bottom-right"
      hideProgressBar={true}
      autoClose={3500}
    />
    <App />
  </Provider>
);
