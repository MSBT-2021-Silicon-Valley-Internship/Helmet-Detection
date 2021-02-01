import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Alert, AlertTitle } from "@material-ui/lab";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./Result.css";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
    };
  }

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
    const { result } = this.state;

    const useStyles = makeStyles((theme) => ({
      paper: {
        "& > *": {
          margin: theme.spacing(1),
          width: theme.spacing(20),
          height: theme.spacing(20),
        },
        color: theme.palette.text.secondary,
      },

      alert: {
        width: "100%",
        "& > * + *": {
          marginTop: theme.spacing(2),
        },
      },
    }));

    return (
      <div id="result-page">
        <h1>Result</h1>
        <Paper className={useStyles.paper} elevation={3}>
          <img
            src="https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png"
            height={400}
            width={400}
            alt="placeholder"
          ></img>
        </Paper>
        <Alert className={useStyles.alert} severity="success">
          <AlertTitle>Success</AlertTitle>
          헬멧 인식에 성공했습니다! —{" "}
          <Link to="/">
            <strong>Home으로 돌아가기</strong>
          </Link>
        </Alert>
      </div>
    );
  }
}

export default Result;
