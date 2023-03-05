import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainFunctional from "./components/mainFunctional";
import CWRoutes from "./router/routes";
// BootsWatch style to overwrite the default Bootstrap css
import "bootswatch/dist/morph/bootstrap.min.css";
// custom style
import "./App.css";
// Redux
import { store } from "./redux/store";
import { Provider } from "react-redux";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {/* <MainFunctional /> */}
          <CWRoutes />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
//render(<App />, document.getElementById("root"));
