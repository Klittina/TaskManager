import taskModel from "../Model/taskModel.js";
import stepModel from "../Model/stepModel.js";
import tasksView from "../View/tasksView.js";
import stepsView from "../View/stepsView.js";

class taskManagerController {
    constructor() {
        const token = $('meta[name="csrf-token"]').attr("content");
        this.vegpont1 = "/maintasks";
        this.vegpont2 = "/mainsteps";
        this.vegpont3 = "/api/taskstore";
        this.vegpont4 = "/api/stepsstore";
        this.taskmodel = new taskModel(token);
        this.stepmodel = new stepModel(token);

        this.taskmodel.adatBe(this.vegpont1, (data) => {
            new tasksView(data, $("#aside"));
        });

        window.addEventListener('taskSelected', (event) => {
            this.currentTaskId = event.detail.task_id;  
            this.showSteps(event.detail.task_id);
        });


        window.addEventListener("newTaskAdded", (event) => this.newTaskAdded(event.detail.task_name));
        window.addEventListener("newStepAdded", (event) => this.newStepAdded(event.detail.text));
        
        window.addEventListener("taskUpdated", (event) => {
            const { task_id, task_name } = event.detail;
            this.updateTask(task_id, task_name);
        });

        window.addEventListener("stepUpdated", (event) => {
            const { step_id, text } = event.detail;
            this.updateStep(step_id, text);
        });

        $(window).on("taskDelete", (event) => {
            const taskId = event.detail.task_id;
            console.log("Törlés controllerben: ", taskId);
            this.taskmodel.adatTorol('/api/tasks', taskId);
            this.taskmodel.adatBe(this.vegpont1, (data) => {
                new tasksView(data, $("#aside"));
            });
        });
        

        $(window).on("stepDelete", (event) => {
            const stepId = event.detail.step_id;
            console.log("Törlés step controllerben: ", stepId);
            this.stepmodel.deleteStep('/api/steps', stepId);
            this.showSteps(this.currentTaskId);
        });
        
        
    }

    newTaskAdded(task_name) {
        this.taskmodel.newTaskAdded(this.vegpont3, { task_name: task_name }, (data) => {
            this.taskmodel.adatBe(this.vegpont1, (data) => {
                new tasksView(data, $("#aside"));
            });
        });
        location.reload();
    }

     newStepAdded(text) {
        if (this.currentTaskId) { 
            this.stepmodel.newStepAdded(this.vegpont4, { text: text, task_id: this.currentTaskId }, (data) => {
                this.showSteps(this.currentTaskId); 
            });
        } else {
            console.log("Nincs kiválasztva task, amihez steppet lehetne hozzáadni.");
        }
    }

    showSteps(taskId) {
        console.log("Steps betöltése a következő Task ID-hez:", taskId);
        this.stepmodel.adatBe(`${this.vegpont2}/${taskId}`, (data) => {
            console.log("Steps adatok:", data);
            new stepsView(data, $("#section"), taskId);
        });
    }
    updateTask(task_id, task_name) {
        console.log("updatelek egy taskot", task_id, task_name)
        const url = `/tasks/${task_id}`;
        const taskData = { task_name };

        this.taskmodel.updateTask(url, taskData, (response) => {
            console.log("Task updated:", response);
        });
    }

    updateStep(step_id, text) {
        console.log("updatelek egy steppet", step_id, text)
        const url = `/steps/${step_id}`;
        const stepData = { text };

        this.stepmodel.updateStep(url, stepData, (response) => {
            console.log("Task updated:", response);
        });
    }
}

export default taskManagerController;
