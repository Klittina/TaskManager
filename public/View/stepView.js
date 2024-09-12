class stepView {
    #elem;
    #task_id;

    constructor(elem, szuloElem, task_id) {
        this.#elem = elem;
        this.#task_id = task_id; 

        szuloElem.append(
            `<div id="${elem.step_id}" class="steppek">
                <h3 id="stepText${elem.step_id}">${elem.text}</h3>
                <button id="delstep${elem.step_id}">Töröl</button>
                <button id="modstep${elem.step_id}">Szerkesztés</button>
            </div>`
        );

        this.tablaElem = szuloElem.children("div:last-child");
        this.torolElem = $(`#delstep${elem.step_id}`);
        this.szerkesztElem = $(`#modstep${elem.step_id}`);
        this.stepTextElem = $(`#stepText${elem.step_id}`);

        this.torolElem.on("click", () => {
            console.log("Töröltem");
            this.kattintasTrigger("stepDelete");
        });

        this.szerkesztElem.on("click", () => {
            console.log("Szerkesztem a steppet");
            this.szerkesztesTrigger();
        });
    }

    kattintasTrigger(esemenynev) {
        const esemeny = new CustomEvent(esemenynev, { 
            detail: { 
                step_id: this.#elem.step_id, 
                task_id: this.#task_id  
            }
        });
        window.dispatchEvent(esemeny);
        console.log("Nyomódott a step:", this.#elem.step_id);
    }
    

    szerkesztesTrigger() {
        if ($(`#editStepInput${this.#elem.step_id}`).length === 0) {
            this.stepTextElem.html(`
                <input type="text" id="editStepInput${this.#elem.step_id}" value="${this.#elem.text}">
                <button id="saveStepButton${this.#elem.step_id}">Mentés</button>
            `);

            $(`#saveStepButton${this.#elem.step_id}`).on("click", () => this.saveStep());
        }
    }

    saveStep() {
        const updatedText = $(`#editStepInput${this.#elem.step_id}`).val();
        if (updatedText.trim() !== "") {
            this.stepTextElem.html(updatedText);

            $(`#editStepInput${this.#elem.step_id}`).remove();
            $(`#saveStepButton${this.#elem.step_id}`).remove();

            const esemeny = new CustomEvent("stepUpdated", {
                detail: { 
                    step_id: this.#elem.step_id, 
                    text: updatedText, 
                    task_id: this.#task_id
                }
            });
            window.dispatchEvent(esemeny);
        }
    }
}

export default stepView;
