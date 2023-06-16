from datetime import timedelta
from flask import Flask
from flask import request
from flask import jsonify
from flask_jwt_extended import JWTManager
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token


class Config:
    JWT_SECRET_KEY = "seggret"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)
    JWT_SESSION_COOKIE = False
    JWT_TOKEN_LOCATION = "headers"


jwt = JWTManager()

app = Flask(__name__, static_folder="../static")
app.config.from_object(Config)

jwt.init_app(app)


@app.route("/set", methods=["POST"])
def set():
    response = jsonify("ok")
    set_access_cookies(response, create_access_token(identity="ok"))
    return {"access_token": create_access_token(identity="ok")}


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return "ok"
