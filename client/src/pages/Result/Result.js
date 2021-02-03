import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import "./Result.scss";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          const image = data['imgSrc'];
          const imgSrc = 'data:image/png;base64,' + image;

          this.setState({ result: data['Result'], imgSrc: imgSrc });
        })
      }
    }).catch((error) => {
      console.log("Error in download", error);
    })
  };

  componentDidMount = () => {
    this.handleDownload();
  };

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
        fontfamily: "Montserrat",
      },
    }));

    return (
      <div>
        <Navigation />
        <div className="header-box">
          <div className="header">
            <h1>Result</h1>
            <h2>헬멧 인식 결과입니다.</h2>
          </div>
        </div>
        <div className="image-box">
          <Paper className="paper">
            <img
              src={this.state.imgSrc}
              height={300}
              width={400}
              alt="placeholder"
            ></img>
          </Paper>
        </div>
        <div className="alert-box">
          {this.state.result === "True" ? (
            <Alert className={useStyles.alert} severity="success">
              <AlertTitle>Success</AlertTitle>
              헬멧 인식에 <b>성공</b>했습니다! —{" "}
              <Link to="/">
                <strong>Home으로 돌아가기</strong>
              </Link>
            </Alert>
          ) : (
              <Alert className={useStyles.alert} severity="error">
                <AlertTitle>FAIL</AlertTitle>
              헬멧 인식에 <b>실패</b>했습니다! —{" "}
                <Link to="/">
                  <strong>Home으로 돌아가기</strong>
                </Link>
              </Alert>
            )}
        </div>
      </div>
    );
  }
}

export default Result;
