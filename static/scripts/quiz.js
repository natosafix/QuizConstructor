class Timer {
    constructor(durationInSeconds, display, onFinish) {
        this.seconds = durationInSeconds;
        this.display = display;
        this.onFinishAction = onFinish;

        this.redColorAt = 60;
    }

    startTimer() {
        let minutes, seconds;

        const countdown = () => {
            minutes = parseInt(this.seconds / 60, 10);
            seconds = parseInt(this.seconds % 60, 10);

            const minutesStr = minutes < 10 ? "0" + minutes : minutes;
            const secondsStr = seconds < 10 ? "0" + seconds : seconds;

            this.display.textContent = minutesStr + ":" + secondsStr;

            if (--this.seconds < 0) {
                this.stopTimer();
                this.onFinish();
            }

            if (seconds <= this.redColorAt && minutes === 0) {
                this.display.style.color = "red";
            }
        };

        countdown();
        this.intervalId = setInterval(countdown, 1000);
    }

    onFinish() {
        this.onFinishAction();
    }

    stopTimer() {
        clearInterval(this.intervalId);
    }
}

function setTimer() {
    const startTime = new Date(quizData.startTime);
    const endTime = new Date(quizData.endTime);

    const seconds = (endTime - startTime) / 1000;

    timer = new Timer(seconds, document.querySelector("#time"), quizFinished);
    timer.startTimer();
}

let timer;

function hideTimer() {
    document.querySelector("#time").style.display = "none";
}

function showThanks() {
    document.querySelectorAll(".thanks").forEach(x => x.style.display = "block");
    document.querySelector("form").style.display = "none";
    document.querySelector(".under-blocks button[form='myForm']").style.display = "none";
}

async function quizFinished() {
    hideTimer();
    showThanks();
    await sendAnswers();
}

async function submitClicked() {
    if (document.querySelector("form").checkValidity()) {
        timer.stopTimer();
        await quizFinished();
    }
}

async function sendAnswers() {
    const answers = []
    const questionCount = document.querySelectorAll(".element").length;

    for (let i = 1; i <= questionCount; i++) {
        const nodes = document.getElementsByName("q" + i);

        if (nodes.length === 1) {
            answers.push(nodes[0].value);
            continue;
        }

        const t = [];

        for (const q of nodes) {
            if (q.checked) {
                t.push(q.value);
            }
        }

        answers.push(t);
    }
    console.log(JSON.stringify(answers));

    const response = await fetch('http://localhost:8080/db/apiRequest', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({method: "saveAnswers", data: answers})
    });
}

let mainPageButton = document.querySelector('#main-page-button');
mainPageButton.addEventListener('click', () => window.location.href = 'http://localhost:8080/');

let sendAnswersButton = document.querySelector('#send-answers-button');
sendAnswersButton.addEventListener('click', submitClicked);