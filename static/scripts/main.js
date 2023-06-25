const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const prevPage = document.querySelector("#prevPage").textContent;

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
let adminQuizzesData;
let adminQuizzes = [];
let planModalWindow;
let createGroupModalWindow;
let adminGroupId2Name = {};
const overlay = document.querySelector('.js-overlay-modal');

// Закрытие модального окна на бэкгрануд
overlay.addEventListener('click', function () {
    planModalWindow.hide();
    createGroupModalWindow.hide();
});

// Закрытие модального окна на ESC
document.body.addEventListener('keyup', function (e) {
    const key = e.keyCode;
    if (key === 27) {
        planModalWindow.hide();
        createGroupModalWindow.hide();
    }
}, false);


const user = document.querySelector('.auth-signup-button').textContent;
document.addEventListener('DOMContentLoaded', async function(event) {
    try {
        let response = await fetch('http://localhost:8080/db/apiRequest?' + new URLSearchParams(
            {
                method: "group/getGroups",
                data: JSON.stringify({login: user})
            }),
            {
                method: 'GET',
            });
        data = await response.json();
        /*data = {
            "groups": [
                {
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
                {
                    "id": 2,
                    "name": "Контора2",
                    "isAdmin": true,
                    "quizVms": [
                        {
                            "id": 6,
                            "finished": null,
                            "name": "Активная",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                        {
                            "id": 7,
                            "finished": null,
                            "name": "Актиwadsadwaвная",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                        {
                            "id": 8,
                            "finished": null,
                            "name": "Запланированная",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2024-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                        {
                            "id": 9,
                            "finished": null,
                            "name": "Закончилась",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2022-07-26T12:43:23+05:00",
                        },
                    ]
                },
                {
                    "id": 3,
                    "name": "Контора3",
                    "isAdmin": false,
                    "quizVms": [
                        {
                            "id": 10,
                            "finished": "2021-07-26T12:43:23+05:00",
                            "name": "Пятиминутка №15",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 2,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                        {
                            "id": 11,
                            "finished": "2022-07-26T12:43:23+05:00",
                            "name": "Помидор без оценки",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": null,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                    ]
                },
                {
                    "id": 4,
                    "name": "Контора4",
                    "isAdmin": false,
                    "quizVms": [
                        {
                            "id": 12,
                            "finished": null,
                            "name": "Моя первая пятиминутка",
                            "description": "Пятиминутка ни о чём",
                            "score": 0,
                            "startTime": "2019-07-26T12:43:23+05:00",
                            "endTime": "2025-07-26T12:43:23+05:00",
                        },
                        {
                            "id": 13,
                            "finished": null,
                            "name": "Никогда не настанет",
                            "description": "Пятиминутка ни о чём",
                            "score": 0,
                            "startTime": "2024-07-26T12:43:23+05:00",
                            "endTime": "2025-07-26T12:43:23+05:00",
                        },
                    ]
                },
                {
                    "id": 5,
                    "name": "Я здесь главный",
                    "isAdmin": true,
                    "quizVms": [
                    ]
                }
            ]
        }*/
        response = await fetch('http://localhost:8080/db/apiRequest?' + new URLSearchParams(
            {
                method: "quiz/getQuizzesByLogin",
                data: JSON.stringify({login: user})
            }),
            {
                method: 'GET',
            });
        adminQuizzes = await response.json();
        /*adminQuizzes = {
            "quizVms": [
                {
                    "id": 1,
                    "name": "Я админЯ админЯ админЯ админЯ админЯ админЯ админЯ админЯ админЯ админЯ админЯ админ",
                    "description": "Я нахуй не нужен"
                },
                {
                    "id": 2,
                    "name": "Опрос, который я создал",
                    "desctoption": "опять не нужен",
                },
            ]
        }*/

        for (let currentGroup of data) {
            if (currentGroup.isAdmin) {
                adminGroupId2Name[currentGroup.id] = currentGroup.name;
            }
        }
        planModalWindow = new PlanModalWindow(adminGroupId2Name);
        createGroupModalWindow = new GroupCreateModalWindow();
        document.querySelector("#plan-modal-window-paste-place").appendChild(planModalWindow.element);
        document.querySelector("#group-create-modal-window-paste-place").appendChild(createGroupModalWindow.element);
        document.querySelector("#group-create-modal-window-open-btn").addEventListener('click', () => createGroupModalWindow.show());

        buildPage();

    } catch (e) {
        console.log(e);
    }
});

