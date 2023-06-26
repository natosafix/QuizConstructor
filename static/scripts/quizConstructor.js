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
const codeTypes = ['javascript', 'xml', 'css'];
const questionType2Id = {'shortText': 1, 'longText': 2, 'javascript': 3, 'oneList': 4, 'severalList': 5, 'xml': 6, 'css': 7};
const id2QuestionType = {1: 'shortText', 2: 'longText', 3: 'javascript', 4: 'oneList', 5: 'severalList', 6: 'xml', 7: 'css'};
document.querySelector('.build-button').addEventListener('click', buildConstructor);
//questionType.addEventListener('change', changeQuestionType)

// меняет тип вариантов ответа на вопрос
function changeQuestionType(event) {
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
    id = undefined;
    login = undefined;
    title = undefined;
    description = undefined;
    questions = [];
}

class QuizQuestion {
    id = undefined;
    content = undefined;
    typeId = undefined;
    /*image = undefined;*/
    required = false;
    options = [];
    correctOptions = [];
    maxScore;
}

class QuizAnswer {
    id = undefined;
    answer = undefined;
}

const login = document.querySelector('.auth-signup-button').textContent

async function buildConstructor(event) {
    let quizForm = new QuizForm();
    quizForm.id = getDatabaseId(document);
    quizForm.login = login;
    quizForm.title = document.getElementsByName('title')[0].value;
    quizForm.description = document.getElementsByName('description')[0].value;
    let questionsHolder = event.target.parentNode;
    let questions = questionsHolder.querySelectorAll('.quiz-question');
    for (const question of questions) {
        let quizQuestion = new QuizQuestion();
        quizQuestion.id = getDatabaseId(question);
        quizQuestion.content = question.querySelector('.question').value;
        let answerType = question.querySelector('.answer-type-selector').value;
        let codeType = answerType;
        if (answerType === 'codeEditor') {
            codeType = question.querySelector('.code-type-select').value;
        }
        quizQuestion.typeId = questionType2Id[codeType];
        quizQuestion.maxScore = parseInt(question.querySelector("[name='maxScore']").value);
        let answerHolder = question.querySelector(`.${answerType}`);
        if (choiceTypes.includes(answerType)) {
            let answers = answerHolder.querySelectorAll(`.${answerType}-option`)

            for (const answer of answers) {
                let quizAnswer = new QuizAnswer();
                quizAnswer.id = getDatabaseId(answer)
                quizAnswer.answer = answer.querySelector('.answer').value;
                if (answer.querySelector('.autocheck-choice').checked)
                    quizQuestion.correctOptions.push(quizAnswer);
                quizQuestion.options.push(quizAnswer);
            }
        } else  {
            let autocheckInput;
            if (answerType === 'codeEditor') {
                autocheckInput = answerHolder.querySelector(".correct-answer");
                autocheckInput = autocheckInput.CodeMirror.getValue();
            } else {
                autocheckInput = answerHolder.querySelector('.correct-answer').value;
            }
            if (autocheckInput.length > 0) {
                let quizAnswer = new QuizAnswer();
                quizAnswer.id = getDatabaseId(answerHolder);
                quizAnswer.answer = autocheckInput;
                quizQuestion.correctOptions.push(quizAnswer);
            }
        }
        quizForm.questions.push(quizQuestion);
    }
    // alert(JSON.stringify(quizForm));
    await saveConstructorBuild(quizForm)
    window.location.href = 'https://norebesach.beget.app/';
}

function getDatabaseId(element) {
    let id = element.querySelector('.databaseId').textContent;
    return id === "0" ? undefined : parseInt(id);
}

async function saveConstructorBuild(quizForm) {
    let newGroupId = await fetch('https://norebesach.beget.app/db/apiRequest?',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                method: "quiz/updateQuiz",
                data: quizForm
            }),
            method: 'PUT'
        });
}

