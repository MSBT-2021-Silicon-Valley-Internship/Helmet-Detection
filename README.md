# MSBT

This is a web service that recognizes wearing a helmet. </br>
If a user captures a picture using a webcam, he or she can recognize whether he or she is wearing a helmet. </br>

---

## Members

- 박기덕(<http://github.com/koreandrum97>)
- 김동용(<https://github.com/kingyong9169>)
- 김웅수(<https://github.com/CJavaPython>)
- 김효진(<https://github.com/hy57in>)

---

## Content

- [0. Preview](#preview)
- [1. Technology stack](#technology-stack)
- [2. Quick Start - Docker](#quick-start-docker)
- [3. References](#references)

---

## Preview

![Homepage](https://user-images.githubusercontent.com/48934522/106851463-a2412400-66f9-11eb-9b36-5db0467f214a.PNG)

### Demo

- Success
  ![헬멧인식_성공_-_online-video-cutter com_](https://user-images.githubusercontent.com/48934522/106852148-ed0f6b80-66fa-11eb-8c80-8f39244acc79.gif)

- Fail
  ![헬멧인식_실패_-_online-video-cutter com_](https://user-images.githubusercontent.com/48934522/106852149-eda80200-66fa-11eb-8b8d-455e9eb7e9cc.gif)

### Function

- App Bar
  ![appbar_1](https://user-images.githubusercontent.com/48934522/106852151-ee409880-66fa-11eb-8268-0bdb8cc75aa5.gif)

- Stepper
  ![stepper_1](https://user-images.githubusercontent.com/48934522/106852138-eb45a800-66fa-11eb-898a-5f5d8423a43f.gif)

- Webcam ON,OFF
  ![WEBCAM-ON_OFF_1](https://user-images.githubusercontent.com/48934522/106852142-ec76d500-66fa-11eb-9b2f-581a1709c0d2.gif)

- Recapture
  ![Recapture](https://user-images.githubusercontent.com/48934522/106852152-eed92f00-66fa-11eb-930a-7481badb9236.gif)

---

## Technology stack

### Architecture

![image](https://user-images.githubusercontent.com/48934522/106883289-252aa480-6723-11eb-8ce0-3b44fb7c7b9b.png)

### AI

- ![title](https://img.shields.io/badge/-Jupyter-F37626?&logo=jupyter&logoColor=white)
- ![title](https://img.shields.io/badge/-Google_Colab-F9AB00?&logo=googlecolab&logoColor=white)
- ![title](https://img.shields.io/badge/-Pytorch-EE4C2C?&logo=pytorch&logoColor=white)
- YOLO v5

### Frontend

- ![title](https://img.shields.io/badge/-React-61DAFB?&logo=react&logoColor=white)
- ![title](https://img.shields.io/badge/-Material_UI-0081CB?&logo=Material-UI&logoColor=white)
- ![title](https://img.shields.io/badge/-Sass-CC6699?&logo=Sass&logoColor=white)

### Backend

- ![title](https://img.shields.io/badge/-Flask-000000?&logo=flask&logoColor=white)
- WSGI

### ETC

- ![title](https://img.shields.io/badge/-Github-181717?&logo=Github&logoColor=white)
- ![title](https://img.shields.io/badge/-Slack-4A154B?&logo=Slack&logoColor=white)
- ![title](https://img.shields.io/badge/-Notion-000000?&logo=notion&logoColor=white)
- ![title](https://img.shields.io/badge/-Swagger-85EA2D?&logo=Swagger&logoColor=white)

---

## Quick Start - Docker

### 1-1. Environment Setting

- git clone

  ```bash
  git clone https://github.com/MSBT-2021-Silicon-Valley-Internship/Helmet-Detection.git
  cd Helmet-Detection
  ```

- Frontend : React

  ```bash
  # npm install
  cd client
  npm i

  # npm build
  npm run build
  ```

### 1-2. Docker compose

- docker-compose

  ```bash
  # make sure to be in the directory where your docker-compose.yaml
  docker-compose up --build
  docker-compose down
  ```

- Checkout web service at http://localhost:8080

---

## References

### Structure

```bash
|-- client
    |
    |-- src
    |   |   |-- client
    |   |   |   |-- Root.js
    |   |   |
    |   |   |-- pages
    |   |   |   |-- Camera // camera page
    |   |   |   |-- Home // home page, stepper
    |   |   |   |-- Navigation // app bar
    |   |   |   |-- Result // result page
    |   |   |   |
    |   |   |   |-- index.js
    |   |   |
    |   |   |-- shared
    |   |   |   |-- App.js
    |   |   |
    |   |   |-- index.js
    |   |   |-- serviceWorker.js
    |
    |-- Dockerfile
    |-- package.json // npm install

|-- server
    |
    |-- model // YOLO v5
    |-- utils // YOLO v5
    |
    |-- app.py // Flask server
    |-- run.py // WSGI server
    |
    |-- files.py // File upload and download
    |-- predict.py // Predict input image
    |-- yolov5s_helmet.pt // Pretrained Pytorch weights
    |
    |-- requirements.txt
    |-- Dockerfile
```

### YOLO v5

https://github.com/ultralytics/yolov5

### Swagger

https://app.swaggerhub.com/apis-docs/MSBT_2021/Helmet-Detection/1.0.0
