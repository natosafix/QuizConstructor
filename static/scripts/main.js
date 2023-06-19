const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const dateTimeOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: userTimeZone
};

let data;

document.addEventListener('DOMContentLoaded', async function(event) {
    try {
        /*let response = await fetch('http://localhost:8080/db/apiRequest?' + new URLSearchParams({method: "mainPage"}), {
            method: 'GET',
        });
        data = await response.json();*/
        data = {
            "groupVm1": {
                "id": 1,
                "name": "Контора",
                "isAdmin": false,
                "quizVms": [
                    {
                        "id": 1,
                        "finished": null,
                        "name": "Пятиминутка №15",
                        "description": "Пятиминутка о вёрстке и стилях",
                        "score": 0,
                        "startTime" : "2019-07-26T12:43:23+05:00",
                        "endTime" : "2025-07-26T12:43:23+05:00",
                    },
                    {
                        "id": 2,
                        "finished": null,
                        "name": "Пятиминутка №228",
                        "description": "Пятиминутка",
                        "score": 0,
                        "startTime" : "2019-07-26T12:43:23+05:00",
                        "endTime" : "2025-07-26T12:43:23+00:00",
                    },
                    {
                        "id": 3,
                        "finished": null,
                        "name": "Вы гей? №322",
                        "description": "",
                        "score": 0,
                        "startTime" : "2019-07-26T12:43:23+05:00",
                        "endTime" : "2020-07-26T12:43:23+00:00",
                    },
                    {
                        "id": 4,
                        "finished": '2020-07-26T12:43:23+05:00',
                        "name": "Двухминутка №1337",
                        "description": "очевидно да",
                        "score": 3.81,
                        "startTime" : "2019-07-26T12:43:23+05:00",
                        "endTime" : "2021-07-26T12:43:23+00:00",
                    },
                    {
                        "id": 5,
                        "finished": '2020-07-26T12:43:23+05:00',
                        "name": "Лох с нулём",
                        "description": "Лох с нулём",
                        "score": 0,
                        "startTime" : "2019-07-26T12:43:23+05:00",
                        "endTime" : "2025-07-26T12:43:23+00:00",
                    }]
            },
            "groupVm2": {
                "id": 1,
                "name": "Контора2",
                "isAdmin": true,
                "quizVms": [
                    {
                        "id": 1,
                        "finished": null,
                        "name": "Пятиминутка №15",
                        "description": "Пятиминутка о вёрстке и стилях",
                        "score": 0,
                        "startTime" : "2019-07-26T12:43:23+05:00",
                        "endTime" : "2025-07-26T12:43:23+05:00",
                    },
                ]
            },
            "groupVm3": {
                "id": 1,
                "name": "Контора3",
                "isAdmin": false,
                "quizVms": [
                    {
                        "id": 1,
                        "finished": "2021-07-26T12:43:23+05:00",
                        "name": "Пятиминутка №15",
                        "description": "Пятиминутка о вёрстке и стилях",
                        "score": 2,
                        "startTime" : "2019-07-26T12:43:23+05:00",
                        "endTime" : "2025-07-26T12:43:23+05:00",
                    },
                    {
                        "id": 7,
                        "finished": "2022-07-26T12:43:23+05:00",
                        "name": "Помидор без оценки",
                        "description": "Пятиминутка о вёрстке и стилях",
                        "score": null,
                        "startTime" : "2019-07-26T12:43:23+05:00",
                        "endTime" : "2025-07-26T12:43:23+05:00",
                    },
                ]
            },
            "groupVm4": {
                "id": 1,
                "name": "Контора4",
                "isAdmin": false,
                "quizVms": [
                    {
                        "id": 8,
                        "finished": null,
                        "name": "Моя первая пятиминутка",
                        "description": "Пятиминутка ни о чём",
                        "score": 0,
                        "startTime" : "2019-07-26T12:43:23+05:00",
                        "endTime" : "2025-07-26T12:43:23+05:00",
                    },
                    {
                        "id": 9,
                        "finished": null,
                        "name": "Никогда не настанет",
                        "description": "Пятиминутка ни о чём",
                        "score": 0,
                        "startTime" : "2024-07-26T12:43:23+05:00",
                        "endTime" : "2025-07-26T12:43:23+05:00",
                    },
                ]
            }
        }
        console.log(data);

        buildPage();

    } catch (e) {
        console.log(e);
    }
});

function buildPage() {
    fillActiveQuizzes();
    fillEndedQuizzes();
    fillGroupsPage();
}

