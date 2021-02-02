import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Webcam from "react-webcam";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactJson from "react-json-view";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import "./Camera.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

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
      changePlaceholder: false,
    };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ screenshot: imageSrc, changePlaceholder: true });
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

  toScreenshot = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  render() {
    const { screenshot, result, image, image2, changePlaceholder } = this.state;

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      container: {
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridGap: theme.spacing(4),
        justifyContent: "center",
      },

      paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(5),
        width: theme.spacing(20),
        height: theme.spacing(20),
        elevation: 3,
        color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
      },
      divider: {
        margin: theme.spacing(2, 0),
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
      },
    }));

    function SimpleBackdrop() {
      const classes = useStyles();
      const [open, setOpen] = React.useState(false);
      const handleClose = () => {
        setOpen(false);
      };
      const handleToggle = () => {
        setOpen(!open);
      };

      return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleToggle}>
            Show backdrop
          </Button>
          <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      );
    }

    return (
      <center>
        <div className="header">
          <h1>Capture & Upload</h1>
        </div>

        <Grid container spacing={3}>
          <Grid item md={6}>
            <Paper id="box-left" className={useStyles.paper}>
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
                onClick={() => this.capture()}
              >
                Capture
              </Fab>
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper id="box-right" className={useStyles.paper}>
              <div>
                {changePlaceholder ? (
                  <div>
                    {screenshot && (
                      <img
                        onClick={toScreenshot}
                        padding={10}
                        src={screenshot}
                        alt="screenshot"
                        height={300}
                        width={400}
                        margin={50}
                        alt="placeholder"
                      ></img>
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
              <RouterLink to={"/result"}>
                <Fab
                  variant="extended"
                  color="secondary"
                  aria-label="add"
                  className={useStyles.margin}
                  onClick={() => this.uploadImage()}
                >
                  Upload
                </Fab>
              </RouterLink>
              <SimpleBackdrop />
            </Paper>
          </Grid>
        </Grid>
      </center>
    );
  }
}

export default Camera;
