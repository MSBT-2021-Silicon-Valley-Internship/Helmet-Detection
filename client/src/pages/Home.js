import React from "react";
import { Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

const Home = () => {
  return (
    <div>
      <main>   
        <div className={useStyles.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Helmet Detection AI
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
            <Link component={RouterLink} to="/webcam">
                Start!
              </Link>
          </Container>
        </div>
      </main>
    </div>
  );
};
export default Home;
