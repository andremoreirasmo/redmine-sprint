import { render } from "react-dom";

import { store, history } from "./store/";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import App from "./app";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootElement
);
