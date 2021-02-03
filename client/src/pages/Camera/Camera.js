import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Webcam from "react-webcam";
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
      changePlaceholder: false,
    };

    this.handleUpload = this.handleUpload.bind(this);
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ screenshot: imageSrc, changePlaceholder: true });
  };

  handleUpload = (event) => {
    event.preventDefault();

    const file = this.dataURItoBlob(this.state.screenshot);
    const data = new FormData();
    data.append('file', file, 'face.png')

    fetch('http://localhost:8000/api/upload', {
      method: 'POST',
      body: data
    }
    ).then((response) => {
      if (response.status === 200) {
        response.json().then(
          data => console.log(data['Response'])
        )
      }
    }).catch((error) => {
      console.log('Error in upload', error)
    })
  };

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  render() {
    const { screenshot, changePlaceholder } = this.state;

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(10),
        margin: theme.spacing(5),
        textAlign: "center",
        color: theme.palette.text.secondary,
      },
      margin: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
      },
    }));

    return (
      <center>
        <Container
          id="camera-page"
          maxWidth="sm"
          maxHeight="sm"
          className={useStyles.root}
        >
          <h1>Capture & Upload</h1>
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
          <Grid item md={12}>
            <Paper className={useStyles.paper}>
              <div>
                {changePlaceholder ? (
                  <div>
                    {screenshot && (
                      <img
                        src={screenshot}
                        alt="screenshot"
                        height={400}
                        width={400}
                      />
                    )}
                  </div>
                ) : (
                    <img
                      src="https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png"
                      height={400}
                      width={400}
                      alt="placeholder"
                    ></img>
                  )}
              </div>
              <RouterLink to="/result">
                <Fab
                  variant="extended"
                  color="secondary"
                  aria-label="add"
                  className={useStyles.margin}
                  onClick={(event) => this.handleUpload(event)}
                >
                  Upload
                </Fab>
              </RouterLink>
            </Paper>
          </Grid>
        </Container>
      </center>
    );
  }
}

export default Camera;
