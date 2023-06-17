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

        let response = await fetch('http://localhost:8080/form/mainPage', {
            method: 'GET'
        });

        data = await response.json();
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

            group.addActiveQuiz(activeQuiz.name, endTime.toLocaleString('ru-RU', dateTimeOptions));
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
}

class ActiveGroupBlockDiv extends CustomDOMElement {
    constructor(headerText) {
        super('div').withClass('block');
        this.appendChild(new GroupHeaderDiv(headerText));
        this.activeCount = 0;
    }

    addActiveQuiz(header, endTime) {
        this.appendChild(new ActiveQuizBtn(header, endTime));
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
    constructor(header, endTime) {
        super('button').withClass('quiz-info').withClass('active-quiz');
        let name = new CustomDOMElement('label').withClass('quiz-name').withContent(header);
        let end = new CustomDOMElement('label')
            .withClass('quiz-end-time')
            .withContent(`Завершится: ${endTime}`);
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

