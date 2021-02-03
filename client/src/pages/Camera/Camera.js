import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Webcam from "react-webcam";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import "./Camera.css";
import Navigation from "../Navigation/Navigation";

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      result: null,
      image: null,
      image2: null,
      timeval: 0,
      changePlaceholder: false,
      open: false,
      webcamopen: true,
      iscaptured: false,
    };

    this.handleUpload = this.handleUpload.bind(this);
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      screenshot: imageSrc,
      changePlaceholder: true,
      iscaptured: true,
    });
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
  };

  handleUpload = () => {
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

  webcamoff = () => {
    this.setState({ webcamopen: !this.state.webcamopen });
  };

  reCapturing = () => {
    this.setState({
      iscaptured: false,
      timeval: 0,
      changePlaceholder: !this.state.changePlaceholder,
    });
  };

  render() {
    const useStyles = makeStyles(() => ({
      root: {},
      container: {},

      paper: {},
      divider: {},
      backdrop: {
        color: "#fff",
      },
    }));

    const handleClose = () => {
      this.setState(() => ({ open: false }));
    };

    const handleToggle = () => {
      this.setState(() => ({ open: true }));
    };

    const timechange = () => {
      let timerId = setTimeout(
        function tick() {
          this.setState({ timeval: this.state.timeval + 10 });

          if (this.state.timeval > 1000) {
            handleClose();
            return this.props.history.push("/result");
          } else {
            timerId = setTimeout(tick.bind(this), 20);
            handleToggle();
            console.log(this.state.timeval);
          }
        }.bind(this),
        20
      );
    };

    return (
      <div>
        <Navigation />
        <div className="header">
          <h1>Capture & Upload</h1>
          <h2>
            헬멧을 쓴 채로, <b>카메라</b>를 응시하세요.<br></br>
            <b>CAPTURE</b> 버튼을 눌러 사진을 찍고,<br></br>
            오른쪽에 나타난 스크린샷을 <b>UPLOAD</b> 하세요.
          </h2>
          <h3>
            다시 찍으려면 <b>RECAPUTURE</b> 버튼을 누르세요.
            <br></br>
            카메라를 끄려면 <b>WEBCAM OFF</b> 버튼을 누르세요.
          </h3>
          <div className="box-container">
            <div className="box-left">
              <Grid item md={12}>
                <Paper className="paper">
                  <div className="img-left">
                    {this.state.webcamopen ? (
                      <Webcam
                        audio={false}
                        height={400}
                        width={400}
                        ref={this.setRef}
                        screenshotFormat="image/jpg"
                      />
                    ) : (
                        <div>{this.state.webcamopen}</div>
                      )}
                  </div>
                  {this.state.iscaptured ? (
                    <Fab
                      variant="extended"
                      color="secondary"
                      aria-label="add"
                      className={useStyles.margin}
                      onClick={() => this.reCapturing()}
                    >
                      RECAPUTURE
                    </Fab>
                  ) : (
                      <Fab
                        variant="extended"
                        color="primary"
                        aria-label="add"
                        className={useStyles.margin}
                        onClick={() => this.capture()}
                      >
                        CAPTURE
                      </Fab>
                    )}
                </Paper>
              </Grid>
            </div>
            <br></br>
            <br></br>
            <div className="box-right">
              <Grid item md={12}>
                <Paper className="paper">
                  <div className="img-right-wrapper">
                    {this.state.changePlaceholder ? (
                      <div className="img-right">
                        {this.state.screenshot && (
                          <img
                            padding={10}
                            src={this.state.screenshot}
                            alt="screenshot"
                            height={300}
                            width={400}
                            margin={50}
                          ></img>
                        )}
                      </div>
                    ) : (
                        <div className="img-right">
                          <img
                            src="https://www.thevision.no/wp-content/uploads/woocommerce-placeholder-400x300.png"
                            height={300}
                            width={400}
                            alt="placeholder"
                          ></img>
                        </div>
                      )}
                  </div>

                  {this.state.timeval > 1000 ? (
                    <RouterLink to={"/result"}>
                      <Fab
                        variant="extended"
                        color="secondary"
                        aria-label="add"
                        className={useStyles.margin}
                        onClick={() => timechange()}
                      >
                        RESULT
                      </Fab>
                    </RouterLink>
                  ) : (
                      <Fab
                        variant="extended"
                        color="primary"
                        aria-label="add"
                        className=""
                        onClick={() => { timechange(); this.handleUpload(); }}
                      >
                        UPLOAD
                      </Fab>
                    )}
                </Paper>
              </Grid>
            </div>
          </div>
        </div>

        {
          this.state.webcamopen ? (
            <Fab
              variant="extended"
              color="warning"
              aria-label="add"
              className={useStyles.margin}
              onClick={() => {
                this.webcamoff();
              }}
            >
              WEBCAM OFF
            </Fab>
          ) : (
              <Fab
                variant="extended"
                color="error"
                aria-label="add"
                className={useStyles.margin}
                onClick={() => {
                  this.webcamoff();
                }}
              >
                WEBCAM ON
              </Fab>
            )
        }

        <br />
        <br />
        <br />
        <div className="back-drop">
          <Backdrop open={this.state.open} onClick={handleClose}>
            <CircularProgress color="primary" size={150} />
          </Backdrop>
        </div>
      </div >
    );
  }
}

export default Camera;
