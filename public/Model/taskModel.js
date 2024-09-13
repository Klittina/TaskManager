class taskModel {
    #taskTomb = [];

    constructor(token) {
        this.token = token;
    }

    adatBe(vegpont, callback) {
        fetch(vegpont, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": this.token,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (typeof callback === 'function') {
                callback(data);
            } else {
                console.error("Callback is not a function");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    newTaskAdded(url, taskData, callback) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.token,
            },
            body: JSON.stringify(taskData),
        })
        .then(response => {
            if (!response.ok) {
                //return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error("Error adding task:", error);
        });
    }
    
    adatTorol(vegpont, taskId) {
        fetch(`${vegpont}/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": this.token, 
            }
        })
        .then(response => {
            if (!response.ok) {
                //throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Sikeres törlés", data);
        })
        .catch((error) => {
            console.error("Hiba a törlés során:", error);
        });
    }
    
    updateTask(url, taskData, callback) {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.token,
            },
            body: JSON.stringify(taskData),
        })
        .then(response => {
            if (!response.ok) {
                // Handle non-200 responses
                //return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            console.log("Task updated:", data);
            callback(data);
        })
        .catch(error => {
            console.error("Error updating task:", error);
        });
    }
    
}

export default taskModel;
