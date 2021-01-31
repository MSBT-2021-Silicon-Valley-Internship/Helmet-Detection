from flask import Flask, flash, request, redirect, url_for, session, jsonify
from db_connection import insert_helmet, delete_helmet, get_helmet, update_helmet
from syndicai import PythonPredictor
from werkzeug.utils import secure_filename
import logging
import datetime
from pathlib import Path
from flask_cors import CORS, cross_origin
import os

id='global'
id=1
app = Flask(__name__)
logger = logging.getLogger('HELLO WORLD')

@app.route('/')
def index():
    return "Helmet Detection", 200

@app.route('/images', methods=['POST'])
def process():
    fileUpload()
    # predict()
    updatedb()
    

@app.route('/images', methods=['GET'])
def data(id):
    '''
        Function used to get helmet history
        from Postgres database and return to fetch call in frontend.
    :return: Json format of either collected calculations or error message
    '''

    helmet_history = []

    try:
        helmet = get_helmet()
        for key, value in helmet.items():
            helmet_history.append(value)

        # return jsonify({'helmet': helmet_history}), 200
    except:
        return jsonify({'error': 'error fetching helmet history'}), 500

def predict():
    """ Return JSON serializable output from the model """
    payload = request.args
    detector = PythonPredictor("")
    return detector.predict(payload)

# def updatedb():
#     update_helmet()
#     delete_helmet()

# UPLOAD_FOLDER = '/usr/src/app'
UPLOAD_FOLDER = 'input/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def fileUpload():
    # target=os.path.join(UPLOAD_FOLDER, 'imgfolder')
    # target=os.path.join(UPLOAD_FOLDER)
    # if not os.path.isdir(target):
    #     os.mkdir(target)
    target=os.path.join(os.getcwd(),UPLOAD_FOLDER)
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")

    #SAVE NAME : DATE
    now = datetime.datetime.now() # 2015-04-19 12:11:32.669083
    nowDate = now.strftime('%Y-%m-%d')# 2015-04-19
    nowTime = now.strftime('%H:%M:%S')# 12:11:32
    nowDatetime = now.strftime('%Y-%m-%d %H:%M:%S')# 2015-04-19 12:11:32

    #attaching date to name
    # file = request.files['file']
    file = os.listdir(target)
    print(file)
    file.save(file)

    filename = "".join([nowDatetime, secure_filename(file.filename)])
    print(filename)
    file.save(filename)

    destination="/".join([target, filename])
    print(destination)
    file.save(destination)
    #session['uploadFilePath']=filename
    session['uploadFilePath']=destination
    response={'response': 'hello', 'fileurl': destination}
    global id
    insert_helmet(id, filename, nowDatetime, False)
    update_helmet()
    delete_helmet()
    id+=1
    #Json 형태로
    return jsonify(response)