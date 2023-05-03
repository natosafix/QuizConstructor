const quizQuestion = document.querySelector(".quiz-question");
const questionType = quizQuestion.querySelector(".answer-type-selector");
let question2PrevType = {1: 'shortText'};

const choiceTypes = ['oneList', 'severalList', 'dropList'];

//questionType.addEventListener('change', changeQuestionType)

function changeQuestionType(event) { // меняет тип вариантов ответа на вопрос
    let questionNum = getQuestionNum(event);
    let prevType = question2PrevType[questionNum];
    let configuration = event.target.parentNode.querySelector('.answer-configuration');
    let type = event.target.value;
    let oldTypeHolder = configuration.querySelector(`.${prevType}`);
    let newTypeHolder = configuration.querySelector(`.${type}`);
    oldTypeHolder.style.display = 'none';
    newTypeHolder.style.display = 'block';
    let curAddOptionButton = configuration.querySelector('.add-option');
    if (choiceTypes.includes(type))
        curAddOptionButton.style.display = 'block';
    question2PrevType[questionNum] = type;

}

const optionsCopy = {
    oneList: quizQuestion.querySelector(".oneList-option").cloneNode(true),
    severalList: quizQuestion.querySelector(".severalList-option").cloneNode(true),
    dropList: quizQuestion.querySelector(".dropList-option").cloneNode(true)}
const addOptionButton = quizQuestion.querySelector(".add-option");
//addOptionButton.addEventListener('click', addOption);
addOptionButton.style.display = 'none';

function addOption(event) { // добавляет новые варианты ответа
    let prevType = question2PrevType[getQuestionNum(event)];
    let configuration = event.target.closest('.answer-configuration');
    let options = configuration.querySelectorAll(`.${prevType}-option`);
    let last = options[options.length - 1];
    let newOption = optionsCopy[prevType].cloneNode(true);
    let inp = newOption.querySelector('.answer');
    inp.name = inp.name.slice(0, -5) + (options.length + 1).toString() + 'text';
    inp.placeholder = inp.placeholder.slice(0, -1) + (options.length + 1).toString();
    let a = inp.previousElementSibling;
    inp.previousElementSibling.disabled = !(last.closest(`.${prevType}`).querySelector('.autocheck-button').checked);
    if (prevType === 'dropList')
        inp.previousSibling.textContent = (options.length + 1).toString() + '.';
    last.after(newOption);
}

function deleteOption(event) {
    let prevType = question2PrevType[getQuestionNum(event)];
    let configuration = event.target.closest('.answer-configuration');
    let options = configuration.querySelectorAll(`.${prevType}-option`);
    let option = event.target.parentNode;
    if (options.length > 1)
        option.remove();
}

function changeAutocheck(event) {
    if (event.target.checked) {
        let prevType = question2PrevType[getQuestionNum(event)];;
        if (choiceTypes.includes(prevType))
            changeChoiceOptionsAutocheck(event, prevType)
        else {

        }
    } else {
        let prevType = question2PrevType[getQuestionNum(event)];;
        if (choiceTypes.includes(prevType))
            changeChoiceOptionsAutocheck(event, prevType, true)
    }
}

function changeChoiceOptionsAutocheck(event, prevType, disable=false) {
    let configuration = event.target.closest('.quiz-question').querySelector('.answer-configuration');
    let options = configuration.querySelectorAll(`.${prevType}-option`);
    for (option of options) {
        let autocheckChoice =
            option.querySelector('.autocheck-choice');
        if (disable) {
            autocheckChoice.checked = false;
        }
        autocheckChoice.disabled = disable;
    }
}

function getQuestionNum(event) {
    return parseInt(event.target.closest('.quiz-question').name.slice(1));
}

const quizQuestionCopy = quizQuestion.cloneNode(true);
const addButton = document.querySelector("#add-unit-button");
questionCount = 1;

addButton.addEventListener('click', addQuestion)

function addQuestion(event) { // добавляет новые вопросы
    let newQuestion = quizQuestionCopy.cloneNode(true);
    let questions = document.querySelectorAll(".quiz-question");
    newQuestion.name = newQuestion.name[0] + (questions.length + 1).toString();
    question2PrevType[questions.length + 1] = 'shortText';
    let lastQuestion = questions[questions.length - 1];
    lastQuestion.after(newQuestion);
    questionCount++;
}

function removeQuestion(event) { // удаляет вопрос
    if (questionCount === 1)
        return;
    const currentQuestion= event.target.closest(".quiz-question");
    currentQuestion.remove();
    questionCount--;
}

