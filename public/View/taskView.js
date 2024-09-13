class taskView {
    #elem;

    constructor(elem, szuloElem) {
        this.#elem = elem;
        this.divElem = $(
            `<div id="task${elem.task_id}" class="taskok">
                    <h3 id="taskText${elem.task_id}">${elem.task_name}</h3>
                <button id="del${elem.task_id}">Töröl</button>
                <button id="mod${elem.task_id}">Szerkesztés</button>
                </div>`
        );
        szuloElem.append(this.divElem);

        this.deleteThis = $(`#del${elem.task_id}`);
        this.modThis = $(`#mod${elem.task_id}`);
        this.taskTextElem = $(`#taskText${elem.task_id}`);

        this.divElem.on('click', () => this.clickTrigger('taskSelected'));

        this.deleteThis.on("click", () => {
            this.clickTrigger("taskDelete");
        });

        this.modThis.on("click", () => {
            this.modifyTrigger();
        });
    }

    clickTrigger(eventname) {
        const event = new CustomEvent(eventname, { detail: { task_id: this.#elem.task_id } });
        window.dispatchEvent(event);
    }

    modifyTrigger() {
        if ($(`#editTaskInput${this.#elem.task_id}`).length === 0) {
            this.taskTextElem.html(`
                <input type="text" id="editTaskInput${this.#elem.task_id}" value="${this.#elem.task_name}">
                <button id="saveTaskButton${this.#elem.task_id}">Mentés</button>
            `);

            $(`#saveTaskButton${this.#elem.task_id}`).on("click", () => this.saveTask());
        }
    }

    saveTask() {
        const updatedText = $(`#editTaskInput${this.#elem.task_id}`).val();
        if (updatedText.trim() !== "") {
            this.taskTextElem.html(updatedText);
    
            $(`#editTaskInput${this.#elem.task_id}`).remove();
            $(`#saveTaskButton${this.#elem.task_id}`).remove();
    
            const event = new CustomEvent("taskUpdated", {
                detail: { task_id: this.#elem.task_id, task_name: updatedText }
            });
            window.dispatchEvent(event);
        }
    }
}

export default taskView;
