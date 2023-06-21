let answersJson = [
    "Andy Puie",
    "estestvenno",
    "дабро",
    "Мужчина",
    "Да"
];
answersJson = JSON.stringify(answersJson);
const answersData = JSON.parse(answersJson);

let answersJson = {
    id: 1,
    questions: [
        {
            score: 0,
            answers: [
                {
                    content: "Какой-то выбранный ответ",
                    id: 123 // id ответа в бд
                },
                {
                    content: "Ещё какой-то выбранный ответ",
                    id: 234 // id ответа в бд
                }
            ],
        },
        {
            score: 1,
            answers: [
                {
                    content: "Какой-то правильный ответ",
                    id: 96 // id ответа в бд
                }
            ],
        },
        {
            score: 0,
            answers: [
                {
                    content: "JS - говно",
                    id: 32 // id ответа в бд
                }
            ]
        }
    ]
}


// TODO: will be removed later when real data
function checkedStart() {
    addIsCorrectSwitch(answersData);
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