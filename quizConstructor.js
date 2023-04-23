const quizQuestion = document.querySelector(".quiz-question");
const questionType = quizQuestion.querySelector(".answer-type-selector");
let prevType = 'shortText';

questionType.addEventListener('change', changeQuestionType)

function changeQuestionType(event) {
    let configuration = event.target.parentNode.querySelector('.answer-configuration');
    let type = event.target.value;
    let oldTypeHolder = configuration.querySelector(`.${prevType}`);
    let newTypeHolder = configuration.querySelector(`.${type}`);
    oldTypeHolder.style.display = 'none';
    newTypeHolder.style.display = 'block';
    prevType = type;
    switch (type) {
        case 'shortText':
            break;
        case 'longText':
            break;
        case 'oneList':
            break;
        case 'severalList':
            break;
        case 'dropList':
            break;
    }
}

const quizQuestionCopy = quizQuestion.cloneNode(true);
const addButton = document.querySelector("#add-unit-button");
questionCount = 1;

addButton.addEventListener('click', addQuestion)

function addQuestion(event) {
    let newQuestion = quizQuestionCopy.cloneNode(true);
    let questions = document.querySelectorAll(".quiz-question");
    let lastQuestion = questions[questions.length - 1];
    lastQuestion.after(newQuestion);
    questionCount++;
}

function removeQuestion(event) {
    if (questionCount === 1)
        return;
    const currentQuestion= event.target.closest(".quiz-question");
    currentQuestion.remove();
    questionCount--;
}

