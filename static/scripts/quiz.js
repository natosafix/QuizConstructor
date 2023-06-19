let formJson = {
    "title": "Анкета",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ",
    "startTime": new Date("Jan 5, 2024 15:00:20"),
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

formJson = JSON.stringify(formJson);

const formData = JSON.parse(formJson);


function parse() {
    const form = document.createElement("form");
    form.id = "myForm";
    form.addEventListener("submit", (event) => event.preventDefault());

    document.querySelector(".main").prepend(form);

    form.append(createHeader());

    let i = 1;
    for (const question of formData.questions) {
        const name = "q" + i;
        let element;

        if (["one-line", "multi-line"].includes(question.type)) {
            element = createLineElement(question, name);
        }
        else if (["single-choice", "multi-choice"].includes(question.type)) {
            element = createChoiceElement(question, name);
        }
        else { console.log("unknown question type: " + question.type) }

        element.prepend(createQuestionNumber(i));

        form.append(element);

        i++;
    }
}

function createQuestionNumber(i) {
    const div = document.createElement("div");
    div.className = "question-number";
    div.innerHTML = "Вопрос №" + i;
    return div;
}

function createHeader() {
    const div = document.createElement("div");
    div.className = "block";

    const h2 = document.createElement("h2");
    h2.innerHTML = formData.title;

    const description = document.createElement("span");
    description.innerHTML = formData.description;

    div.append(h2);
    div.append(description);

    return div;
}

function createElementMainDiv(question) {
    const div = document.createElement("div");
    div.classList.add("element", "block", question.type);
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

    inputElement.classList.add("element-input", "any-element")
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

    input.className = "any-element"
    input.name = questionName;
    input.value = option;
    input.required = isRequired(question);

    label.append(input);
    label.append(option);

    choiceDiv.append(label);

    return choiceDiv;
}

class Timer {
    constructor(durationInSeconds, display, onFinish) {
        this.seconds = durationInSeconds;
        this.display = display;
        this.onFinishAction = onFinish;

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
                this.stopTimer();
                this.onFinish();
            }

            if (seconds <= this.redColorAt && minutes === 0) {
                this.display.style.color = "red";
            }
        };

        countdown();
        this.intervalId = setInterval(countdown, 1000);
    }

    onFinish() {
        this.onFinishAction();
    }

    stopTimer() {
        clearInterval(this.intervalId);
    }
}

function setTimer() {
    const startTime = new Date(formData.startTime);
    const endTime = new Date(formData.endTime);

    const seconds = (endTime - startTime) / 1000;

    timer = new Timer(seconds, document.querySelector("#time"), quizFinished);
    timer.startTimer();
}

let timer;

function hideTimer() {
    document.querySelector("#time").style.display = "none";
}

function showThanks() {
    document.querySelectorAll(".thanks").forEach(x => x.style.display = "block");
    document.querySelector("form").style.display = "none";
    document.querySelector(".under-blocks button[form='myForm']").style.display = "none";
}

async function quizFinished() {
    hideTimer();
    showThanks();
    await sendAnswers();
}

async function submitClicked() {
    if (document.querySelector("form").checkValidity()) {
        timer.stopTimer();
        await quizFinished();
    }
}

async function sendAnswers() {
    const answers = []
    const questionCount = document.querySelectorAll(".element").length;

    for (let i = 1; i <= questionCount; i++) {
        const nodes = document.getElementsByName("q" + i);

        if (nodes.length === 1) {
            answers.push(nodes[0].value);
            continue;
        }

        const t = [];

        for (const q of nodes) {
            if (q.checked) {
                t.push(q.value);
            }
        }

        answers.push(t);
    }
    console.log(JSON.stringify(answers));

    const response = await fetch('http://localhost:8080/db/apiRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({method: "saveAnswers", data: answers})
    });
}

let mainPageButton = document.querySelector('#main-page-button');
mainPageButton.addEventListener('click', () => window.location.href = 'http://localhost:8080/');

let sendAnswersButton = document.querySelector('#send-answers-button');
sendAnswersButton.addEventListener('click', submitClicked);