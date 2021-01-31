from flask import Flask, flash, request, redirect, url_for, session, jsonify, render_template, send_file

import io, os

class uploadImage:
    def __init__(self, config):
        self.filename = ''

    def setfoldername(self, newFolderName):
        self.filename = newFolderName

    def showimage(self):
        return send_file(self.filename, as_attachment=True, mimetype='image/jpeg')

