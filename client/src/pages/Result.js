import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

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
        <Container>
          <h2>Result</h2>
        </Container>
        <Container>
          <Paper className={useStyles.paper}>
            <div>
              <img
                src="https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png"
                height={400}
                width={400}
                alt="placeholder"
              ></img>
            </div>
          </Paper>
        </Container>
      </center>
    );
  }
}

export default Result;
