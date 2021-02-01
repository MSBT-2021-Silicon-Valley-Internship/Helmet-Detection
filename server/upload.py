from flask import make_response, send_file, jsonify

import io, os
import base64

class uploadImage:
    def __init__(self, config):
        self.filename = ''

    def setfoldername(self, newFolderName):
        self.filename = newFolderName

    def getfoldername(self):
        return self.filename

    def showimage(self):
        byte_io = io.BytesIO()
        byte_io.write(self.filename)
        byte_io.seek(0)
        response = make_response(send_file(byte_io,mimetype='image/jpg'))
        response.headers['Content-Transfer-Encoding']='base64'
        return response