import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ReactJson from "react-json-view";
import { Button } from "@material-ui/core";
import Navigation from "../Navigation/Navigation";
import "./Result.scss";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      isSuccess: true,
      imgSrc: "",
    };
  }

  //jsonresult : temp
  componentDidMount = () => {
    const url = "http://localhost:8000/web";
    const options = {
      method: "get",
    };
    fetch(url, options).then((res) => {
      console.log(res);
      this.setState({ isresult: true });
      console.log(this.state.isresult);
    });
  };

  render() {
    const { result, imgSrc } = this.state;

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

    //fetch get json example
    const testChange = () => {
      this.setState({ isSuccess: !this.state.isSuccess });
    };

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
            {result && <ReactJson src={result} />}
            <img
              src="https://www.thevision.no/wp-content/uploads/woocommerce-placeholder-400x300.png"
              height={300}
              width={400}
              alt="placeholder"
            ></img>
          </Paper>
        </div>
        <div className="alert-box">
          {this.state.isSuccess ? (
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
        <div className="button-box">
          <Button onClick={testChange} color="secondary">
            SUCCESS/FAIL TEST
          </Button>
        </div>
      </div>
    );
  }
}

export default Result;
