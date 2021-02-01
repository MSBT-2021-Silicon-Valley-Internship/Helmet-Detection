import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function AlertDialog({name}) {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <img
        src={name}
        height={300}
        width={400}
        alt="placeholder"
        onClick={handleClickOpen}
      ></img>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Helmet Detection AI"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            헬멧이 인식되었습니다!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancle
          </Button>
          <RouterLink to="/home">
            <Button onClick={handleClose} color="primary" autoFocus>
              OK
            </Button>
          </RouterLink>
        </DialogActions>
      </Dialog>
    </div>
  );
}

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      imgSrc: '',
    };
  }


  render() {
    const { result, imgSrc } = this.state;
    
    const params = this.props.match.screenshot
    console.log(params)
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
            <AlertDialog name = {params}></AlertDialog>
          </Paper>
        </Container>
      </center>
    );
  }
}

export default Result;
