import taskView from "./taskView.js";

class tasksView {
    constructor(tomb, parent) {
        parent.html(`<div class="foDivTask"></div>`);
        this.divElem = parent.children("div:last-child");

        tomb.forEach(task => {
            new taskView(task, this.divElem);
        });

        parent.append(`<div id="newtask">Új task hozzáadása</div>`);
        $("#newtask").on('click', () => this.newTaskInput());
        window.addEventListener("taskUpdated", (event) => this.handleTaskUpdate(event));
    }
    
    newTaskInput() {
        if ($("#ujtaskInput").length === 0) {
            this.divElem.append(`
                <div id="ujtaskInput" class="task-input-div">
                    <input type="text" id="newTaskText" placeholder="Add meg az új task nevét">
                    <button id="addNewTaskButton">Task hozzáadása</button>
                </div>
            `);

            $("#addNewTaskButton").on("click", () => this.addNewTask());
        }
    }

    addNewTask() {
        const newTaskText = $("#newTaskText").val();
        
        if (newTaskText.trim() !== "") {
            this.divElem.append(`
                <div class="taskok">
                    <h3>${newTaskText}</h3>
                </div>
            `);
            $("#ujtaskInput").remove();

            const esemeny = new CustomEvent("newTaskAdded", {
                detail: { task_name: newTaskText }
            });
            window.dispatchEvent(esemeny);
        }
    }

    handleTaskUpdate(event) {
        const { task_id, task_name } = event.detail;
    }
}

export default tasksView;
