// TODO сохранить конфигурацию после обновления страницы

const codeMirrorOptions = {
    mode: 'javascript',
    lineNumbers: true,
    indentUnit: 4,
    matchBrackets: true,
    theme: 'eclipse',
    extraKeys: { "Tab": "insertSoftTab" },
    placeholder: 'Введите для автопроверки...'
};

document.addEventListener('DOMContentLoaded', () => {
    let editorItem = document.getElementById('codeEditor1');
    editorItem.CodeMirror = CodeMirror.fromTextArea(editorItem, codeMirrorOptions);
    editorItem.CodeMirror.setSize("100%", "100%");
});

const quizQuestion = document.querySelector(".quiz-question");
const questionType = quizQuestion.querySelector(".answer-type-selector");
let question2PrevType = {1: 'shortText'};

const choiceTypes = ['oneList', 'severalList', 'dropList'];

//questionType.addEventListener('change', changeQuestionType)

// меняет тип вариантов ответа на вопрос
function changeQuestionType(event) {
    console.log(event)
    let questionNum = getQuestionNum(event);
    let configuration = event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.answer-configuration');

    let allGroups = configuration.querySelectorAll(".quiz-group");
    for (let group of allGroups) {
        group.style.display = 'none';
    }

    let newType = event.target.value;
    let newTypeHolder = configuration.querySelector(`.${newType}`);
    newTypeHolder.style.display = 'block';

    if (newType === 'codeEditor') {
        // https://github.com/codemirror/codemirror5/issues/5985#issuecomment-525363039
        let codeInput = configuration.querySelector(`#codeEditor${questionNum}`);
        codeInput.CodeMirror.refresh();
    }

    let curAddOptionButton = configuration.querySelector('.add-option-btn');
    if (choiceTypes.includes(newType))
        curAddOptionButton.style.display = 'block';
    else
        curAddOptionButton.style.display = 'none';

    question2PrevType[questionNum] = newType;
}

const optionsCopy = {
    oneList: quizQuestion.querySelector(".oneList-option").cloneNode(true),
    severalList: quizQuestion.querySelector(".severalList-option").cloneNode(true),
    dropList: quizQuestion.querySelector(".dropList-option").cloneNode(true)}
const addOptionButton = quizQuestion.querySelector(".add-option-btn");
//addOptionButton.addEventListener('click', addOption);
addOptionButton.style.display = 'none';

// добавляет новые варианты ответа
function addOption(event) {
    let prevType = question2PrevType[getQuestionNum(event)];
    let configuration = event.target.closest('.answer-configuration');
    let options = configuration.querySelectorAll(`.${prevType}-option`);
    let last = options[options.length - 1];
    let newOption = optionsCopy[prevType].cloneNode(true);
    let separatorIdx = last.id.indexOf('-');
    newOption.id = last.id.slice(0, separatorIdx) + (+last.id.slice(separatorIdx) + 1);

    let inp = newOption.querySelector('.answer');
    inp.name = inp.name.slice(0, -5) + (options.length + 1).toString() + 'text';
    inp.value = `Вариант ${options.length + 1}`;

    if (prevType === 'dropList')
        inp.previousSibling.textContent = (options.length + 1).toString() + '.';

    last.after(newOption);

    inp.focus();
    inp.select();
}

// Если новое имя - пустое, присваивает значение по умолчанию
function onSeveralListAnswerChange(event) {
    // удаление пробелов
    let str = event.target.value.replace(/\s/g, '');
    if (str.length === 0) {
        let count = countPreviousSiblings(event.target.parentNode);
        event.target.value = `Вариант ${count}`;
    }
}

function onLoadImage(event, questionNum) {
    const preview = document.getElementById(`imagePreview${questionNum}`);
    const deleteBtn = document.getElementById(`deleteImage${questionNum}`);

    preview.src = event.target.result;
    preview.style.display = 'block';
    deleteBtn.style.display = 'block';
}

