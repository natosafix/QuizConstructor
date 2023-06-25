function getQuizDataForOwner() {
    return {
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
                options: [
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
                correctOptions: [
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
                options: [
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
                correctOptions: [
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
                options: null,
                correctOptions: [
                    {
                        content: "говно",
                        id: 1012 // id ответа в бд
                    },
                ],
                isAutoCheck: true
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
                options: null,
                correctOptions: null,
                isAutoCheck: false
            },
            {
                content: "Напишите ядро линукса",
                id: 126, // id вопроса в бд
                type: {
                    typeId: 3,
                    name: "javascript"
                },
                required: true,
                maxScore: 5,
                options: null,
                correctOptions: null,
                isAutoCheck: false
            }
        ]
    };
}

const codeTypes = ['javascript', 'xml', 'css'];
const questionType2Id = {'shortText': 1, 'longText': 2, 'javascript': 3, 'oneList': 4, 'severalList': 5, 'xml': 6, 'css': 7};
const id2QuestionType = {1: 'shortText', 2: 'longText', 3: 'javascript', 4: 'oneList', 5: 'severalList', 6: 'xml', 7: 'css'};

class QuizParser {
    constructor(quizData) {
        this.quizData = quizData
    }

    addCode() {
        let i = 0
        for (const question of quizParser.quizData.questions) {
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

    parse() {
        const form = document.createElement("form");
        form.id = "myForm";
        form.addEventListener("submit", (event) => event.preventDefault());

        document.querySelector("main").prepend(form);

        form.append(this.createHeader());

        let i = 1;
        for (const question of this.quizData.questions) {
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
        } else if (question.type.name === "longText" || codeTypes.includes(question.type.name)) {
            inputElement = document.createElement("textarea");
        } else {
            console.log("unknown line type: " + question.type.name);
        }

        inputElement.classList.add("element-input", "any-element")
        inputElement.name = questionName;
        inputElement.required = this.isRequired(question);

        label.append(descriptionDiv);

        if (question.correctOptions !== null) {
            const correctAnswer = document.createElement("div");
            correctAnswer.className = "element-correct-answer";
            correctAnswer.innerHTML = question.correctOptions[0].content;
            label.append(correctAnswer)
        }

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

        input.classList.add("any-element");
        if (question.correctOptions !== null) {
            for (const e of question.correctOptions)
                if (e.content === answer) {
                    input.classList.add("correct-option");
                    break;
                }
        }

        input.name = questionName;
        input.value = answer;

        label.append(input);
        label.append(answer);

        choiceDiv.append(label);

        return choiceDiv;
    }
}

const quizData = getQuizDataForOwner();
const quizParser = new QuizParser(quizData);

quizParser.parse();

function addCodeMirror() {
    quizParser.addCode();
}


class AnswerGetter {
    constructor() {
        this.i = 0;
        this.getAllAnswerIds();
    }

    getAllAnswerIds() {
        // брать инфу с сервера

        this.answerIds = [0, 1, 2]; // мок
        this.answersCount = this.answerIds.length;
    }

    getNext() {
        if (this.i === this.answersCount - 1)
            return null;

        return this.getAnswers(this.answerIds[++this.i]);
    }

    getPrev() {
        if (this.i === 0)
            return null;

        return this.getAnswers(this.answerIds[--this.i]);
    }

    getAnswers(answerId) {
        // звонить на сервер и вызывать соответствующие ответы c id == answerId
        // ниже мок

        return [
            {
                id: 11,
                name: "Полный Попуск", // так надо было тиму назвать кста
                questions: [
                    {
                        score: 0,
                        answers: [
                            {
                                content: "числ",
                                id: 123 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 1,
                        answers: [
                            {
                                content: "Срань",
                                id: 96 // id ответа в бд
                            },
                            {
                                content: "язык",
                                id: 96 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "JS - говно",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "Матвей полный леха и точка я сказал",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "function yes() {" +
                                    "return 0;" +
                                    "}",
                                id: 32 // id ответа в бд
                            }
                        ]
                    }
                ]
            },
            { // тут должен вызываться getAnswers с новыми ответами
                id: 22,
                name: "Мэтью Алексеевич",
                questions: [
                    {
                        score: 0,
                        answers: [
                            {
                                content: "глагол",
                                id: 123 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 1,
                        answers: [
                            {
                                content: "язык",
                                id: 96 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "Мой любимый язык",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "Это очевидно",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: 'console.log("hello valera")',
                                id: 32 // id ответа в бд
                            }
                        ]
                    }
                ]
            },
            { // тут должен вызываться getAnswers с новыми ответами
                id: 33,
                name: "Жээс Говнович",
                questions: [
                    {
                        score: 0,
                        answers: [
                            {
                                content: "сущ",
                                id: 123 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 1,
                        answers: [
                            {
                                content: "гавна",
                                id: 96 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "Да",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "Сам пиши",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: 'const five = 2 + 2',
                                id: 32 // id ответа в бд
                            }
                        ]
                    }
                ]
            }
        ][answerId];
    }

    getById(answerId) {
        const copiedFromAbove = [
            {
                id: 11,
                name: "Полный Попуск", // так надо было тиму назвать кста
                questions: [
                    {
                        score: 0,
                        answers: [
                            {
                                content: "числ",
                                id: 123 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 1,
                        answers: [
                            {
                                content: "Срань",
                                id: 96 // id ответа в бд
                            },
                            {
                                content: "язык",
                                id: 96 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "JS - говно",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "Матвей полный леха и точка я сказал",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "function yes() {" +
                                    "return 0;" +
                                    "}",
                                id: 32 // id ответа в бд
                            }
                        ]
                    }
                ]
            },
            { // тут должен вызываться getAnswers с новыми ответами
                id: 22,
                name: "Мэтью Алексеевич",
                questions: [
                    {
                        score: 0,
                        answers: [
                            {
                                content: "глагол",
                                id: 123 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 1,
                        answers: [
                            {
                                content: "язык",
                                id: 96 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "Мой любимый язык",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "Это очевидно",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: 'console.log("hello valera")',
                                id: 32 // id ответа в бд
                            }
                        ]
                    }
                ]
            },
            { // тут должен вызываться getAnswers с новыми ответами
                id: 33,
                name: "Жээс Говнович",
                questions: [
                    {
                        score: 0,
                        answers: [
                            {
                                content: "сущ",
                                id: 123 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 1,
                        answers: [
                            {
                                content: "гавна",
                                id: 96 // id ответа в бд
                            }
                        ],
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "Да",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: "Сам пиши",
                                id: 32 // id ответа в бд
                            }
                        ]
                    },
                    {
                        score: 0,
                        answers: [
                            {
                                content: 'const five = 2 + 2',
                                id: 32 // id ответа в бд
                            }
                        ]
                    }
                ]
            }
        ];

        let i = 0;
        for (const e of copiedFromAbove) {
            if (answerId === e.id) {
                this.i = i;
                return e;
            }
            i++;
        }
    }
}

let answerGetter;
let answersJson;

function checkedStart() {
    answerGetter = new AnswerGetter();
    answersJson = answerGetter.getAnswers(0);
    addElements();
    fillResultsTable();
}

function addElements() {
    addName();
    addCheckingElements();
    updateCurrentScore();
    setMaxScore();
    addCodeMirror();
}

function addName() {
    const container = document.createElement("div");
    container.className = "name-container";
    container.innerText = "Заполнил: ";

    const div = document.createElement("div");
    div.className = "name";
    div.innerText = answersJson.name;

    container.append(div);

    document.querySelector("#myForm h2").before(container);
}

function addCheckingElements() {
    let i = 0;
    for (const element of document.querySelectorAll(".element")) {
        if (element.classList.contains("image"))
            continue;

        if (quizData.questions[i].isAutoCheck)
            addAutocheck(element);

        for (const input of element.querySelectorAll(".any-element")) {
            input.disabled = true;

            const allAnswers = answersJson.questions[i].answers.map(x => x.content);

            if (["radio", "checkbox"].includes(input.type))
                input.checked = allAnswers.includes(input.value);
            else
                input.value = allAnswers[0];
        }

        element.append(createCounter(i));

        i++;
    }
}

function createCounter(i) {
    const div = document.createElement("div");
    div.classList.add("score-container");

    const display = document.createElement("div");
    display.classList.add("quantity");
    display.innerText = answersJson.questions[i].score;

    const buttonUp = document.createElement("button");
    buttonUp.classList.add("counter");
    buttonUp.type = "button";

    const buttonDown = buttonUp.cloneNode()

    buttonUp.classList.add("bt_plus");
    buttonUp.innerHTML = "<svg viewBox=\"0 0 24 24\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line></svg>";

    buttonDown.classList.add("bt_minus");
    buttonDown.innerHTML = "<svg viewBox=\"0 0 24 24\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line></svg>";

    const maxScore = quizData.questions[i].maxScore;

    buttonUp.addEventListener("click", () => {
        const e = div.querySelector(".quantity");
        const prev = +e.innerText;
        if (prev === maxScore)
            return;
        e.innerHTML = (prev + 1).toString();
        updateCurrentScore();
    });

    buttonDown.addEventListener("click", () => {
        const e = div.querySelector(".quantity");
        const prev = +e.innerText;
        if (prev === 0)
            return;
        e.innerHTML = (prev - 1).toString();
        updateCurrentScore();
    });

    const maxPoints = document.createElement("div");
    maxPoints.classList.add("max-points");
    maxPoints.innerText = "/" + maxScore;

    div.append(buttonDown, display, buttonUp, maxPoints);

    return div;
}

function addAutocheck(elem) {
    const autocheck = document.createElement("div");
    autocheck.classList.add("autocheck");
    autocheck.innerText = "Автопроверено";

    elem.querySelector(".question-header").append(autocheck);
}

function getCurrentScore() {
    let score = 0;
    for (const elem of document.querySelectorAll(".quantity")) {
        score += +elem.innerText;
    }
    return score;
}

function updateCurrentScore() {
    document.getElementById("current-score").innerText = getCurrentScore().toString();
}

function setMaxScore() {
    const maxScore = quizData.questions.map(x => x.maxScore).reduce((prev, cur) => prev + cur);
    document.getElementById("max-score").innerText = "/" + maxScore.toString();
}

function nextPressed() {
    answersJson = answerGetter.getNext();
    adjustNextPrevButtons();
    redrawWithNewAnswers();
}

function previousPressed() {
    answersJson = answerGetter.getPrev();
    adjustNextPrevButtons();
    redrawWithNewAnswers();
}

function redrawWithNewAnswers() {
    document.querySelector("#myForm").remove();
    quizParser.parse();
    addElements();
}

function adjustNextPrevButtons() {
    document.querySelector("#prev-button").style.visibility = "visible";
    document.querySelector("#next-button").style.visibility = "visible";
    if (answerGetter.i === 0)
        document.querySelector("#prev-button").style.visibility = "hidden";
    if (answerGetter.i === answerGetter.answersCount - 1)
        document.querySelector("#next-button").style.visibility = "hidden";
}

function savePressed() {
    // TODO: send to egorable
    const q = collectCheckedAnswers();

    // addScoreToTable(document.querySelector(".quiz-filler-name").innerText, getCurrentScore()); // TODO: add third argument
}

function collectCheckedAnswers() {
    let i = 0;
    const points = [];
    for (const quantity of document.querySelectorAll(".quantity")) {
        points.push({
            questionId: quizData.questions[i].id,
            score: +quantity.innerText
        });
        i++;
    }

    return {
        id: answersJson.id,
        points: points
    };
}



function fillResultsTable() {
    const data = getScoresFromDB();

    for (const e of data) {
        addScoreToTable(e.name, e.answerId, e.score);
    }
}

function getScoresFromDB() {
    return [
        {
            name: "Полный Попуск",
            answerId: 11,
            score: 76
        },
        {
            name: "Мэтью Алексеевич",
            answerId: 22,
            score: 40
        },
        {
            name: "Жээс Говнович",
            answerId: 33,
            score: 40
        }
    ];
}

function addScoreToTable(name, answerId, score) {
    function createCol(text) {
        const col = document.createElement("td");
        col.innerText = text;
        return col;
    }

    const table = document.querySelector(".results-table table");
    const row = document.createElement("tr");

    const nameCol = createCol(name);
    nameCol.className = "table__name";
    nameCol.setAttribute("answerId", answerId);
    nameCol.addEventListener("click", tableNamePressed);

    row.append(nameCol, createCol(score));

    table.append(row);
}

function tableNamePressed(event) {
    const answerId = +event.target.getAttribute("answerId");
    answersJson = answerGetter.getById(answerId);
    adjustNextPrevButtons();
    redrawWithNewAnswers();
}



function setUpQuizHtml() {
    let mainPageButton = document.querySelector('#main-page-button');
    mainPageButton.addEventListener('click', () => window.location.href = 'http://localhost:8080/');

    let sendAnswersButton = document.querySelector('#send-answers-button');
    sendAnswersButton.addEventListener('click', submitClicked);

    setTimer();

    document.addEventListener('DOMContentLoaded', addCodeMirror);
}

let timer;

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
    await sendAnswers(getUsersAnswers());
}

async function submitClicked() {
    if (document.querySelector("form").checkValidity()) {
        timer.stopTimer();
        await quizFinished();
    }
}

function getUsersAnswers() {
    const questions = []
    const questionCount = document.querySelectorAll(".element").length;

    for (let i = 1; i <= questionCount; i++) {
        const nodes = document.getElementsByName("q" + i);

        const e = {
            id: quizData.questions[i - 1].id,
            answers: []
        };

        if (nodes.length === 1) {
            let value;
            if (codeTypes.includes(quizData.questions[i - 1].type.name))
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

    return {
        quizGroupId: quizData.id,
        userLogin: "", //TODO
        questions: questions
    };
}

async function sendAnswers(answers) {
    const response = await fetch('http://localhost:8080/db/apiRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({method: "saveAnswers", data: answers})
    });
}