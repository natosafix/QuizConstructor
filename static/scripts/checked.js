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

        element.append(createCounter());

        i++;
    }
}

function createCounter() {
    const div = document.createElement("div");
    div.classList.add("score-container");

    const display = document.createElement("div");
    display.classList.add("quantity");
    display.innerHTML = "0";

    const buttonUp = document.createElement("button");
    buttonUp.classList.add("counter");
    buttonUp.type = "button";

    const buttonDown = buttonUp.cloneNode()

    buttonUp.classList.add("bt_plus");
    buttonUp.innerHTML = "<svg viewBox=\"0 0 24 24\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line></svg>";

    buttonDown.classList.add("bt_minus");
    buttonDown.innerHTML = "<svg viewBox=\"0 0 24 24\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line></svg>";

    buttonUp.addEventListener("click", () => {
        const d = div.querySelector(".quantity");
        d.innerHTML = (+d.innerHTML + 1).toString();
    });

    buttonDown.addEventListener("click", () => {
        const d = div.querySelector(".quantity");
        d.innerHTML = (+d.innerHTML - 1).toString();
    });

    div.append(buttonDown, display, buttonUp);

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
    let score = [];
    for (const elem of document.querySelectorAll(".quantity")) {
        score.push(+elem.innerHTML);
    }
    return score;
}