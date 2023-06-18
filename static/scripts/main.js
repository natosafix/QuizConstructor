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
    let activePaste = document.querySelector('#active-paste-place');

    for (let groupKey in data) {
        let currentGroup = data[groupKey];
        if (currentGroup['isAdmin'])
            continue;
        let group = new ActiveGroupBlockDiv(currentGroup.name);
        group.hide();
        for (let quizKey in currentGroup.quizVms) {
            let activeQuiz = currentGroup.quizVms[quizKey];
            if (activeQuiz.finished)
                continue;
            let startTime = new Date(activeQuiz.startTime);
            let endTime = new Date(activeQuiz.endTime);

            if (startTime > Date.now() || endTime < Date.now())
                continue;

            group.addActiveQuiz(activeQuiz.name, endTime.toLocaleString('ru-RU', dateTimeOptions),
                currentGroup.id, activeQuiz.id);
        }
        if (group.activeCount > 0) {
            activePaste.appendChild(group.element);
            group.show();
        } else {
            group.remove();
        }
    }
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
    constructor(headerText) {
        super('div').withClass('block');
        this.appendChild(new GroupHeaderDiv(headerText));
        this.activeCount = 0;
    }

    addActiveQuiz(header, endTime, groupId, quizId) {
        this.appendChild(new ActiveQuizBtn(header, endTime, groupId, quizId));
        this.activeCount++;
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

class ActiveQuizBtn extends CustomDOMElement {
    constructor(header, endTime, groupId, quizId) {
        super('button').withClass('quiz-info').withClass('active-quiz');
        let name = new CustomDOMElement('label').withClass('quiz-name').withContent(header);
        let end = new CustomDOMElement('label')
            .withClass('quiz-end-time')
            .withContent(`Завершится: ${endTime}`);
        this.addEvent('click', () => window.location.href = `http://localhost:8080/quiz/solve/${groupId}_${quizId}`);
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