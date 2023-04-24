const quizQuestion = document.querySelector(".quiz-question");
const questionType = quizQuestion.querySelector(".answer-type-selector");
let question2PrevType = {1: 'shortText'};

//questionType.addEventListener('change', changeQuestionType)

function changeQuestionType(event) {
    let questionNum = parseInt(event.target.closest('.quiz-question').name.slice(1));
    let prevType = question2PrevType[questionNum];
    let configuration = event.target.parentNode.querySelector('.answer-configuration');
    let type = event.target.value;
    let oldTypeHolder = configuration.querySelector(`.${prevType}`);
    let newTypeHolder = configuration.querySelector(`.${type}`);
    oldTypeHolder.style.display = 'none';
    newTypeHolder.style.display = 'block';
    let curAddOptionButton = configuration.querySelector('.add-option');
    if (['oneList', 'severalList', 'dropList'].includes(type))
        curAddOptionButton.style.display = 'block';
    question2PrevType[questionNum] = type;
    /*switch (type) {
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
    }*/
}

const optionsCopy = {
    oneList: quizQuestion.querySelector(".oneList-option").cloneNode(true),
    severalList: quizQuestion.querySelector(".severalList-option").cloneNode(true),
    dropList: quizQuestion.querySelector(".dropList-option").cloneNode(true)}
const addOptionButton = quizQuestion.querySelector(".add-option");
//addOptionButton.addEventListener('click', addOption);
addOptionButton.style.display = 'none';

function addOption(event) {
    let questionNum = parseInt(event.target.closest('.quiz-question').name.slice(1));
    let prevType = question2PrevType[questionNum];
    let configuration = event.target.closest('.answer-configuration');
    let options = configuration.querySelectorAll(`.${prevType}-option`);
    let last = options[options.length - 1];
    let newOption = optionsCopy[prevType].cloneNode(true);
    let inp = newOption.querySelector('.answer');
    inp.name = inp.name.slice(0, -5) + (options.length + 1).toString() + 'text';
    inp.placeholder = inp.placeholder.slice(0, -1) + (options.length + 1).toString();
    if (prevType === 'dropList')
        inp.previousSibling.textContent = (options.length + 1).toString() + '.';
    last.after(newOption);
}

const quizQuestionCopy = quizQuestion.cloneNode(true);
const addButton = document.querySelector("#add-unit-button");
questionCount = 1;

addButton.addEventListener('click', addQuestion)

function addQuestion(event) {
    let newQuestion = quizQuestionCopy.cloneNode(true);
    let questions = document.querySelectorAll(".quiz-question");
    newQuestion.name = newQuestion.name[0] + (questions.length + 1).toString();
    question2PrevType[questions.length + 1] = 'shortText';
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