function onChangeImage(event) {
    let questionNum = getQuestionNum(event);
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => onLoadImage(evt, questionNum);
        reader.readAsDataURL(file);
    }
}

function onDeleteImage(event) {
    event.preventDefault();
    let questionNum = getQuestionNum(event);
    const preview = document.getElementById(`imagePreview${questionNum}`);
    const imageInput = document.getElementById(`imageInput${questionNum}`);
    const deleteBtn = document.getElementById(`deleteImage${questionNum}`);

    imageInput.value = null;
    preview.style.display = 'none';
    deleteBtn.style.display = 'none';
}

function onModeChange(event) {
    const qNum = getQuestionNum(event);
    let newMode = event.target.value;
    let codeInput = document.querySelector(`#codeEditor${qNum}`);
    let editor = codeInput.CodeMirror;
    editor.setOption('mode', newMode);
}

// uncheck radio при нажатии на неё и Ctrl
function uncheckRadioOnCtrl(event) {
    if(event.ctrlKey || event.metaKey) {
        event.target.checked = false;
    }
}

// Подсчет количества предыдущих элементов внутри этого же родителя
function countPreviousSiblings(element) {
    let currentId = element.id;
    let parent = element.parentNode;

    let count = 0;
    for (let child of parent.childNodes) {
        if (child.id === currentId)
            break;
        count++;
    }

    return count;
}

// удаляет вариант ответа
function deleteOption(event) {
    let prevType = question2PrevType[getQuestionNum(event)];
    let configuration = event.target.closest('.answer-configuration');
    let options = configuration.querySelectorAll(`.${prevType}-option`);
    let option = event.target.parentNode;
    if (options.length > 1)
        option.remove();
}

// тыкнули на автопроверку
function changeAutocheck(event) {
    if (event.target.checked) {
        let prevType = question2PrevType[getQuestionNum(event)];
        if (choiceTypes.includes(prevType))
            changeChoiceOptionsAutocheck(event, prevType)
        else {

        }
    } else {
        let prevType = question2PrevType[getQuestionNum(event)];
        if (choiceTypes.includes(prevType))
            changeChoiceOptionsAutocheck(event, prevType, true)
    }
}

// включает выключает автопроверку
function changeChoiceOptionsAutocheck(event, prevType, disable=false) {
    let configuration = event.target.closest('.quiz-question').querySelector('.answer-configuration');
    let options = configuration.querySelectorAll(`.${prevType}-option`);
    for (let option of options) {
        let autocheckChoice =
            option.querySelector('.autocheck-choice');
        if (disable) {
            autocheckChoice.checked = false;
        }
        autocheckChoice.disabled = disable;
    }
}

// определяет номер вопроса
function getQuestionNum(event) {
    return parseInt(event.target.closest('.quiz-question').name.slice(1));
}

const quizQuestionCopy = quizQuestion.cloneNode(true);
const addButton = document.querySelector("#add-unit-button");
questionCount = 1;
questionAdded = 1;

addButton.addEventListener('click', addQuestion)

function addQuestion(event) { // добавляет новые вопросы
    let newQuestion = quizQuestionCopy.cloneNode(true);
    let questions = document.querySelectorAll(".quiz-question");
    newQuestion.name = newQuestion.name[0] + (questionAdded + 1).toString();

    let imageInput = newQuestion.querySelector(`#imageInput1`);
    imageInput.id = `imageInput${questionAdded + 1}`;
    let imagePreview = newQuestion.querySelector(`#imagePreview1`);
    imagePreview.id = `imagePreview${questionAdded + 1}`;
    let imageDeleteBtn = newQuestion.querySelector(`#deleteImage1`);
    imageDeleteBtn.id = `deleteImage${questionAdded + 1}`;

    let codeEditor = newQuestion.querySelector(`#codeEditor1`);
    codeEditor.id = `codeEditor${questionAdded + 1}`;
    codeEditor.CodeMirror = CodeMirror.fromTextArea(codeEditor, codeMirrorOptions);
    codeEditor.CodeMirror.setSize("100%", "100%");
    let codeEditorLabel = newQuestion.querySelector(`#labelForCodeEditor1`);
    codeEditorLabel.id = `codeEditorLabel${questionAdded + 1}`;

    let questionNumberLabel = newQuestion.querySelector('#questionNumber1');
    questionNumberLabel.id = `questionNumber${questionAdded + 1}`;
    questionNumberLabel.textContent = `Вопрос №${questionCount + 1}`;

    question2PrevType[questionAdded + 1] = 'shortText';
    let lastQuestion = questions[questions.length - 1];
    lastQuestion.after(newQuestion);
    questionCount++;
    questionAdded++;
}

