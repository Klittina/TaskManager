class stepModel {
    constructor(token) {
        this.token = token;
    }

    adatBe(vegpont, callback) {
        fetch(vegpont, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": this.token,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Lépések adat", data);
            callback(data);
        })
        .catch(error => {
            console.error("Hiba:", error);
        });
    }

    newStepAdded(url, stepData, callback) {
        console.log('URL in newStepAdded:', url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.token,
            },
            body: JSON.stringify(stepData),
        })
        .then(response => {
            if (!response.ok) {
                //return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            console.log("Step added:", data);
            callback(data);
        })
        .catch(error => {
            console.error("Error adding task:", error);
        });
    }
    
    deleteStep(vegpont, stepId) {
        console.log("Deleting step at URL:", `${vegpont}/${stepId}`);
        fetch(`${vegpont}/${stepId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.token,
            }
        })
        .then(response => {
            if (!response.ok) {
                //throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Step deleted:", data);
            // Handle the successful delete response here
        })
        .catch(error => {
            console.error("Error deleting step:", error);
        });
    }
    
    updateStep(url, stepData, callback) {
        console.log('Request URL:', url); 
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.token,
            },
            body: JSON.stringify(stepData),
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

export default stepModel;
