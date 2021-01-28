import React, { Component } from "react";
import Webcam from "react-webcam";
import ReactJson from "react-json-view";
import "./CameraTest.css";

class CameraTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshotUrl: null,
      lastJsonResponse: null,
    };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.uploadImage(imageSrc);
  };

  uploadImage = (image) => {
    const url = 'http://localhost:8000/upload-face';
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
          .then((result) => result.json())
          .then((result) => {
            console.log(result);
            console.log(String(image))
            //test
            this.setState({
              screenshotUrl: image,
              lastJsonResponse: result,
            });
          });
      });
  };

  render() {
    const { screenshotUrl, lastJsonResponse } = this.state;

    return (
      <div className="camera">
        <div>
          <Webcam
            audio={false}
            height={350}
            width={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
          />
        </div>
        <div class="site__box-link">
          <a class="btn btn--width" onClick={() => this.capture()}>
            Capture
          </a>
        </div>

        <div>
          <h3>Last screenshot</h3>
          {screenshotUrl && <img src={screenshotUrl} alt="last-screenshot" />}
        </div>

        <div>
          <h3>Last JSON response</h3>
          {lastJsonResponse && <ReactJson src={lastJsonResponse} />}
        </div>
      </div>
    );
  }
}

export default CameraTest;
