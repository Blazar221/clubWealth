import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainFunctional from "./components/mainFunctional";
import CWRoutes from "./router/routes";
// BootsWatch style to overwrite the default Bootstrap css
import "./App.css";
import "bootswatch/dist/morph/bootstrap.min.css";
// Some global style
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <MainFunctional /> */}
        <CWRoutes />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
//render(<App />, document.getElementById("root"));
