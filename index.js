let json = {
    "form": {
        "title": "Анкета",
        "description": "Это анкета которую нужно заполнить"
    },
    "q1": {
        "type": "one-line",
        "prompt": "Имя",
        "placeholder": "Ваше имя"
    },
    "q2": {
        "type": "multi-line",
        "prompt": "Расскажите о себе",
        "placeholder": ""
    },
    "q3": {
        "type": "multi-line",
        "prompt": "Расскажите о себе",
        "placeholder": ""
    },
    "q4": {
        "type": "single-choice",
        "prompt": "Пол",
        "options": {
            "o1": "Мужчина",
            "o2": "Женщина",
            "o3": "Трансформер"
        }
    },
    "q5": {
        "type": "multi-choice",
        "prompt": "Пол",
        "options": {
            "o1": "Мужчина",
            "o2": "Женщина",
            "o3": "Да",
            "o4": "Нет",
        }
    }
};

json = JSON.stringify(json);

function parse() {
    const form = document.createElement("form");
    form.className = "block";
    document.querySelector(".main").prepend(form);

    const data = JSON.parse(json);

    const h2 = document.createElement("h2");
    h2.innerHTML = data.form.title;
    form.append(h2);

    let i = 1;
    while (true) {
        const key = "q" + i;
        if (data[key] === undefined) {
            break;
        }
        const question = data[key];

        let e;

        if (["one-line", "multi-line"].includes(question.type)) {
            e = createLineElement(question, key);
        }
        else if (["single-choice", "multi-choice"].includes(question.type)) {
            e = createChoiceElement(question, key);
        }
        else { console.log("unknown question type: " + question.type) }

        if (e !== undefined) {
            form.append(e);
        }

        i++;
    }
}

function createElementMainDiv(question) {
    const div = document.createElement("div");
    div.classList.add("element", question.type);
    return div;
}

function createElementDescription(question) {
    const e = document.createElement("div");
    e.className = "element-description";
    e.innerHTML = question.prompt;
    return e;
}

function createLineElement(question, questionName) {
    const div = createElementMainDiv(question);
    const label = document.createElement("label");
    const descriptionDiv = createElementDescription(question);

    let inputElement;

    if (question.type === "one-line")
    {
        inputElement = document.createElement("input");
        inputElement.type = "text";
    }
    else if (question.type === "multi-line")
    {
        inputElement = document.createElement("textarea");
    }
    else { console.log("unknown line type: " + question.type); }

    inputElement.className = "element-input";
    inputElement.name = questionName;

    label.append(descriptionDiv);
    label.append(inputElement);

    div.append(label);

    return div;
}

function createChoiceElement(question, questionName) {
    const div = createElementMainDiv(question);
    div.append(createElementDescription(question));

    for (const key in question.options) {
        const option = question.options[key];
        const choiceDiv = createOption(question, key, option, questionName);
        div.append(choiceDiv);
    }

    return div;
}

function createOption(question, key, option, questionName) {
    const choiceDiv = document.createElement("div");
    choiceDiv.className = "element-choice";

    const label = document.createElement("label");
    const input = document.createElement("input");

    if (question.type === "single-choice") {
        input.type = "radio";
    }
    else if (question.type === "multi-choice") {
        input.type = "checkbox";
    }
    else { console.log("unknown question type when input.type: " + question.type); }

    input.name = questionName;
    input.value = key;

    label.append(input);
    label.append(option);

    choiceDiv.append(label);

    return choiceDiv;
}