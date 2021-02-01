import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Camera from "../pages/Camera";
import Result from "../pages/Result";
import Success from "../pages/Success";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/Camera" component={Camera} />
          <Route path="/result" component={Result} />
          <Route path="/success" component={Success} />
        </div>
      </div>
    );
  }
}

export default App;
