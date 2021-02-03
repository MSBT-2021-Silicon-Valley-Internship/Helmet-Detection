import base64
import datetime
import io
import os
from PIL import Image

UPLOAD_FOLDER = 'input'
DOWNLOAD_FOLDER = 'output'


def upload(file):
    prefix = datetime.datetime.now().strftime("%y%m%d_%H%M%S")
    filename = "_".join([prefix, file.filename])
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    file.save(filepath)

    return filename, filepath


def get_encoded_img(filepath):
    img = Image.open(filepath, mode='r')
    img_byte_arr = io.BytesIO()

    img.save(img_byte_arr, format="PNG")

    my_encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')

    return my_encoded_img


def download(filename):
    filepath = os.path.join(DOWNLOAD_FOLDER, filename)

    img = get_encoded_img(filepath)
    
    return img