function fillActiveQuizzes() {
    let activePaste = document.querySelector('#active-paste-place');

    for (let groupKey in data) {
        let currentGroup = data[groupKey];
        if (currentGroup['isAdmin'])
            continue;
        let group = new GroupBlockDiv(currentGroup.name);
        group.hide();
        for (let quizKey in currentGroup.quizVms) {
            let activeQuiz = currentGroup.quizVms[quizKey];
            if (activeQuiz.finished !== null)
                continue;
            let startTime = new Date(activeQuiz.startTime);
            let endTime = new Date(activeQuiz.endTime);

            if (startTime > Date.now() || endTime < Date.now())
                continue;

            group.addActiveQuiz(activeQuiz.name, endTime, activeQuiz.id);
        }
        if (group.activeCount > 0) {
            activePaste.appendChild(group.element);
            group.show();
        } else {
            group.remove();
        }
    }
}

function fillEndedQuizzes() {
    let endedPaste = document.querySelector('#ended-paste-place');
    let quizzes = [];

    for (let groupKey in data) {
        let currentGroup = data[groupKey];
        if (currentGroup['isAdmin'])
            continue;

        for (let quizKey in currentGroup.quizVms) {
            let finished = currentGroup.quizVms[quizKey];
            if (finished.finished === null)
                continue;

            let finishedTime = new Date(finished.finished);
            let finishedDiv = new FinishedQuizDiv(finished.name,
                finished.score, finishedTime, currentGroup.name);
            finishedDiv.hide();
            quizzes.push(finishedDiv);
        }
    }

    quizzes.sort((a, b) => {
        if (a.finishTime < b.finishTime) {
            return -1;
        }
        if (a.finishTime > b.finishTime) {
            return 1;
        }
        return 0;
    });

    for (let i of quizzes) {
        endedPaste.appendChild(i.element);
        i.show();
    }
}

function fillGroupsPage() {
    let pastePlace = document.querySelector('#groups-paste-place');

    for (let groupKey in data) {
        let currentGroup = data[groupKey];
        let group = new GroupBlockDiv(currentGroup.name);
        if (currentGroup['isAdmin']) {

        } else {
            for (let quizKey in currentGroup.quizVms) {
                let currentQuiz = currentGroup.quizVms[quizKey];
                let finishedTime = new Date(currentQuiz.finished);
                if (currentQuiz.finished !== null) {
                    group.addFinishedQuiz(currentQuiz.name, currentQuiz.score, finishedTime);
                    continue;
                }
                let startTime = new Date(currentQuiz.startTime);
                if (startTime > Date.now()) {
                    group.addScheduledQuiz(currentQuiz.name, startTime);
                    continue;
                }
                let endTime = new Date(currentQuiz.endTime);
                if (endTime < Date.now()) {
                    group.addEndedQuiz(currentQuiz.name, endTime);
                    continue;
                }
                group.addActiveQuiz(currentQuiz.name, endTime, currentQuiz.id);
            }

            pastePlace.appendChild(group.element);
        }
    }
}


function getFormatDateStr(date) {
    return date.toLocaleString('ru-RU', dateTimeOptions);
}


class CustomDOMElement {
    constructor(tag) {
        this.element = document.createElement(tag);
        this._displayStyle = 'block';
    }

    hide() {
        this._displayStyle = this.element.style.display;
        this.element.style.display = 'none';
    }

    show() {
        this.element.style.display = this._displayStyle;
    }

    remove() {
        this.element.remove();
    }

    withClass(className) {
        this.element.classList.add(className);
        return this;
    }

    withContent(content) {
        this.element.textContent = content;
        return this;
    }

    appendChild(child) {
        if (child instanceof CustomDOMElement) {
            this.element.appendChild(child.element);
        } else {
            this.element.appendChild(child);
        }
    }

    removeChild(child) {
        if (child instanceof CustomDOMElement) {
            this.element.removeChild(child.element);
        }
        else {
            this.element.removeChild(child);
        }
    }

    addEvent(type, handler) {
        this.element.addEventListener(type, handler);
    }
}


class GroupBlockDiv extends CustomDOMElement {
    constructor(groupName, isAdmin=false) {
        super('div').withClass('block')
        this.isAdmin = isAdmin;
        this.appendChild(new GroupHeaderDiv(groupName, this.isAdmin));

        this.clampedDiv = new CustomDOMElement('div').withClass('clamped-info');
        this.appendChild(this.clampedDiv);
        this.activeCount = 0;
    }

    _addQuiz(quiz) {
        this.clampedDiv.appendChild(quiz);
    }

    addActiveQuiz(header, endTime, quizId) {
        this._addQuiz(new ActiveQuizBtn(header, endTime, quizId));
        this.activeCount++;
    }

    addScheduledQuiz(header, startTime) {
        this._addQuiz(new ScheduledQuizDiv(header, startTime));
    }

    addEndedQuiz(header, endTime) {
        this._addQuiz(new EndedQuizDiv(header, endTime, this.isAdmin));
    }

    addFinishedQuiz(header, score, finishTime) {
        this._addQuiz(new FinishedQuizDiv(header, score, finishTime));
    }
}


