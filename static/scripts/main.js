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
        data =
            {
                "groupVm1": {
                    "id": 1,
                    "name": "Контора",
                    "isAdmin": false,
                    "quizVms": [
                        {
                            "id": 1,
                            "finished": false,
                            "name": "Пятиминутка №15",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                        {
                            "id": 2,
                            "finished": false,
                            "name": "Пятиминутка №228",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+00:00",
                        }
                    ]
                },
                "groupVm2": {
                    "id": 1,
                    "name": "Контора2",
                    "isAdmin": true,
                    "quizVms": [
                        {
                            "id": 1,
                            "finished": false,
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
                            "finished": true,
                            "name": "Пятиминутка №15",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
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
                            "id": 1,
                            "finished": false,
                            "name": "Моя первая пятиминутка",
                            "description": "Пятиминутка ни о чём",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
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
        let group = new ActiveGroupBlockDiv(currentGroup.name);
        group.hide();
        for (let quizKey in currentGroup.quizVms) {
            let activeQuiz = currentGroup.quizVms[quizKey];
            if (activeQuiz.finished !== null)
                continue;
            let startTime = new Date(activeQuiz.startTime);
            let endTime = new Date(activeQuiz.endTime);

            if (startTime > Date.now() || endTime < Date.now())
                continue;

            group.addActiveQuiz(activeQuiz.name,
                endTime,
                activeQuiz.id);
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
        if (currentGroup['isAdmin']) {

        } else {
            let group = new GroupBlockDiv(currentGroup.name);
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


function formatedDate(date) {
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


class ActiveGroupBlockDiv extends CustomDOMElement {
    constructor(groupName) {
        super('div').withClass('block');
        this.appendChild(new GroupHeaderDiv(groupName));
        this.activeCount = 0;
    }

    addActiveQuiz(header, endTime, quizId) {
        this.appendChild(new ActiveQuizBtn(header, endTime, quizId));
        this.activeCount++;
    }
}


class GroupBlockDiv extends ActiveGroupBlockDiv {
    constructor(groupName) {
        super(groupName);
    }

    addScheduledQuiz(header, startTime) {
        this.appendChild(new ScheduledQuizDiv(header, startTime));
    }

    addEndedQuiz(header, endTime) {
        this.appendChild(new EndedQuizDiv(header, endTime));
    }

    addFinishedQuiz(header, score, finishTime) {
        this.appendChild(new FinishedQuizDiv(header, score, finishTime));
    }
}

class GroupHeaderDiv extends CustomDOMElement {
    constructor(headerText) {
        super('div').withClass('group-name');
        let h2 = new CustomDOMElement('h2').withContent(headerText);
        let hr = new CustomDOMElement('hr');
        this.appendChild(h2);
        this.appendChild(hr);
    }
}


class FinishedQuizDiv extends CustomDOMElement {
    constructor(header, score, finishTime, groupName=null) {
        super().withClass('quiz-info').withClass('ended-quiz');
        this.finishTime = finishTime;
        this.score = score;
        let name = new CustomDOMElement('label')
            .withClass('quiz-name');
        if (groupName !== null) {
            name.withContent(`${groupName}: ${header}`);
        } else {
            name.withContent(`${header}`);
        }

        let mark = new CustomDOMElement('label')
            .withClass('quiz-mark')
            .withContent((score === null) ? 'Нет оценки' : `Балл: ${score}`);

        let finish = new CustomDOMElement('label')
            .withClass('quiz-end-time')
            .withContent(`Выполнен: ${formatedDate(finishTime)}`);


        this.appendChild(name);
        this.appendChild(mark);
        this.appendChild(finish);
    }
}


class ActiveQuizBtn extends CustomDOMElement {
    constructor(header, endTime, quizId) {
        super('button').withClass('quiz-info').withClass('active-quiz');
        let name = new CustomDOMElement('label')
            .withClass('quiz-name')
            .withContent(header);
        let end = new CustomDOMElement('label')
            .withClass('quiz-end-time')
            .withContent(`Завершится: ${formatedDate(endTime)}`);
        this.addEvent('click',
            () => window.location.href = `http://localhost:8080/quiz/solve/${quizId}`);
        this.appendChild(name);
        this.appendChild(end);
    }
}


class ScheduledQuizDiv extends CustomDOMElement {
    constructor(header, startTime) {
        super('div').withClass('quiz-info').withClass('scheduled-quiz');
        this.startTime = startTime;
        let name = new CustomDOMElement('label')
            .withClass('quiz-name')
            .withContent(header);
        let scheduled = new CustomDOMElement('label')
            .withClass('quiz-end-time')
            .withContent(`Запланирован: ${formatedDate(startTime)}`);

        this.appendChild(name);
        this.appendChild(scheduled);
    }

}


class EndedQuizDiv extends CustomDOMElement {
    constructor(header, endTime) {
        super('div').withClass('quiz-info');
        let name = new CustomDOMElement('label')
            .withClass('quiz-name')
            .withContent(header);
        let end = new CustomDOMElement('label')
            .withClass('quiz-end-time')
            .withContent(`Завершён: ${formatedDate(endTime)}`);

        this.appendChild(name);
        this.appendChild(end);
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