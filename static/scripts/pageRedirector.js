let mainPageButton = document.querySelector('#main-page-button');
mainPageButton.addEventListener('click', () => window.location.href = 'http://localhost:8080/');
let textInfo = document.querySelector('#text-info');
let user = document.querySelector('.auth-signup-button').textContent;
let groupId = parseInt(document.querySelector('#group-id').textContent);
document.addEventListener('DOMContentLoaded', async function () {
    let response = await fetch('http://localhost:8080/db/apiRequest?',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                method: "group/addUser",
                data: {login: user, groupId: groupId}
            }),
            method: 'POST'
        });
    if (!response.ok) {
        textInfo.textContent = "Вы не можете воспользоваться приглашением";
    } else {
        textInfo.textContent = "Вы были добавлены в группу";
    }
});