function buildPage() {
    fillActiveQuizzes();
    fillEndedQuizzes();
    fillGroupsPage();
    fillAdminQuizzes();
}

function fillActiveQuizzes() {
    let activePaste = document.querySelector('#active-paste-place');
    let shownGroupsCount = 0;

    for (let currentGroup of data) {
        if (currentGroup['isAdmin'])
            continue;
        let group = new GroupBlockDiv(currentGroup.id, currentGroup.name);
        group.hide();
        for (let quizKey in currentGroup.quizVms) {
            let activeQuiz = currentGroup.quizVms[quizKey];
            if (activeQuiz.finished !== null)
                continue;
            let startTime = new Date(activeQuiz.startTime);
            let endTime = new Date(activeQuiz.endTime);

            if (startTime > Date.now() || endTime < Date.now())
                continue;

            group.addActiveQuiz(activeQuiz.id, activeQuiz.name, endTime);
        }
        if (group.activeCount > 0) {
            activePaste.appendChild(group.element);
            shownGroupsCount++;
            group.show();
        } else {
            group.remove();
        }
    }

    if (shownGroupsCount === 0) {
        let emptyBlock = new CustomDOMElement('div')
            .withClass('block')
            .withContent("Нет активных опросов");
        activePaste.appendChild(emptyBlock.element);
    }
}

