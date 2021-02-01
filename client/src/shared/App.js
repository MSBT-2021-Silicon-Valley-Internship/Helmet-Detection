import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Splash from "../pages/Home/Splash";
import Camera from "../pages/Camera/Camera";
import Result from "../pages/Result/Result";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/camera" component={Camera} />
          <Route path="/result" component={Result} />
          <Route path="/splash" component={Splash} />
        </div>
      </div>
    );
  }
}

export default App;
