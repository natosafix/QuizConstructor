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

