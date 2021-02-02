import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Alert, AlertTitle } from "@material-ui/lab";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
      <div>
        <NavTabs />
        <Container id="result-page" className={useStyles.root}>
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
      </div>
    );
  }
}

export default Result;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Page One" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Page Two" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Page Three" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Page One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel>
    </div>
  );
}
