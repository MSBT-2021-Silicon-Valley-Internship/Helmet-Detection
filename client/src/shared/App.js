import React, { Component } from "react";
import { Route } from "react-router-dom";
import Camera from "../pages/Camera";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import Home from "../pages/Home";
import Webcam from "../pages/Webcam";
import Result from "../pages/Result";
import Success from "../pages/Success";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        GideokPark, DongyoungKim, WoongsuKim, HyojinKim
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/webcam" component={Webcam} />
          <Route path="/result" component={Result} />
          <Route path="/success" component={Success} />
        </div>
        <React.Fragment>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <CameraIcon className={useStyles.icon} />
              <Typography variant="h6" color="inherit" noWrap>
                MSBT : Helmet Detection
                <br></br>
              </Typography>
            </Toolbar>
          </AppBar>

          <main>
            {/* Hero unit */}
            <div className={useStyles.heroContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  <br></br>
                  <b>Helmet Detection</b>
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  <h2>잠깐!</h2> 헬멧 착용하셨나요?<br></br>
                  헬멧을 착용한 상태에서 <b></b>캡쳐 버튼을 누른 후<br></br>
                  <b>카메라를 5초 간 응시</b>해주세요.
                </Typography>

                <Camera></Camera>
              </Container>
            </div>
          </main>

          {/* Footer */}
          <footer className={useStyles.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              Something here to give the footer a purpose!
            </Typography>
            <Copyright />
          </footer>
          {/* End footer */}
        </React.Fragment>
      </div>
    );
  }
}

export default App;
