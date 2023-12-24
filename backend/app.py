from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Dummy car data for testing
cars = [
    {"id": 1, "brand": "Toyota", "model": "Camry"},
    {"id": 2, "brand": "Honda", "model": "Civic"},
]

# CRUD Endpoints

# Read (GET) - Get all cars
@app.route('/cars', methods=['GET'])
def get_cars():
    return jsonify(cars)

# Read (GET) - Get a specific car
@app.route('/cars/<int:car_id>', methods=['GET'])
def get_car(car_id):
    car = next((car for car in cars if car['id'] == car_id), None)
    if car:
        return jsonify(car)
    else:
        return jsonify({"error": "Car not found"}), 404

# Create (POST) - Add a new car
@app.route('/cars', methods=["GET",'POST'])
def add_car():
    data = request.get_json()
    new_car = {
        "id": len(cars) + 1,
        "brand": data['brand'],
        "model": data['model'],
    }
    cars.append(new_car)
    return jsonify(new_car), 201

# Update (PUT) - Update a specific car
@app.route('/cars/<int:car_id>', methods=['GET','PUT'])
def update_car(car_id):
    car = next((car for car in cars if car['id'] == car_id), None)
    if car:
        data = request.get_json()
        car['brand'] = data['brand']
        car['model'] = data['model']
        return jsonify(car)
    else:
        return jsonify({"error": "Car not found"}), 404

# Delete (DELETE) - Delete a specific car
@app.route('/cars/<int:car_id>', methods=['GETS','DELETE'])
def delete_car(car_id):
    global cars
    cars = [car for car in cars if car['id'] != car_id]
    return jsonify({"message": "Car deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True , port= 9000)
