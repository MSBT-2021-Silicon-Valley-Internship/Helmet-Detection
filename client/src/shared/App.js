import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home, Camera, Result } from "../pages";


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/camera" component={Camera} />
        <Route path="/result" component={Result} />
      </div>
    );
  }
}

export default App;
