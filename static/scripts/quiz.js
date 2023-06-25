const quizId = parseInt(document.querySelector('#quiz-id').textContent);
const userId = document.querySelector('#user-id').textContent;

const choiceTypes = ['oneList', 'severalList', 'dropList'];
const codeTypes = ['javascript', 'xml', 'css'];
const questionType2Id = {'shortText': 1, 'longText': 2, 'javascript': 3, 'oneList': 4, 'severalList': 5, 'xml': 6, 'css': 7};
const id2QuestionType = {1: 'shortText', 2: 'longText', 3: 'javascript', 4: 'oneList', 5: 'severalList', 6: 'xml', 7: 'css'};
let quizData;
let quizParser;
document.addEventListener('DOMContentLoaded', async function(event) {
    quizData = await getQuizDataForFiller();
    quizParser = new QuizParser(quizData);
    quizParser.parse();
    quizParser.addCode();
    setTimer();
});
async function getQuizDataForFiller() {
    let response = await fetch('http://localhost:8080/db/apiRequest?' + new URLSearchParams(
        {
            method: "quiz/getQuizForUser",
            data: JSON.stringify({id: quizId})
        }),
        {
            method: 'GET',
        });
    return await response.json();
    /*return {
        id: 1,
        title: "Анкета",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        startTime: new Date("Jan 5, 2024 15:00:20"),
        endTime: new Date("Jan 5, 2024 15:04:10"),
        questions: [
            {
                content: "Что такое tilted?",
                id: 23, // id вопроса в бд
                type: {
                    typeId: 1,
                    name: "oneList"
                },
                required: true,
                maxScore: 2,
                answers: [
                    {
                        content: "глагол",
                        id: 123 // id ответа в бд
                    },
                    {
                        content: "сущ",
                        id: 234 // id ответа в бд
                    },
                    {
                        content: "числ",
                        id: 21234 // id ответа в бд
                    }
                ],
                correctAnswers: [
                    {
                        content: "глагол",
                        id: 456 // id правильного ответа в бд
                    },
                ],
                isAutoCheck: true
            },
            {
                content: "Что такое JS ?",
                id: 2233, // id вопроса в бд
                type: {
                    typeId: 2,
                    name: "severalList"
                },
                required: true,
                maxScore: 1,
                answers: [
                    {
                        content: "Срань",
                        id: 96 // id ответа в бд
                    },
                    {
                        content: "язык",
                        id: 196 // id ответа в бд
                    },
                    {
                        content: "гавна",
                        id: 199 // id ответа в бд
                    }
                ],
                correctAnswers: [
                    {
                        content: "Срань",
                        id: 100 // id ответа в бд
                    },
                    {
                        content: "гавна",
                        id: 101 // id ответа в бд
                    }
                ],
                isAutoCheck: true
            },
            {
                content: "Что такое JS ?",
                id: 1234, // id вопроса в бд
                type: {
                    typeId: 3,
                    name: "shortText"
                },
                required: true,
                maxScore: 1,
                answers: null,
                correctAnswers: null,
                isAutoCheck: false
            },
            {
                content: "Напишите сочинение на тему 'Почему Матвей леха?'",
                id: 124, // id вопроса в бд
                type: {
                    typeId: 4,
                    name: "longText"
                },
                required: true,
                maxScore: 5,
                answers: null,
                correctAnswers: null,
                isAutoCheck: false
            }
        ]
    };*/
}


class QuizParser {
    constructor(quizData) {
        this.quizData = quizData
    }

    parse() {
        const form = document.createElement("form");
        form.id = "myForm";
        form.addEventListener("submit", (event) => event.preventDefault());

        document.querySelector("main").prepend(form);

        form.append(this.createHeader());

        let i = 1;
        for (const question of this.quizData.questionVms) {
            const name = "q" + i;
            let element;

            if (["shortText", "longText"].includes(question.type.name) || codeTypes.includes(question.type.name)) {
                element = this.createLineElement(question, name);
            } else if (["oneList", "severalList"].includes(question.type.name)) {
                element = this.createChoiceElement(question, name);
            } else {
                console.log("unknown question type: " + question.type.name)
            }

            element.prepend(this.createQuestionNumber(i));

            form.append(element);

            i++;
        }
    }

