from flask import Flask, flash, request, redirect, url_for, session, jsonify
from storage import insert_calculation, get_calculations
from syndicai import PythonPredictor
from werkzeug.utils import secure_filename
import logging
import datetime

from flask_cors import CORS, cross_origin

import os

app = Flask(__name__)

@app.route('/')
def index():
    return "Helmet Detection", 200

@app.route('/health')
def health():
    return '', 200

@app.route('/ready')
def ready():
    return '', 200

@app.route('/data', methods=['GET'])
def data():
    '''
        Function used to get calculations history
        from Postgres database and return to fetch call in frontend.
    :return: Json format of either collected calculations or error message
    '''

    calculations_history = []

    try:
        calculations = get_calculations()
        for key, value in calculations.items():
            calculations_history.append(value)
    
        return jsonify({'calculations': calculations_history}), 200
    except:
        return jsonify({'error': 'error fetching calculations history'}), 500

@app.route('/insert_nums', methods=['POST'])
def insert_nums():
    '''
        Function used to insert a calculation into our postgres
        DB. Operands of operation received from frontend.
    :return: Json format of either success or failure response.
    '''

    insert_nums = request.get_json()
    firstNum, secondNum, answer = insert_nums['firstNum'], insert_nums['secondNum'], insert_nums['answer']

    try:
        insert_calculation(firstNum, secondNum, answer)
        return jsonify({'Response': 'Successfully inserted into DB'}), 200
    except:
        return jsonify({'Response': 'Unable to insert into DB'}), 500

@app.route('/predict')
def predict():
    """ Return JSON serializable output from the model """
    payload = request.args
    detector = PythonPredictor("")
    return detector.predict(payload)



#capture image api
#https://webisfree.com/2017-08-21/python-flask-%EC%97%AC%EB%9F%AC%EA%B0%9C%EC%9D%98-%ED%8C%8C%EC%9D%BC-%EB%8F%99%EC%8B%9C-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%A9%EB%B2%95


logging.basicConfig(level=logging.INFO)
 
logger = logging.getLogger('HELLO WORLD')
 
 
 
UPLOAD_FOLDER = '/usr/src/app'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
 
app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
  
@app.route('/upload-face', methods=['POST'])
def fileUpload():
    
    target=os.path.join(UPLOAD_FOLDER,'imgfolder')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")

    #SAVE NAME : DATE
    now = datetime.datetime.now() # 2015-04-19 12:11:32.669083
    nowDate = now.strftime('%Y-%m-%d')# 2015-04-19
    nowTime = now.strftime('%H:%M:%S')# 12:11:32
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
    #session['uploadFilePath']=filename
    session['uploadFilePath']=destination
    response={'response': 'hello', 'fileurl': destination}
    #Json 형태로 
    return jsonify(response)