function removeQuestion(event) { // удаляет вопрос
    if (questionCount === 1)
        return;
    const currentQuestion= event.target.closest(".quiz-question");
    currentQuestion.remove();
    questionCount--;

    let counter = 1;
    let questions = document.querySelectorAll('.quiz-question');
    for (let question of questions) {
        let questionNumberLabel = question.querySelector('.quiz-question-header-label');
        questionNumberLabel.textContent = `Вопрос №${counter}`;
        ++counter;
    }
}


class QuizForm {
    title = undefined;
    description = undefined;
    questions = [];
}

class QuizQuestion {
    question = undefined;
    answerType = undefined;
    image = undefined;
    isAutocheckEnabled = undefined;
    answers = [];
    maxScore;
}

class QuizAnswer {
    answer = undefined;
    isCorrect = undefined;
}

function buildConstructor(event) {
    let quizForm = new QuizForm();
    quizForm.title = document.getElementsByName('title');
    quizForm.description = document.getElementsByName('description');
    let questionsHolder = event.target.parentNode;
    let questions = questionsHolder.querySelectorAll('.quiz-question');
    for (const question of questions) {
        let quizQuestion = new QuizQuestion();
        console.log(question.querySelector('.question'))
        quizQuestion.question = question.querySelector('.question').value;
        quizQuestion.answerType = question.querySelector('.answer-type-selector').value;
        quizQuestion.maxScore = parseInt(question.querySelector("[name='maxScore']").value);
        quizQuestion.isAutocheckEnabled = false;
        if (choiceTypes.includes(quizQuestion.answerType)) {
            let answerHolder = question.querySelector(`.${quizQuestion.answerType}`);
            let answers = answerHolder.querySelectorAll(`.${quizQuestion.answerType}-option`)

            for (const answer of answers) {
                if (answer.querySelector('.autocheck-choice').checked)
                    quizQuestion.isAutocheckEnabled = true;
            }

            for (const answer of answers) {
                let quizAnswer = new QuizAnswer();
                quizAnswer.answer = answer.querySelector('.answer').value;
                if (quizQuestion.isAutocheckEnabled)
                    quizAnswer.isCorrect = answer.querySelector('.autocheck-choice').checked;
                quizQuestion.answers.push(quizAnswer);
            }
        } else  {
            let autocheckInput;
            if (quizQuestion.answerType === 'codeEditor') {
                autocheckInput = question.querySelector(".correct-answer");
                autocheckInput = autocheckInput.CodeMirror;
            } else {
                autocheckInput = question.querySelector('.correct-answer').value;
            }
            if (autocheckInput.length > 0) {
                let quizAnswer = new QuizAnswer();
                quizQuestion.isAutocheckEnabled = true;
                quizAnswer.answer = autocheckInput.value;
                quizAnswer.isCorrect = true;
                quizQuestion.answers.push(quizAnswer);
            }
        }
        quizForm.questions.push(quizQuestion);
    }
}

document.querySelector('.auth-login-button').addEventListener('click', logOut);

function logOut() {
    CookieChanger.deleteCookie('auth');
    window.location.href = "http://localhost:8080/login";
}