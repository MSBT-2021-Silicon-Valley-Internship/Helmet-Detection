import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Alert, AlertTitle } from "@material-ui/lab";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./Result.css";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchInProgress: true,
      result: null,
      imgSrc: null,
    };

    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload = () => {
    fetch('http://localhost:8000/api/download', {
      method: 'GET'
    }
    ).then(response => {
      if (response.status === 200) {
        (response.json()).then((data) => {
          const image = data['imgSrc']
          const imgSrc = 'data:image/png;base64,' + image

          this.setState({ fetchInProgress: false, result: data['Result'], imgSrc: imgSrc })
        })
      }
    }).catch((error) => {
      console.log("Error in download", error)
    })
  };

  componentDidMount() {
    this.handleDownload();
  }

  render() {
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
        {this.state.fetchInProgress ? (
          <CircularProgress />
        ) : (
            <Paper className={useStyles.paper} elevation={3}>
              <img
                src={this.state.imgSrc}
                height={400}
                width={400}
                alt="placeholder"
              ></img>
            </Paper>
          )}
        <br></br>
        <br></br>
        {this.state.result === "True" ? (
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
      </Container>
    );
  }
}

export default Result;
