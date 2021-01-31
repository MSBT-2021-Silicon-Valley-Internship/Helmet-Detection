### DB

- step 1 Environment setting

- step 2 video reference
![title](https://www.youtube.com/watch?v=Z9txOWCWMwA)

- step 3
docker-compose up

- step 4
connect to http://localhost:8080 & capture, upload

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

- [1. Technology stack](#technology-stack)
- [2. Quick Start - Local](#quick-start-local)
- [3. Quick Start - Docker](#quick-start-docker)
- [4. Deployment - Kubernetes](#deployment-kubernetes)
- [5. References](#references)

---

## Technology stack

### AI

- ![title](https://img.shields.io/badge/-Jupyter-F37626?&logo=jupyter&logoColor=white)
- ![title](https://img.shields.io/badge/-Google_Colab-F9AB00?&logo=googlecolab&logoColor=white)
- ![title](https://img.shields.io/badge/-Pytorch-EE4C2C?&logo=pytorch&logoColor=white)
- YOLO v5

### Frontend

- ![title](https://img.shields.io/badge/-React-61DAFB?&logo=react&logoColor=white)

### Backend

- ![title](https://img.shields.io/badge/-Flask-000000?&logo=flask&logoColor=white)
- ![title](https://img.shields.io/badge/-Google_Cloud-4285F4?&logo=Google-Cloud&logoColor=white)
- ![title](https://img.shields.io/badge/-PostgreSQL-336791?&logo=postgreSQL&logoColor=white)

### ETC

- ![title](https://img.shields.io/badge/-Github-181717?&logo=Github&logoColor=white)
- ![title](https://img.shields.io/badge/-Slack-4A154B?&logo=Slack&logoColor=white)
- ![title](https://img.shields.io/badge/-Notion-000000?&logo=notion&logoColor=white)

---

## Quick Start - Local

### 1-1. Environment Setting

- git clone

  ```bash
  git clone https://github.com/MSBT-2021-Silicon-Valley-Internship/Helmet-Detection.git
  cd Helmet-Detection
  ```

- python venv

  ```bash
  cd server
  python3 -m venv venv
  source venv/bin/activate
  (venv)
  ```

- install requirements.txt

  ```bash
  (venv) pip install -r requirements.txt
  ```

- create config.ini (PostgresSQL (SQLAlchemy) - Google SQL Instance)

  ```bash
  # in server folder

  [users_images_database]
  user = <username>
  password = <password>
  dbname = users_images
  host = <public-ip-address>
  ```

### 1-2. Backend : Flask

- run </br>
  <localhost:8000>

  ```bash
  (venv) cd server
  (venv) python run.py
  ```

### 1-3. Frontend : React

- npm install

  ```bash
  cd client
  npm i
  ```

- npm start </br>
  <localhost:8080>

  ```bash
  npm start
  ```

- npm build

  ```bash
  npm run build
  ```

- nginx

  ```bash
  # Note: you might need to add sudo before these commands

  # start nginx
  nginx
  # stop nginx
  nginx -s stop
  ```

---

## Quick Start - Docker

### 1-1. Docker compose

- docker-compose

  ```bash
  # make sure to be in the directory where your docker-compose.yaml
  docker-compose up --build
  docker-compose down
  ```

---

## Deployment - Kubernetes

### 1-1. GCP's Cloud SDK

- install GCP's Cloud SDK
  <https://cloud.google.com/sdk/docs/quickstart>

- initialize cloud SDK

  ```bash
  # view to see if your email is authenticated
  gcloud auth list
  # if not authenticated login to your account
  gcloud auth login
  ```

- generate application's Services

  ```bash
  gcloud builds submit --project=<project_name> --config cloudbuild.yaml
  ```

### 1-2. GCP's Container Registry

- push docker-images

  ```bash
  docker build -t gcr.io/<project-id>/<flask-image-name> .
  docker build -t gcr.io/<project-id>/<nginx-image-name> ./react-app
  docker push gcr.io/<project-id>/<flask-image-name>
  docker push gcr.io/<project-id>/<nginx-image-name>
  ```

---

## References
