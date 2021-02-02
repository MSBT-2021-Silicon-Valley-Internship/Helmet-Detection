import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tabs: {
    fontSize: "70%",
    fontFamily: "Century Gothic",
  },
});

export default function Navigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="default"
        textColor="default"
        centered
      >
        <Link to={"/"}>
          <Tab className={classes.tabs} label="Home" />
        </Link>
        <Link to={"/camera"}>
          <Tab className={classes.tabs} label="Camera" />
        </Link>
        <Link to={"/result"}>
          <Tab className={classes.tabs} label="Result" />
        </Link>
      </Tabs>
    </Paper>
  );
}
