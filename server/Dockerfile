# using base image
# Start FROM Nvidia PyTorch image https://ngc.nvidia.com/catalog/containers/nvidia:pytorch
FROM nvcr.io/nvidia/pytorch:20.10-py3

# Install linux packages
RUN apt update && apt install -y screen

# Install python dependencies
RUN pip install --upgrade pip

# copy requirements.txt to current folder
COPY requirements.txt .

# installing flask requirements
RUN pip install -r requirements.txt

RUN pip install gsutil

# Create working directory
# setting working dir inside container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy contents
COPY . /usr/src/app
RUN ls /usr/src/app


# exposing port 8000 on container
EXPOSE 8000

# serving flask backend through uWSGI server
CMD [ "python", "run.py" ]