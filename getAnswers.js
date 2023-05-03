function submitClicked() {
    if (document.querySelector("form").checkValidity()) {
        parseAnswers();
    }
}

function parseAnswers() {
    const data = {};

    let i = 0;
    for (const elem of document.querySelectorAll(".element")) {
        i++;
        const name = "q" + i;
        const nodes = document.getElementsByName(name);

        if (nodes.length === 1) {
            data[name] = nodes[0].value;
            continue;
        }

        data[name] = [];

        for (const q of nodes) {
            if (q.checked)
                data[name].push(q.value);
        }
    }

    console.log(data)
}