function fillEndedQuizzes() {
    let endedPaste = document.querySelector('#ended-paste-place');
    let quizzes = [];

    for (let currentGroup of data) {
        if (currentGroup['isAdmin'])
            continue;

        for (let quizKey in currentGroup.quizVms) {
            let finished = currentGroup.quizVms[quizKey];
            if (finished.finished === null)
                continue;

            let finishedTime = new Date(finished.finished);
            let finishedDiv = new FinishedQuizDiv(finished.id, finished.name,
                finished.score, finishedTime, currentGroup.name);
            finishedDiv.hide();
            quizzes.push(finishedDiv);
        }
    }

    if (quizzes.length === 0) {
        endedPaste.appendChild(new CustomDOMElement('label')
            .withContent('Нет завершённых опросов').element);
        return;
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

    for (let currentGroup of data) {
        let group = new GroupBlockDiv(currentGroup.id, currentGroup.name, currentGroup['isAdmin']);
        for (let quizKey in currentGroup.quizVms) {
            let currentQuiz = currentGroup.quizVms[quizKey];
            let finishedTime = new Date(currentQuiz.finished);
            if (!currentGroup['isAdmin'] && currentQuiz.finished !== null) {
                group.addFinishedQuiz(currentQuiz.id, currentQuiz.name, currentQuiz.score, finishedTime);
                continue;
            }
            let startTime = new Date(currentQuiz.startTime);
            if (startTime > Date.now()) {
                group.addScheduledQuiz(currentQuiz.id, currentQuiz.name, startTime);
                continue;
            }
            let endTime = new Date(currentQuiz.endTime);
            if (endTime < Date.now()) {
                group.addEndedQuiz(currentQuiz.id, currentQuiz.name, endTime);
                continue;
            }
            group.addActiveQuiz(currentQuiz.id, currentQuiz.name, endTime);
        }

        pastePlace.appendChild(group.element);
    }
}

function fillAdminQuizzes() {
    let pastePlace = document.querySelector("#admin-quizzes-paste-place");

    for (let currentQuiz of adminQuizzesData['quizVms']) {
        let quizDiv = new AdminQuizDiv(currentQuiz.id, currentQuiz.name);
        adminQuizzes.push(quizDiv);
        pastePlace.appendChild(quizDiv.element);
    }
}

function getFormatDateStr(date) {
    return date.toLocaleString('ru-RU', dateTimeOptions);
}


class CustomDOMElement {
    constructor(tag) {
        this.element = document.createElement(tag);
        this._displayStyle = null;
    }

    hide() {
        if (this._displayStyle === null) {
            this._displayStyle = window.getComputedStyle(this.element).display;
        }
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

    removeClass(className) {
        this.element.classList.remove(className);
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
    constructor(groupId, groupName, isAdmin=false) {
        super('div').withClass('block')
        this.isAdmin = isAdmin;
        this.appendChild(new GroupHeaderDiv(groupId, groupName, this.isAdmin));

        this.clampedDiv = new CustomDOMElement('div').withClass('clamped-info');
        this.appendChild(this.clampedDiv);
        this.activeCount = 0;
    }

    _addQuiz(quiz) {
        this.clampedDiv.appendChild(quiz);
    }

    addActiveQuiz(quizId, header, endTime) {
        this._addQuiz(new ActiveQuizBtn(quizId, header, endTime, this.isAdmin));
        this.activeCount++;
    }

    addScheduledQuiz(quizId, header, startTime) {
        this._addQuiz(new ScheduledQuizDiv(quizId, header, startTime));
    }

    addEndedQuiz(quizId, header, endTime) {
        this._addQuiz(new EndedQuizDiv(quizId, header, endTime, this.isAdmin));
    }

    addFinishedQuiz(quizId, header, score, finishTime) {
        this._addQuiz(new FinishedQuizDiv(quizId, header, score, finishTime));
    }
}


class GroupHeaderDiv extends CustomDOMElement {
    constructor(groupId, headerText, isAdmin=false) {
        super('div').withClass('group-name');
        let container = new CustomDOMElement('div').withClass('admin-group-header-wrapper');
        let h2 = new CustomDOMElement('h2').withContent(headerText);
        container.appendChild(h2);

        if (isAdmin)  {
            let groupSettingsHref = new CustomDOMElement('a');
            groupSettingsHref.element.href = `http://localhost:8080/group/settings/${groupId}`;
            let img = new CustomDOMElement('img').withClass('admin-group-settings-btn');
            img.element.src = "img/svg/settings.svg";
            img.element.alt = "Настройки группы";
            groupSettingsHref.appendChild(img);
            container.appendChild(groupSettingsHref);
        }

        this.appendChild(container);
        let hr = new CustomDOMElement('hr');
        this.appendChild(hr);
    }
}



class BaseQuiz extends CustomDOMElement {
    constructor(tag, quizId) {
        super(tag).withClass('base-quiz');
        this.quizId = quizId;
    }

    withHeader(header) {
        let name = new CustomDOMElement('label')
            .withClass('quiz-header')
            .withContent(header);
        this.appendChild(name);
        return this;
    }

    withCheckBtn() {
        let check = new CustomDOMElement('a')
            .withClass('quiz-mark')
            .withClass('quiz-check-href')
            .withContent('Посмотреть ответы');
        check.element.href = `http://localhost:8080/quiz/check/${this.quizId}`;
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
            .withClass('quiz-time')
            .withContent(`${text}: ${getFormatDateStr(time)}`);
        this.appendChild(end);
        return this;
    }
}


class FinishedQuizDiv extends BaseQuiz {
    constructor(quizId, header, score, finishTime, groupName=null) {
        super('div', quizId).withClass('ended-quiz');
        if (groupName !== null) {
            this.withHeader(`${groupName}: ${header}`);
        } else {
            this.withHeader(`${header}`);
        }
        this.withMark(score).withTime(finishTime, 'Выполнен');
    }
}


class ActiveQuizBtn extends BaseQuiz {
    constructor(quizId, header, endTime, isAdmin=false) {
        super(isAdmin ? 'div' : 'button', quizId)
            .withClass('active-quiz')
            .withHeader(header);
        if (isAdmin) {
            this.withCheckBtn();
        }
        this.withTime(endTime, 'Завершится');
        if (!isAdmin) {
            this.addEvent('click',
                () => window.location.href = `http://localhost:8080/quiz/solve/${quizId}`);
        }
    }
}


class ScheduledQuizDiv extends BaseQuiz {
    constructor(quizId, header, startTime) {
        super('div', quizId).withHeader(header).withTime(startTime, 'Запланирован');
        this.startTime = startTime;
    }
}


class EndedQuizDiv extends BaseQuiz {
    constructor(quizId, header, endTime, isAdmin=false) {
        super('div', quizId).withHeader(header);
        if (isAdmin) {
            this.withCheckBtn();
        }
        this.withTime(endTime, 'Завершён');
    }
}


class AdminQuizDiv extends CustomDOMElement {
    constructor(quizId, header) {
        super('div').withClass('admin-quiz').withClass('clamped-info');
        this.quizId = quizId;
        this.header = header;
        this.lowerHeader = header.toLowerCase();
        let name = new CustomDOMElement('label')
            .withClass('quiz-header')
            .withContent(header);
        this.appendChild(name);

        let planBtn = new CustomDOMElement('button')
            .withClass('quiz-plan-btn')
            .withContent("Запланировать");
        planBtn.addEvent('click', () => this.startPlaning());
        this.appendChild(planBtn);

        let quizEditsHref = new CustomDOMElement('a')
            .withClass('quiz-edit-href');
        quizEditsHref.element.href = `http://localhost:8080/quiz/edit/${this.quizId}` // TODO поставить норм адрес;
        let img = new CustomDOMElement('img')
        img.element.src = "img/svg/edit.svg";
        img.element.alt = "Редактировать опрос";
        quizEditsHref.appendChild(img);
        this.appendChild(quizEditsHref);
    }

    startPlaning() {
        planModalWindow.acceptQuiz(this.quizId, this.header);
        planModalWindow.show();
    }
}



function onSearch(event) {
    let value = event.target.value.toLowerCase();
    for (let adminQuiz of adminQuizzes) {
        if (value.length === 0 || adminQuiz.lowerHeader.includes(value)) {
            adminQuiz.show();
        } else {
            adminQuiz.hide();
        }
    }
}



class GroupCreateModalWindow extends CustomDOMElement {
    constructor() {
        super('div').withClass('modal');

        let topWrapper = new CustomDOMElement('div').withClass('modal__top');
        this.title = new CustomDOMElement('h2')
            .withClass('modal__title')
            .withContent("Создайте новую группу");
        let modalCloseBtn = new CustomDOMElement('button')
            .withClass('delete-option')
            .withClass('js-modal-close');
        modalCloseBtn.addEvent('click', () => this.hide());
        topWrapper.appendChild(this.title);
        topWrapper.appendChild(modalCloseBtn);
        this.appendChild(topWrapper);

        let label = new CustomDOMElement('label').withContent('Название');
        this.input = new CustomDOMElement('input').withClass('modal__input');
        this.input.element.setAttribute('type', 'text');
        label.appendChild(this.input);
        this.appendChild(label);

        let createBtn = new CustomDOMElement('button')
            .withClass('auth-signup-button')
            .withClass('modal_btn')
            .withContent("Создать");
        createBtn.addEvent('click', async () => await this.createGroup());
        this.appendChild(createBtn);
    }

    show() {
        this.withClass('active');
        overlay.classList.add('active');
    }

    hide() {
        this.removeClass('active');
        overlay.classList.remove('active');
        this.input.element.value = '';
    }

    async createGroup() {
        let newGroupName = createGroupModalWindow.input.element.value;
        let response = await fetch('http://localhost:8080/db/apiRequest?',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    method: "group/create",
                    data: {login: user, name: newGroupName}
                }),
                method: 'POST'
            });
        let newGroupId = await response.json();
        window.location.href = `http://localhost:8080/group/settings/${newGroupId}`;
        this.hide();
    }
}


