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

function toScreenshot(e) {
  e.target.setAttribute("src", "https://source.unsplash.com/LYK3ksSQyeo");
  e.target.setAttribute("alt", "screenshot");
}

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

  uploadImage = (image) => {
    const url = "http://localhost:8000/images";
    const data = new FormData();

    const imageSrc = this.webcam.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        data.append("file", blob, "face3.jpg");

        const options = {
          method: "post",
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

  showImage = () => {
    const url = "http://localhost:8000/web";

    fetch(url)
      .then((response) => {
        console.log(response);
        return response.blob();
      })
      .then((blob) => {
        console.log(blob);
        var reader = new FileReader();

        reader.onload = function () {
          var base64data = reader.result;
          console.log(base64data);
        };
        reader.readAsDataURL(blob);
        this.setState({
          image: reader,
          image2: reader.result,
        });
        console.log(reader);
        console.log(reader.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  webcamoff = () => {
    this.setState({ webcamopen: !this.state.webcamopen });
  };
  reCapturing = () => {
    this.setState({
      iscaptured: false,
      timeval:0,
      changePlaceholder: !this.state.changePlaceholder,
    });
  };

  render() {
    const { screenshot, result, image, image2, changePlaceholder } = this.state;

    const useStyles = makeStyles((theme) => ({
      root: {
      },
      container: {
      },

      paper: {
      },
      divider: {
      },
      backdrop: {
        color: "#fff",
      },
    }));

    const handleClose = () => {
      this.setState((state) => ({ open: false }));
    };
    const handleToggle = () => {
      this.setState((state) => ({ open: true }));
    };
    const timechange = () => {
      let timeval = 0;
      let timerId = setTimeout(
        function tick() {
          this.setState({ timeval: this.state.timeval + 10 });

          if (this.state.timeval > 1000) {
            handleClose();
            return 0;
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
                    {changePlaceholder ? (
                      <div className="img-right">
                        {screenshot && (
                          <img
                            padding={10}
                            src={screenshot}
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
                      onClick={() => timechange()}
                    >
                      UPLOAD
                    </Fab>
                  )}
                </Paper>
              </Grid>
            </div>
          </div>
        </div>  

        {this.state.webcamopen ? (
          <Fab
            variant="extended"
            color="secondary"
            aria-label="add"
            className={useStyles.margin}
            onClick={() => {
              this.webcamoff();
            }}
          >
            webcam off
          </Fab>
        ) : (
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            className={useStyles.margin}
            onClick={() => {
              this.webcamoff();
            }}
          >
            webcam on
          </Fab>
        )}

        <br />
        <br />
        <br />
        <div className = 'back-drop'>
        <Backdrop
          open={this.state.open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        </div>
      </div>
    );
  }
}

export default Camera;
