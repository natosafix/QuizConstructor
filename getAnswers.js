function submitClicked() {
    if (document.querySelector("form").checkValidity()) {
        parseAnswers();
    }
}

function parseAnswers() {
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

    alert(JSON.stringify(answers))
}