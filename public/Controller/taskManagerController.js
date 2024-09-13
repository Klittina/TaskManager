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
            this.taskmodel.adatTorol('/api/tasks', taskId);
            this.taskmodel.adatBe(this.vegpont1, (data) => {
                new tasksView(data, $("#aside"));
            });
        });
        

        $(window).on("stepDelete", (event) => {
            const stepId = event.detail.step_id;
            this.stepmodel.deleteStep('/api/steps', stepId);
            location.reload();
            this.showSteps(this.currentTaskId);
        });
        
        
    }

    newTaskAdded(task_name) {
        this.taskmodel.newTaskAdded(this.vegpont3, { task_name: task_name }, (data) => {
            location.reload();
            this.taskmodel.adatBe(this.vegpont1, (data) => {
                new tasksView(data, $("#aside"));
            });
        });
        
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
        this.stepmodel.adatBe(`${this.vegpont2}/${taskId}`, (data) => {
            new stepsView(data, $("#section"), taskId);
        });
    }
    updateTask(task_id, task_name) {
        const url = `/tasks/${task_id}`;
        const taskData = { task_name };

        this.taskmodel.updateTask(url, taskData, (response) => {
            location.reload();
        });
    }

    updateStep(step_id, text) {
        const url = `/steps/${step_id}`;
        const stepData = { text };

        this.stepmodel.updateStep(url, stepData, (response) => {
            location.reload();
        });
    }
}

export default taskManagerController;
