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
      isSuccess: true,
      imgSrc: "",
    };
  }

  render() {
    const { result, imgSrc } = this.state;

    const params = this.props.match.params.screenshot;
    console.log(this.props.match);
    console.log(this.props.match.path);
    console.log(this.props.match.url);
    console.log(this.props.match.params);
    console.log(this.props.match.params.screenshot);
    console.log(params);

    //fetch get json example
    const testChange = () => {
      this.setState({ isSuccess: !this.state.isSuccess });
    };

    //json result
    const jsonInput = () => {
      const url = "http://localhost:8000/web";
      fetch(url)
        .then((res) => res.json())
        .then((res) => res.body)
        .then((body) => body.confidence)
        .then((confidence) => {});
    };

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },

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
      <Container
        id="result-page"
        maxWidth="sm"
        maxHeight="sm"
        className={useStyles.root}
      >
        <h1>Result</h1>
        <Paper className={useStyles.paper} elevation={3}>
          <img
            src="https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png"
            height={400}
            width={400}
            alt="placeholder"
          ></img>
        </Paper>
        <br></br>
        <br></br>
        {this.state.isSuccess ? (
          <Alert className={useStyles.alert} severity="info">
            <AlertTitle>SUCCESS</AlertTitle>
            헬멧 인식에 성공했습니다! —{" "}
            <Link to="/">
              <strong>Home으로 돌아가기</strong>
            </Link>
          </Alert>
        ) : (
          <Alert className={useStyles.alert} severity="error">
            <AlertTitle>FAIL</AlertTitle>
            헬멧 인식에 실패했습니다! —{" "}
            <Link to="/">
              <strong>Home으로 돌아가기</strong>
            </Link>
          </Alert>
        )}
        <Button onClick={testChange} color="primary">
          SUCCESS/FAIL TEST
        </Button>
      </Container>
    );
  }
}

export default Result;
