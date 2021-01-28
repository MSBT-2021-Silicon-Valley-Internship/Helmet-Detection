from gevent.pywsgi import WSGIServer
import os
from app import app

# As flask is not a production suitable server, we use will
# a WSGIServer instance to serve our flask application. 
if __name__ == '__main__':  
    app.secret_key = os.urandom(24)
    WSGIServer(('0.0.0.0', 8000), app).serve_forever()