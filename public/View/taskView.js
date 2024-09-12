class taskView {
    #elem;

    constructor(elem, szuloElem) {
        this.#elem = elem;
        this.divElem = $(
            `<div id="task${elem.task_id}" class="taskok">
                    <h3 id="taskText${elem.task_id}">${elem.task_name}</h3>
                <button id="del${elem.task_id}">Töröl</button>
                <button id="szerk${elem.task_id}">Szerkesztés</button>
                </div>`
        );
        szuloElem.append(this.divElem);

        this.torolElem = $(`#del${elem.task_id}`);
        this.szerkesztElem = $(`#szerk${elem.task_id}`);
        this.taskTextElem = $(`#taskText${elem.task_id}`);

        this.divElem.on('click', () => this.kattintasTrigger('taskSelected'));

        this.torolElem.on("click", () => {
            console.log("Töröltem");
            this.kattintasTrigger("taskDelete");
        });

        this.szerkesztElem.on("click", () => {
            console.log("Szerkesztem a taskot");
            this.szerkesztesTrigger();
        });
    }

    kattintasTrigger(esemenynev) {
        const esemeny = new CustomEvent(esemenynev, { detail: { task_id: this.#elem.task_id } });
        window.dispatchEvent(esemeny);
        console.log("Nyomódott a task:", this.#elem.task_id);
    }

    szerkesztesTrigger() {
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
    
            const esemeny = new CustomEvent("taskUpdated", {
                detail: { task_id: this.#elem.task_id, task_name: updatedText }
            });
            window.dispatchEvent(esemeny);
        }
    }
}

export default taskView;