class GroupHeaderDiv extends CustomDOMElement {
    constructor(headerText, isAdmin=false) {
        super('div').withClass('group-name');
        let h2 = new CustomDOMElement('h2').withContent(headerText);
        let hr = new CustomDOMElement('hr');
        this.appendChild(h2);
        this.appendChild(hr);

        if (isAdmin) {
            this.appendChild(new CustomDOMElement('button').withContent('settings'));
        }
    }
}


class BaseQuiz extends CustomDOMElement {
    constructor(tag) {
        super(tag).withClass('quiz-info');
    }

    withHeader(header) {
        let name = new CustomDOMElement('label')
            .withClass('quiz-name')
            .withContent(header);
        this.appendChild(name);
        return this;
    }

    withCheckBtn() {
        let check = new CustomDOMElement('a').withClass().withContent('Посмотреть ответы');
        check.href = ''; // TODO
        this.appendChild(check);
        return this;
    }

    withMark(score) {
        let mark = new CustomDOMElement('label')
            .withClass('quiz-mark')
            .withContent((score === null) ? 'Нет оценки' : `Балл: ${score}`);
        this.appendChild(mark);
        return this;
    }

    withTime(time, text) {
        let end = new CustomDOMElement('label')
            .withClass('quiz-end-time')
            .withContent(`${text}: ${getFormatDateStr(time)}`);
        this.appendChild(end);
        return this;
    }
}


class FinishedQuizDiv extends BaseQuiz {
    constructor(header, score, finishTime, groupName=null) {
        super('div').withClass('ended-quiz');
        if (groupName !== null) {
            this.withHeader(`${groupName}: ${header}`);
        } else {
            this.withHeader(`${header}`);
        }
        this.withMark(score).withTime(finishTime, 'Выполнен');
    }
}


class ActiveQuizBtn extends BaseQuiz {
    constructor(header, endTime, quizId, isAdmin=false) {
        super(isAdmin ? 'div' : 'button').withHeader(header).withTime(endTime, 'Завершится');
        if (!isAdmin) {
            this.addEvent('click',
                () => window.location.href = `http://localhost:8080/quiz/solve/${quizId}`);
        }
    }
}


class ScheduledQuizDiv extends BaseQuiz {
    constructor(header, startTime) {
        super('div').withHeader(header).withTime(startTime, 'Запланирован');
        this.startTime = startTime;
    }
}


class EndedQuizDiv extends BaseQuiz {
    constructor(header, endTime, isAdmin=false) {
        super('div').withHeader(header);
        if (isAdmin) {
            this.withCheckBtn();
        }
        this.withTime(endTime, 'Завершён');
    }
}







class ButtonsGroupHandler {
    constructor(buttonsHandlers) {
        this.buttonsHandlers = buttonsHandlers;
        for (let buttonHandler of this.buttonsHandlers) {
            buttonHandler.button.addEventListener('click', () => this.onClick(buttonHandler), false);
        }
    }

    onClick(buttonHandler) {
        console.log(1);
        for (let buttonHandler of this.buttonsHandlers) {
            buttonHandler.setInactive();
        }

        buttonHandler.setActive();
    }
}

class NavButton {
    constructor(button) {
        this.button = button;
        let pageId = button.id.replace('btn', 'page');
        this.matchDiv = document.querySelector(`#${pageId}`);
    }

    setActive() {
        this.button.classList.remove('inactive');
        this.button.classList.add('active');
        this.matchDiv.style.display = 'block';
    }

    setInactive() {
        this.button.classList.remove('active');
        this.button.classList.add('inactive');
        this.matchDiv.style.display = 'none';
    }
}

const navButtons = document.querySelectorAll('.nav-button');
let navButtonsHandler = [];
for (let navButton of navButtons) {
    navButtonsHandler.push(new NavButton(navButton));
}
const navButtonsGroup = new ButtonsGroupHandler(navButtonsHandler);


const groupsNavButtons = document.querySelectorAll('.groups-quiz-nav-button');
let groupsNavButtonsHandlers = [];
for (let navButton of groupsNavButtons) {
    groupsNavButtonsHandlers.push(new NavButton(navButton));
}
const groupsNavButtonsGroup = new ButtonsGroupHandler(groupsNavButtonsHandlers);

document.querySelector('.auth-login-button').addEventListener('click', logOut);

function logOut() {
    CookieChanger.deleteCookie('auth');
    window.location.href = "http://localhost:8080/login";
}

class CookieChanger {
    static setCookie(name, value, options = {}) {

        options = {
            path: '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    static deleteCookie(name) {
        CookieChanger.setCookie(name, "", {
            'max-age': -1
        })
    }
}

function planQuizPressed() {
    const values =  Array.from(document.querySelectorAll("#chosenGroups option:checked")).map(e => e.value);
    console.log(values);
}