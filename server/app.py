from flask import Flask, flash, request, redirect, url_for, session, jsonify, render_template, url_for
from storage import insert_calculation, get_calculations
from syndicai import PythonPredictor
from upload import uploadImage
from werkzeug.utils import secure_filename
import logging
import datetime
from flask_cors import CORS, cross_origin

import os

#from upload import uploader

app = Flask(__name__)
logger = logging.getLogger('HELLO WORLD')

@app.route('/')
def index():
    return "Helmet Detection", 200


CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

 
UPLOAD_FOLDER = '/usr/src/app'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



uploadfolder = uploadImage("")


      
@app.route('/images', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'imgfolder')
    
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")

    #SAVE NAME : DATE
    now = datetime.datetime.now() # 2015-04-19 12:11:32.669083
    nowDatetime = now.strftime('%Y-%m-%d %H:%M:%S')# 2015-04-19 12:11:32

    #attaching date to name
    file = request.files['file']
    print(file)
    file.save(file)

    filename = "".join([nowDatetime, secure_filename(file.filename)])
    print(filename)
    file.save(filename)

    destination="/".join([target, filename])
    print(destination)
    file.save(destination)
    #upload foldername save
    uploadfolder.setfoldername(destination)

    #session['uploadFilePath']=filename
    session['uploadFilePath']=destination

    response={'result': 'hello'}
    return jsonify(response)

      
@app.route('/web', methods=['GET'])
def showimage():
    uploadfolder.showimage()
    



def predict():
    """ Return JSON serializable output from the model """
    payload = request.args
    detector = PythonPredictor("")
    return detector.predict(payload)
