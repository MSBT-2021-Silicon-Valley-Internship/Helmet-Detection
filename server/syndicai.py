import base64
import urllib.request
from pathlib import Path
from PIL import Image
import io
from collections import OrderedDict
import json

import numpy as np
import torch
from cv2 import cv2

from models.experimental import attempt_load
from utils.datasets import LoadImages
from utils.general import check_img_size, non_max_suppression, scale_coords
from utils.plots import plot_one_box
from utils.torch_utils import select_device


class PythonPredictor:

    def __init__(self, config):
        # urllib.request.urlretrieve("https://github.com/ultralytics/yolov5/releases/download/v3.1/yolov5s.pt", "yolov5s.pt")
        pass

    def predict(self, payload):
        """ Model Run function """

        # im = Image.open(io.BytesIO(base64.b64decode(payload["base64"])))
        # im.save('image.png', 'PNG')
        url = payload["url"]
        urllib.request.urlretrieve(url, "./input/image.png")

        # Initialize
        device = select_device()

        # Load model
        model = attempt_load("./yolov5s.pt", map_location=device)
        imgsz = check_img_size(640, s=model.stride.max())  # check img_size

        dataset = LoadImages('./input/image.png', img_size=imgsz)

        # Run inference
        objects = ["head", "helmet", "person"]
        img = torch.zeros((1, 3, imgsz, imgsz), device=device)  # init img
        _ = model(img) if device.type != 'cpu' else None  # run once
        for path, img, im0s, vid_cap in dataset:
            img = torch.from_numpy(img).to(device).float() / 255.0
            if img.ndimension() == 3:
                img = img.unsqueeze(0)

            # Inference
            pred = model(img, augment=False)[0]

            # Apply NMS
            pred = non_max_suppression(pred, 0.25, 0.45, classes=None, agnostic=False)
            pred = [p.tolist() for p in pred]
            pred = pred[0]
            result = OrderedDict()
            for i, p in enumerate(pred):
                result[i] = {'class': objects[int(p[5])], 'confidence': p[4]}
            result = json.dumps(result, indent="\t")
            return result