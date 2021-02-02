import React, { Component } from "react";
import Webcam from "react-webcam";
import ReactJson from "react-json-view";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import fetchStream from 'fetch-readablestream'

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      result: null,
      image: null,
      image2: null
    };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ screenshot: imageSrc });
  };

  uploadImage = (image) => {
    const url = "http://localhost:8000/images";
    const data = new FormData();

    const imageSrc = this.webcam.getScreenshot();
    
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        data.append("file", blob, "face3.jpg");

        const options = {
          method: "post",
          body: data,
        };

        fetch(url, options)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            this.setState({
              result : res,
            });
          });
      });
      
  };

  showImage = () => {
    const url = "http://localhost:8000/web";

    fetch(url)
    .then((response) => {
      console.log(response)
      return response.blob();
    })
    .then((blob)=>{
        console.log(blob)
        var reader = new FileReader();
        
        reader.onload = function() {
            var base64data = reader.result;                
            console.log(base64data);
        }
        reader.readAsDataURL(blob); 
        this.setState({
          image : reader,
          image2 : reader.result
        });
        console.log(reader)
        console.log(reader.result)

    })
    .catch((err) => {
      console.log(err);
    });
   
  }


  render() {
    const { screenshot, result, image, image2 } = this.state;

    const useStyles = makeStyles((theme) => ({
      heroButtons: {
        marginTop: theme.spacing(4),
      },
    }));

    return (
      <center>
        <div>
          <div>
            <h2>Camera</h2>
            <Webcam
              audio={false}
              height={400}
              width={400}
              ref={this.setRef}
              screenshotFormat="image/jpg"
            />
          </div>
          <div className={useStyles.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button onClick={() => this.capture()} variant="contained" color="primary">
                  Capture
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => this.uploadImage()} variant="outlined" color="primary">
                  Upload
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => this.showImage()} variant="outlined" color="primary">
                  show
                </Button>
              </Grid>
            </Grid>
          </div>

          <div>
            <h2>Screenshot</h2>
            {screenshot && <img src={screenshot} alt="screenshot" />}
          </div>

          <div>
            <h3>Result?</h3>
            {result && <ReactJson src={result} />}
            
          </div>
          <div>
            <h3>show image from flask</h3>
            {image && <img src={image} />}
            {image2 && <img src={image2} />}
            
          </div>
        </div>
      </center>
    );
  }
}

export default Camera;
