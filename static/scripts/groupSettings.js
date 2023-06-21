
const groupId = document.querySelector("#group-id").textContent;
let inviteLinkInput = document.querySelector('#inviteLink');
let data;

document.addEventListener('DOMContentLoaded', async function(event) {
    // TODO db request
    data = {
        name: "Контора",
        members: [
            {
                id: 1,
                firstName: "Хёндай",
                lastName: "Супра"
            },
            {
                id: 2,
                firstName: "Тойота",
                lastName: "Королла"
            },
            {
                id: 3,
                firstName: "Эндрю",
                lastName: "Брррым брррымм.."
            },
        ]
    }

    document.querySelector('#groupName').textContent = data.name;
    const groupId = document.querySelector('.backend-data').textContent;
    inviteLinkInput.value = `localHost:8080/groupInvite/${groupId}`;
    inviteLinkInput.addEventListener('click', copyLink, false);

    fillMembers(data['members']);
});

function copyLink() {
    document.execCommand('copy', false, inviteLinkInput.select());
}

function fillMembers(members) {
    const pastePlace = document.querySelector("#member-paste-place");

    for (let member of members) {
        pastePlace.appendChild(new GroupMemberDiv(member.id, member.firstName, member.lastName).element);
    }
}


class CustomDOMElement {
    constructor(tag) {
        this.element = document.createElement(tag);
        this._displayStyle = 'block';
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

    addEvent(type, handler) {
        this.element.addEventListener(type, handler);
    }
}


class GroupMemberDiv extends CustomDOMElement {
    constructor(memberId, firstName, secondName) {
        super('div').withClass('group-member-wrapper');
        this.memberId = memberId;

        this.appendChild(new CustomDOMElement('label')
            .withClass('member-name')
            .withContent(`${firstName} ${secondName}`));

        let btn = new CustomDOMElement('button')
            .withClass('remove-btn')
            .withContent("Удалить участника");
        btn.addEvent('click', () => this.removeMember());

        this.appendChild(btn);
    }

    removeMember() {
        // TODO request to remove this.memberId from groupId (global variable).
        // Need to check that current user is really admin for this groupId
        this.element.remove();
    }
}

