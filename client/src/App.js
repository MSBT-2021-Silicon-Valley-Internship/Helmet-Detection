import React, { Component } from "react";
import Camera from "./Camera";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>
          Helmet Recognition AI: Helmet ID
          <br></br>
          <br></br>
        </h1>
        <h2>
          FACE ID 처럼 당신의 헬멧 착용 여부를 인식해주는 AI입니다.
          <br></br>
          <br></br>
          헬멧을 착용한 상태에서 캡쳐 버튼을 누른 후 카메라를 5초 간
          응시해주세요.
        </h2>
        <Camera></Camera>
      </div>
    );
  }
}

export default App;
