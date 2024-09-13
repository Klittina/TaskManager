import stepView from "./stepView.js";

class stepsView {
    constructor(tomb, szuloElem) {
        szuloElem.html(`<div class="foDivStep"></div>`);
        this.divElem = szuloElem.children("div:last-child");

        tomb.forEach(step => {
            new stepView(step, this.divElem);
        });
        szuloElem.append(`<div id="newstep">Új step hozzáadása</div>`);
        $("#newstep").on('click', () => this.newStepInput());
        window.addEventListener("stepUpdated", (event) => this.handleStepUpdate(event));
    }
    
    newStepInput() {
        if ($("#ujstepInput").length === 0) {
            this.divElem.append(`
                <div id="ujstepInput" class="step-input-div">
                    <input type="text" id="newStepText" placeholder="Add meg az új step szövegét">
                    <button id="addNewStepButton">Step hozzáadása</button>
                </div>
            `);
            $("#addNewStepButton").on("click", () => this.addNewStep());
        }
    }
    addNewStep() {
        const newStepText = $("#newStepText").val();
        if (newStepText.trim() !== "") {
            this.divElem.append(`
                <div class="step">
                    <p>${newStepText}</p>
                </div>
            `);
            $("#ujstepInput").remove();

            const event = new CustomEvent("newStepAdded", {
                detail: { text: newStepText }
            });
            window.dispatchEvent(event);
        }
    }

    handleStepUpdate(event) {
        const { step_id, text } = event.detail;
    }
}

export default stepsView;
