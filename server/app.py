from flask import Flask, request, jsonify
from flask_cors import CORS

from predict import predict
from files import upload, download

app = Flask(__name__)
CORS(app)
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

    file = request.files['file']

    g_filename, filepath = upload(file)
    g_result = predict(filepath)

    return jsonify({'Response': 'Successfully upload and predict'}), 200


@app.route('/api/download', methods=['GET'])
def download_process():
    global g_filename, g_result

    img = download(g_filename)

    return jsonify({'Result': g_result, "imgSrc": img}), 200
