import taskView from "./taskView.js";

class tasksView {
    constructor(tomb, szuloElem) {
        szuloElem.html(`<div class="foDivTask"></div>`);
        this.divElem = szuloElem.children("div:last-child");

        tomb.forEach(task => {
            new taskView(task, this.divElem);
        });

        szuloElem.append(`<div id="ujtask">Új task hozzáadása</div>`);
        $("#ujtask").on('click', () => this.ujTaskInput());
        window.addEventListener("taskUpdated", (event) => this.handleTaskUpdate(event));
    }
    
    ujTaskInput() {
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
        console.log(`Task updated: ${task_id}, new name: ${task_name}`);
    }
}

export default tasksView;
