import React, { Component } from "react";
import Webcam from "react-webcam";
import ReactJson from "react-json-view";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";


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
    this.setState({ screenshot: imageSrc });
    this.uploadImage(imageSrc);
  };

  uploadImage = (image) => {
    const url = "http://localhost:8000/images";
    const data = new FormData();

    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        data.append("file", blob, "face.jpg");

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

    const useStyles = makeStyles((theme) => ({
      heroButtons: {
        marginTop: theme.spacing(4),
      },
    }));

    return (
      <center>
        <div>
          <div>
            <Webcam
              audio={false}
              height={700}
              width={700}
              ref={this.setRef}
              screenshotFormat="image/jpg"
            />
          </div>
          <div className={useStyles.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button onClick={() => this.capture()} variant="contained" color="primary">
                  Capture
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => this.uploadImage()} variant="outlined" color="primary">
                  Upload
                </Button>
              </Grid>
            </Grid>
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
      </center>
    );
  }
}

export default Camera;