    addCode() {
        let i = 0
        for (const question of quizParser.quizData.questionVms) {
            i++;
            if (!codeTypes.includes(question.type.name))
                continue;

            const codeMirrorOptions = {
                mode: question.type.name,
                lineNumbers: true,
                indentUnit: 4,
                matchBrackets: true,
                theme: 'eclipse',
                extraKeys: { "Tab": "insertSoftTab" }
            };

            let textarea = document.getElementsByName("q" + i)[0];
            textarea.CodeMirror = CodeMirror.fromTextArea(textarea, codeMirrorOptions);
            textarea.CodeMirror.setSize("100%", "100%");
            textarea.required = false; // TODO: workaround, cannot set code field to be required
        }
    }

    createQuestionNumber(i) {
        const div = document.createElement("h2");
        div.className = "question-number";
        div.textContent = "Вопрос №" + i;
        return div;
    }

    createHeader() {
        const div = document.createElement("div");
        div.className = "block";

        const h2 = document.createElement("h2");
        h2.innerHTML = this.quizData.title;
        h2.classList.add("quiz-title");
        h2.classList.add("quiz-title");

        const description = document.createElement("span");
        description.innerHTML = this.quizData.description;

        div.append(h2);
        div.append(description);

        return div;
    }

    createElementMainDiv(question) {
        const div = document.createElement("div");
        div.classList.add("element", "block", question.type.name);
        return div;
    }

    createElementDescription(question) {
        const header = document.createElement("div");
        header.classList.add("question-header");

        const e = document.createElement("div");
        e.className = "element-description";
        e.innerHTML = question.content;

        header.append(e);

        return header;
    }

    isRequired(question) {
        const required = question["required"];
        return required === undefined ? false : required;
    }

    createLineElement(question, questionName) {
        const div = this.createElementMainDiv(question);
        const label = document.createElement("label");
        const descriptionDiv = this.createElementDescription(question);

        let inputElement;

        if (question.type.name === "shortText") {
            inputElement = document.createElement("input");
            inputElement.type = "text";
        } else if (question.type.name === "longText"  || codeTypes.includes(question.type.name)) {
            inputElement = document.createElement("textarea");
        } else {
            console.log("unknown line type: " + question.type.name);
        }

        inputElement.classList.add("element-input", "any-element")
        inputElement.name = questionName;
        inputElement.required = this.isRequired(question);

        label.append(descriptionDiv);
        label.append(inputElement);

        div.append(label);

        return div;
    }

    createChoiceElement(question, questionName) {
        const div = this.createElementMainDiv(question);
        div.append(this.createElementDescription(question));

        for (const answer of question.options) {
            const choiceDiv = this.createOption(question, answer.content, questionName);
            div.append(choiceDiv);
        }

        return div;
    }

    createOption(question, answer, questionName) {
        const choiceDiv = document.createElement("div");
        choiceDiv.className = "element-choice";

        const label = document.createElement("label");
        const input = document.createElement("input");

        if (question.type.name === "oneList") {
            input.type = "radio";
            input.required = this.isRequired(question);
        } else if (question.type.name === "severalList") {
            input.type = "checkbox";
        } else {
            console.log("unknown question type when input.type: " + question.type.name);
        }

        input.className = "any-element"
        input.name = questionName;
        input.value = answer;

        label.append(input);
        label.append(answer);

        choiceDiv.append(label);

        return choiceDiv;
    }
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
    const startTime = new Date(quizData.startTime);
    const endTime = new Date(quizData.endTime);

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


function getUserAnswers() {
    const questions = []
    const questionCount = document.querySelectorAll(".element").length;

    for (let i = 1; i <= questionCount; i++) {
        const nodes = document.getElementsByName("q" + i);

        const e = {
            id: quizData.questionVms[i - 1].id,
            answers: []
        };

        if (nodes.length === 1) {
            let value;
            if (codeTypes.includes(quizData.questionVms[i - 1].type.name))
                value = nodes[0].CodeMirror.getValue();
            else
                value = nodes[0].value;

            e.answers.push({
                content: value
            });
        }
        else {
            for (const q of nodes) {
                if (q.checked) {
                    const value = q.value;
                    e.answers.push({
                        content: value
                    });
                }
            }
        }

        questions.push(e);
    }
    console.log(JSON.stringify(questions));

    return questions;
}

async function sendAnswers(answers) {
    const data = {
        quizGroupId: quizId,
        userLogin: userId,
        questions: getUserAnswers()
    };

    await fetch('http://localhost:8080/db/apiRequest', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({method: "quiz/createUserQuiz", data: data})
    });
}

let mainPageButton = document.querySelector('#main-page-button');
mainPageButton.addEventListener('click', () => window.location.href = 'http://localhost:8080/');

let sendAnswersButton = document.querySelector('#send-answers-button');
sendAnswersButton.addEventListener('click', submitClicked);