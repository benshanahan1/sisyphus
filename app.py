#!/usr/bin/python

from flask import Flask
from lib.config import DEBUG, IP, PORT
from lib.util import TemplateUtilities
from gevent.wsgi import WSGIServer
app = Flask(__name__)

@app.route("/")
def index():
    context = {}
    return TemplateUtilities.render("base.html", context)


if __name__ == "__main__":
    http_server = WSGIServer((IP, PORT), app)
    http_server.serve_forever()