import datetime
import os
import io
import base64
from PIL import Image

from flask import Flask, request, jsonify, g
from predict import predict
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'input'
app.config['DOWNLOAD_FOLDER'] = 'output'
g_filename = None
g_result = None

@app.route('/')
def index():
    return "Helmet Detection", 200


@app.route('/health')
def health():
    return '', 200


@app.route('/ready')
def ready():
    return '', 200


@app.route('/api/upload', methods=['POST'])
def upload_process():
    global g_filename, g_result
    prefix = datetime.datetime.now().strftime("%y%m%d_%H%M%S")

    file = request.files['file']
    filename = "_".join([prefix, file.filename])
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    file.save(filepath)
    
    g_filename = filename
    g_result = predict(filepath)
    return jsonify({'Response': 'Successfully upload and predict'}), 200


def get_encoded_img(filepath):
    img = Image.open(filepath, mode='r')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format="PNG")
    my_encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return my_encoded_img

@app.route('/api/download', methods=['GET'])
def download_process():
    global g_filename, g_result
    filepath = os.path.join(app.config['DOWNLOAD_FOLDER'], g_filename)
    img = get_encoded_img(filepath)

    response_data = {'Result': g_result, "imgSrc": img}
    return jsonify(response_data), 200
