from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
cars = [
        {"model": "Toyota", "year": 1996},
        {"model": "Honda", "year": 2005},
        {"model": "Ford", "year": 2010},
        {"model": "Chevrolet", "year": 2018},
        {"model": "BMW", "year": 2022}]

@app.route('/')
def get_cars():
    return jsonify(cars)

@app.route('/add' , methods = ["GET","POST"])
def add():
    if request.methods == "POST":
        cars.append(request.get_json)
    return cars
        


if __name__ == '__main__':
    app.run(debug=True , port=9000)