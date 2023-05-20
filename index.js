let json = {
    "title": "Анкета",
    "description": "Это анкета которую нужно заполнить",
    "startTime": new Date("Jan 5, 2024 15:00:00"),
    "endTime": new Date("Jan 5, 2024 15:01:10"),
    "questions": [
        {
            "type": "one-line",
            "question": "Имя",
            "required": "true"
        },
        {
            "type": "one-line",
            "question": "Матвей леха?",
            "required": "true"
        },
        {
            "type": "multi-line",
            "question": "Расскажите о себе",
        },
        {
            "type": "single-choice",
            "question": "Пол",
            "required": "true",
            "options": [
                "Мужчина",
                "Женщина",
                "Трансформер"
            ]
        },
        {
            "type": "multi-choice",
            "question": "Пол",
            "options": [
                "Мужчина",
                "Женщина",
                "Да",
                "Нет"
            ]
        }
    ]
};

json = JSON.stringify(json);

const data = JSON.parse(json);


function parse() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => event.preventDefault());

    const header = document.createElement("h2");
    header.innerHTML = data.title;
    form.append(header);

    let i = 1;
    for (const question of data.questions) {
        const name = "q" + i;
        let element;

        if (["one-line", "multi-line"].includes(question.type)) {
            element = createLineElement(question, name);
        }
        else if (["single-choice", "multi-choice"].includes(question.type)) {
            element = createChoiceElement(question, name);
        }
        else { console.log("unknown question type: " + question.type) }

        if (element !== undefined) {
            form.append(element);
        }

        i++;
    }
}

function createElementMainDiv(question) {
    const div = document.createElement("div");
    div.classList.add("element", question.type);
    return div;
}

function createElementDescription(question) {
    const e = document.createElement("div");
    e.className = "element-description";
    e.innerHTML = question.question;
    return e;
}

function isRequired(question) {
    const required = question["required"];
    return required === undefined ? false : required;
}

function createLineElement(question, questionName) {
    const div = createElementMainDiv(question);
    const label = document.createElement("label");
    const descriptionDiv = createElementDescription(question);

    let inputElement;

    if (question.type === "one-line") {
        inputElement = document.createElement("input");
        inputElement.type = "text";
    }
    else if (question.type === "multi-line") {
        inputElement = document.createElement("textarea");
    }
    else { console.log("unknown line type: " + question.type); }

    inputElement.className = "element-input";
    inputElement.name = questionName;
    inputElement.required = isRequired(question);

    label.append(descriptionDiv);
    label.append(inputElement);

    div.append(label);

    return div;
}

function createChoiceElement(question, questionName) {
    const div = createElementMainDiv(question);
    div.append(createElementDescription(question));

    for (const option of question.options) {
        const choiceDiv = createOption(question, option, questionName);
        div.append(choiceDiv);
    }

    return div;
}

function createOption(question, option, questionName) {
    const choiceDiv = document.createElement("div");
    choiceDiv.className = "element-choice";

    const label = document.createElement("label");
    const input = document.createElement("input");

    if (question.type === "single-choice") {
        input.type = "radio";
    }
    else if (question.type === "multi-choice") {
        input.type = "checkbox";
    }
    else { console.log("unknown question type when input.type: " + question.type); }

    input.name = questionName;
    input.value = option;
    input.required = isRequired(question);

    label.append(input);
    label.append(option);

    choiceDiv.append(label);

    return choiceDiv;
}

class Timer {
    constructor(durationInSeconds, display) {
        this.seconds = durationInSeconds;
        this.display = display;

        this.redColorAt = 60;
    }

    startTimer() {
        let minutes, seconds;

        const countdown = () => {
            minutes = parseInt(this.seconds / 60, 10);
            seconds = parseInt(this.seconds % 60, 10);

            const minutesStr = minutes < 10 ? "0" + minutes : minutes;
            const secondsStr = seconds < 10 ? "0" + seconds : seconds;

            this.display.textContent = minutesStr + ":" + secondsStr;

            if (--this.seconds < 0) {
                clearInterval(this.intervalId);
                this.onFinish();
            }

            if (seconds <= this.redColorAt && minutes === 0) {
                this.display.style.color = "red";
            }
        };

        countdown();
        this.intervalId = setInterval(countdown,1000);
    }

    onFinish() {

    }
}


function setTimer() {
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);

    const seconds = (endTime - startTime) / 1000;

    const timer = new Timer(seconds, document.querySelector("#time"));
    timer.startTimer();
}