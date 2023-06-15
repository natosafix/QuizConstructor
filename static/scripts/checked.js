let answersJson = [
    "Andy Puie",
    "estestvenno",
    "дабро",
    "Мужчина",
    "Да"
];
answersJson = JSON.stringify(answersJson);
const answersData = JSON.parse(answersJson);


// TODO: will be removed later when real data
function checkedStart() {
    addIsCorrectSwitch(answersData);
}

function addIsCorrectSwitch(answers) {
    let i = 0;
    for (const element of document.querySelectorAll(".element")) {
        if (element.classList.contains("image"))
            continue;

        for (const input of element.querySelectorAll(".any-element")) {
            input.disabled = true;

            if (["radio", "checkbox"].includes(input.type))
                input.checked = input.value === answers[i];
            else
                input.value = answers[i];
        }

        element.append(createIsCorrectSwitch());

        i++;
    }
}

function createIsCorrectSwitch() {
    const div = document.createElement("div");
    div.classList.add("is-correct-container", "element-choice");

    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "checkbox";

    label.append(input);
    label.append("Засчитать");

    div.append(label);

    return div;
}

function nextPressed() {
    console.log(getScore());

    document.querySelector("#myForm").remove();

    const newAnswers = [
        "Ega lopar",
        "nien",
        "lexa",
        "Мужчина",
        "Нет"
    ];
    parse();
    addIsCorrectSwitch(newAnswers);
}

function getScore() {
    return document.querySelectorAll(".is-correct-container input:checked").length;
}