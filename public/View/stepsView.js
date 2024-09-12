import stepView from "./stepView.js";

class stepsView {
    constructor(tomb, szuloElem) {
        szuloElem.html(`<div class="foDivStep"></div>`);
        this.divElem = szuloElem.children("div:last-child");

        tomb.forEach(step => {
            new stepView(step, this.divElem);
        });

        szuloElem.append(`<div id="ujstep">Új step hozzáadása</div>`);

        $("#ujstep").on('click', () => this.ujStepInput());

        window.addEventListener("stepUpdated", (event) => this.handleStepUpdate(event));
    }
    
    ujStepInput() {
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

            const esemeny = new CustomEvent("newStepAdded", {
                detail: { text: newStepText }
            });
            window.dispatchEvent(esemeny);
        }
    }

    handleStepUpdate(event) {
        const { step_id, text } = event.detail;
        console.log(`Step updated: ${step_id}, new text: ${text}`);
    }
}

export default stepsView;
