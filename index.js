class NavButtonsHandler {
    constructor(buttons) {
        this.buttons = buttons;
        for (let button of buttons) {
            button.addEventListener('click', (evt) => this.onButtonClick(evt), false);
        }
    }

    onButtonClick(event) {
        for (let button of this.buttons) {
            this.setInactive(button);
        }
        this.setActive(event.target);
    }

    setInactive(button) {
        button.classList.remove('active');
        button.classList.add('inactive');
    }

    setActive(button) {
        button.classList.remove('inactive');
        button.classList.add('active');
    }
}

const navButtonsHandler = new NavButtonsHandler(document.querySelectorAll('.nav-button'));
