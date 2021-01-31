import React, { Component } from "react";
import Webcam from "react-webcam";
import ReactJson from "react-json-view";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

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
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
      cardMedia: {
        paddingTop: "56.25%", // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
      },
      margin: {
        margin: theme.spacing(1),
      },
    }));

    return (
      <center>
        <Container maxWidth="sm" className={useStyles.root}>
          <Grid item md={12}>
            <Paper className={useStyles.paper}>
              <div>
                <Webcam
                  audio={false}
                  height={400}
                  width={400}
                  ref={this.setRef}
                  screenshotFormat="image/jpg"
                />
              </div>
              <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                className={useStyles.margin}
                onClick={() => this.capture()}
              >
                Capture
              </Fab>
            </Paper>
          </Grid>
          <br></br>
          <br></br>
          <Grid item md="auto">
            <Paper className={useStyles.paper}>
              <div>
                {screenshot && (
                  <img
                    padding={10}
                    src={screenshot}
                    alt="screenshot"
                    height={400}
                    width={400}
                  />
                )}
              </div>
              <Fab
                variant="extended"
                color="secondary"
                aria-label="add"
                className={useStyles.margin}
                onClick={() => this.uploadImage()}
              >
                Upload
              </Fab>
            </Paper>
          </Grid>
        </Container>

        <div>
          <div>
            <h2>Result</h2>
            {result && <ReactJson src={result} />}
          </div>
        </div>
      </center>
    );
  }
}

export default Camera;
