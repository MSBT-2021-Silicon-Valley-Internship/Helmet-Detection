import React, { Component } from "react";
import Webcam from "react-webcam";
import ReactJson from "react-json-view";

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      result: null,
    };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ screenshot: imageSrc })
    this.uploadImage(imageSrc);
  };

  uploadImage = (image) => {
    const url = 'http://localhost:8000/images';
    const data = new FormData();

    fetch(image)
      .then(res => res.blob())
      .then(blob => {
        data.append('file', blob, 'face.jpg');

        const options = {
          method: "post",
          contentType: false,
          body: data,
        };

        fetch(url, options)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            this.setState({
              result: res,
            });
          });
      });
  };

  render() {
    const { screenshot, result } = this.state;

    return (
      <div>
        <div>
          <Webcam
            audio={false}
            height={350}
            width={350}
            ref={this.setRef}
            screenshotFormat="image/jpg"
          />
        </div>
        <div>
          <button onClick={() => this.capture()}>
            Capture
          </button>
        </div>

        <div>
          <h3>Screenshot</h3>
          {screenshot && <img src={screenshot} alt="screenshot" />}
        </div>

        <div>
          <h3>Result</h3>
          {result && <ReactJson src={result} />}
        </div>
      </div>
    );
  }
}

export default Camera;