/*let data =
    {
        "id": 1,
        "login" : "Egorable",
        "title": "Леха",
        "description": "Кулаков",
        "questions": [
            {
                "id": 1,
                "content": "первый",
                "typeId": 1,
                "maxScore": 1,
                "required" : false,
                "options": [],
                "correctOptions" : [
                    {"id": 6, "answer": "Вариант 1"}
                ]
            },
            {
                "id": 3,
                "content": "второй",
                "typeId": 4,
                "maxScore": 1,
                "required" : true,
                "options": [
                    {"id": 1, "answer": "Вариант 1"},
                    {"id": 2, "answer": "Вариант 2"},
                    {"id": 4, "answer": "Вариант 3"}
                ],
                "correctOptions" : [
                    {"id": 2, "answer" : "Вариант 2"}
                ]

            },
            {
                "id": 5,
                "content": "третий",
                "typeId": 5,
                "maxScore": 3,
                "required" : true,
                "options": [
                    {"id": 1, "answer": "Вариант 1"},
                    {"id": 2, "answer": "Вариант 2"},
                    {"id": 3, "answer": "Вариант 3"}
                ],
                "correctOptions" : []
            },
            {
                "id": 8,
                "content": "четвертый",
                "typeId": 7,
                "maxScore": 3,
                "required" : true,
                "options": [],
                "correctOptions" : [
                    {"id": 1, "answer": "color"}
                ]
            }
        ]
    }*/

let quizId = parseInt(document.querySelector('#quiz-id').textContent);
document.addEventListener('DOMContentLoaded', async function () {
    let response = await fetch('https://norebesach.beget.app/db/apiRequest?' + new URLSearchParams(
        {
            method: "quiz/getQuiz",
            data: JSON.stringify({id: quizId})
        }),
        {
            method: 'GET',
        });
    let data = await response.json();
    createConstructorFromJson(data);
});

function createConstructorFromJson(data) {
    document.querySelector('.databaseId').textContent = data.id;
    document.getElementsByName('title')[0].value = data.title;
    document.getElementsByName('description')[0].value = data.description;
    let addButton = document.getElementById('add-unit-button');
    let questionCount = 1;
    let clickEvent = new Event('click');
    for (const questionData of data.questions) {
        if (questionCount !== 1) {
            addButton.dispatchEvent(clickEvent);
        }
        questionCount++;
        let questions = document.querySelectorAll('.quiz-question');
        let question = questions[questions.length - 1];
        question.querySelector('.databaseId').textContent = questionData.id;
        question.querySelector('.question').value = questionData.content;
        let answerType = id2QuestionType[questionData.typeId];
        let answerTypeSelect = question.querySelector('.answer-type-selector');
        let codeType;
        if (codeTypes.includes(answerType)) {
            codeType = answerType;
            answerType = 'codeEditor';
        }
        answerTypeSelect.value = answerType;
        let changeEvent = new Event('change');
        answerTypeSelect.dispatchEvent(changeEvent);
        question.querySelector("[name='maxScore']").value = questionData.maxScore;
        let answerHolder = question.querySelector(`.${answerType}`);

        if (questionData.options.length === 0 && questionData.correctOptions.length === 0)
            continue;
        if (choiceTypes.includes(answerType)) {
            let addOptionButton = question.querySelector('.add-option-btn');
            for (let i = 1; i <= questionData.options.length - 1; i++) {
                addOptionButton.dispatchEvent(clickEvent);
            }
            let answers = answerHolder.querySelectorAll(`.${answerType}-option`);
            let answerCount = 0;
            for (const answerData of questionData.options) {
                let answer = answers[answerCount];
                answer.querySelector('.databaseId').textContent = answerData.id;
                answer.querySelector('.answer').value = answerData.answer;
                if (isContainsOption(answerData, questionData.correctOptions)) {
                    answer.querySelector('.autocheck-choice').checked = true;
                }
                answerCount++;
            }
        } else if (questionData.correctOptions.length > 0) {
            let autocheckInput = answerHolder.querySelector(".correct-answer");
            if (answerType === 'codeEditor') {
                let codeTypeSelect = question.querySelector('.code-type-select');
                codeTypeSelect.value = codeType;
                codeTypeSelect.dispatchEvent(changeEvent);
                autocheckInput.CodeMirror.setValue(questionData.correctOptions[0].answer);
            } else {
                autocheckInput.value = questionData.correctOptions[0].answer;
            }

            answerHolder.querySelector('.databaseId').textContent = questionData.correctOptions[0].id;
        }
    }
}

function isContainsOption(expectedOption, options) {
    for (const option of options) {
        if (expectedOption.answer === option.answer)
            return true;
    }
    return false;
}