class PlanModalWindow extends CustomDOMElement {
    constructor(groupsId2Name) {
        super('div').withClass('modal');
        this._activeQuizId = null;
        this._groupsId2Name = groupsId2Name;

        let topWrapper = new CustomDOMElement('div').withClass('modal__top');
        this.title = new CustomDOMElement('h2').withClass('modal__title');
        let modalCloseBtn = new CustomDOMElement('button')
            .withClass('delete-option')
            .withClass('js-modal-close');
        modalCloseBtn.addEvent('click', () => this.hide());
        topWrapper.appendChild(this.title);
        topWrapper.appendChild(modalCloseBtn);
        this.appendChild(topWrapper);

        this._groupsSelector = new PlanGroupsPicker(groupsId2Name);
        this._timeSelector = new PlanTimePicker();
        this.appendChild(this._groupsSelector);
        this.appendChild(this._timeSelector);

        let planBtn = new CustomDOMElement('button')
            .withClass('auth-signup-button')
            .withClass('modal_btn')
            .withContent("Запланировать");
        planBtn.addEvent('click', async () => await this.quizSchedule());
        this.appendChild(planBtn);
    }

    acceptQuiz(quizId, header) {
        this._activeQuizId = quizId;
        this.title.withContent(header);
    }

    show() {
        this.withClass('active');
        overlay.classList.add('active');
    }

