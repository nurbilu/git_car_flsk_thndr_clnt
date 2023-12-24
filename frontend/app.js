document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display initial car data
    fetchCars();

    // Set up event listeners for the create and update buttons
    document.getElementById("createForm").addEventListener("submit", function (event) {
        event.preventDefault();
        createCar();
    });

    document.getElementById("updateForm").addEventListener("submit", function (event) {
        event.preventDefault();
        updateCar();
    });

    // Optional: You can add event listener for cancel button if needed
    // document.getElementById("cancelUpdate").addEventListener("click", cancelUpdate);
});

function fetchCars() {
    fetch("http://localhost:5000/cars")
        .then(response => response.json())
        .then(data => displayCars(data))
        .catch(error => console.error('Error fetching cars:', error));
}

function displayCars(cars) {
    const carList = document.getElementById("carList");
    carList.innerHTML = ""; // Clear existing list

    cars.forEach(car => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${car.brand}</strong> - ${car.model} 
                              <button onclick="editCar(${car.id})">Edit</button> 
                              <button onclick="deleteCar(${car.id})">Delete</button>`;
        carList.appendChild(listItem);
    });
}

function createCar() {
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;

    fetch("http://localhost:5000/cars", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ brand, model })
    })
        .then(response => response.json())
        .then(data => {
            fetchCars(); // Refresh the car list after creating a new car
            clearCreateForm(); // Optional: Clear the form fields
        })
        .catch(error => console.error('Error creating car:', error));
}

function editCar(carId) {
    // Fetch the car data for the selected carId
    fetch(`http://localhost:5000/cars/${carId}`)
        .then(response => response.json())
        .then(data => {
            // Populate the update form with the car data
            document.getElementById("updateBrand").value = data.brand;
            document.getElementById("updateModel").value = data.model;

            // Show the update form
            document.getElementById("updateFormContainer").style.display = "block";
        })
        .catch(error => console.error('Error fetching car for update:', error));
}

function updateCar() {
    const carId = button.getAttribute("data-carid");
    const brand = document.getElementById("updateBrand").value;
    const model = document.getElementById("updateModel").value;

    fetch(`http://localhost:5000/cars/${carId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ brand, model })
    })
        .then(response => response.json())
        .then(data => {
            fetchCars(); // Refresh the car list after updating the car
            cancelUpdate(); // Hide the update form
        })
        .catch(error => console.error('Error updating car:', error));
}

function deleteCar(carId) {
    fetch(`http://localhost:5000/cars/${carId}`, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(data => fetchCars()) // Refresh the car list after deleting the car
        .catch(error => console.error('Error deleting car:', error));
}

function cancelUpdate() {
    // Clear the update form fields
    document.getElementById("updateBrand").value = "";
    document.getElementById("updateModel").value = "";

    // Hide the update form
    document.getElementById("updateFormContainer").style.display = "none";
}

function clearCreateForm() {
    // Clear the create form fields
    document.getElementById("brand").value = "";
    document.getElementById("model").value = "";
}