    hide() {
        this.removeClass('active');
        overlay.classList.remove('active');
        this._groupsSelector.clearSelection();
        this._timeSelector.clearSelection();
    }

    async quizSchedule() {
        alert(`Groups: ${this._groupsSelector.getSelectedGroupsId()}\n
        Start: ${this._timeSelector.getStartTime()}\n
        End: ${this._timeSelector.getEndTime()}`);
        await fetch('http://localhost:8080/db/apiRequest?', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                method: "group/assign",
                data:
                    {quizId: parseInt(this._activeQuizId), groupsId: this._groupsSelector.getSelectedGroupsId(),
                        startTime: this._timeSelector.getStartTime(), endTime: this._timeSelector.getEndTime()}
            }),
            method: 'POST'
        });
        this.hide();
    }

}


class PlanGroupsPicker extends CustomDOMElement {
    constructor(groupsId2Name) {
        super('div');
        this.appendChild(new CustomDOMElement('p').withContent('Группы'));
        let selectWrapper = new CustomDOMElement('div')
            .withClass('select')
            .withClass('select--multiple')
            .withClass('elem');

        this._selector = new CustomDOMElement('select')
            .withClass('standard-select')
            .withClass('multi-select');
        this._selector.element.setAttribute('multiple', '');
        for (let groupId in groupsId2Name) {
            let option = new CustomDOMElement('option').withContent(groupsId2Name[groupId]);
            option.element.value = groupId;
            this._selector.appendChild(option);
        }

        selectWrapper.appendChild(this._selector);
        selectWrapper.appendChild(new CustomDOMElement('span').withClass('focus'));
        this.appendChild(selectWrapper);
    }

    clearSelection() {
        this._selector.element.selectedIndex = -1;
    }

    getSelectedGroupsId() {
        let result = [];
        for (let groupId in this._selector.element.options) {
            if (this._selector.element.options[groupId].selected) {
                result.push(this._selector.element.options[groupId].value);
            }
        }
        for (let i = 0; i < result.length; i++) {
            result[i] = (parseInt(result[i]));
        }
        return result;
    }
}


class PlanTimePicker extends CustomDOMElement {
    constructor() {
        super('div');
        this.appendChild(new CustomDOMElement('h2').withContent('Время начала'));

        let startWrapper = new CustomDOMElement('div').withClass('elem');
        this.appendChild(startWrapper);

        this._startPicker = new CustomDOMElement('input').withClass('datepicker');
        this._startPicker.element.type = 'datetime-local';
        startWrapper.appendChild(this._startPicker);

        let endWrapper = new CustomDOMElement('div').withClass('elem');
        this.appendChild(endWrapper);

        this._endPicker = new CustomDOMElement('input').withClass('datepicker');
        this._endPicker.element.type = 'datetime-local';
        endWrapper.appendChild(this._endPicker);
    }

    clearSelection() {
        this._startPicker.element.value = "";
        this._endPicker.element.value = "";
    }

    getStartTime() {
        return new Date(this._startPicker.element.value);
    }

    getEndTime() {
        return new Date(this._endPicker.element.value);
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
        for (let buttonHandler of this.buttonsHandlers) {
            buttonHandler.setInactive();
        }

        buttonHandler.setActive();
    }

    setActiveById(activeId) {
        for (let buttonHandler of this.buttonsHandlers) {
            if (buttonHandler.id === activeId) {
                buttonHandler.setActive();
            } else {
                buttonHandler.setInactive();
            }
        }
    }
}

class NavButton {
    constructor(button) {
        this.button = button;
        this.id = button.id;
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



if (['check', 'settings'].includes(prevPage)) {
    navButtonsGroup.setActiveById('nav-groups-btn');
} else if (['edit'].includes(prevPage)) {
    navButtonsGroup.setActiveById('nav-admin-quizzes-btn');
}

document.querySelector('.create-quiz-btn').addEventListener('click', createQuiz);
async function createQuiz() {
    let response = await fetch('http://localhost:8080/db/apiRequest',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(
                {
                    method: 'quiz/createQuiz',
                    data: {
                        login: user,
                        title: "",
                        description: "",
                        questions: []
                    }
                })
        });
    let quizId = await response.json();
    window.location.href = `http://localhost:8080/quiz/edit/${quizId}`;
}