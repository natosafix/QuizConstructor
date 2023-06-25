let form = document.querySelector('form');
let usernameError = document.getElementById('username-error');
let passwordError = document.getElementById('password-error');
let repeatPasswordError = document.getElementById('repeat-password-error');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    let formData = new FormData(form);
    usernameError.style.display = "none";
    passwordError.style.display = "none";
    repeatPasswordError.style.display = "none";

    // жоска навалил
    if (document.querySelector("#password").value !== document.querySelector("#confirm-password").value) {
        repeatPasswordError.innerText = "Пароли не совпадают";
        repeatPasswordError.style.display = "block";
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/registration/check', {
            redirect: 'follow',
            method: 'POST',
            body: formData
        });
        if (response.redirected) {
            // Если было перенаправление, обновляем URL в браузере
            window.location.href = response.url;
            return;
        }
        const data = await response.json();
        if (data.type === "username") {
            usernameError.innerText = data.message;
            usernameError.style.display = "block";
        }
        if (data.type === "password") {
            passwordError.innerText = data.message;
            passwordError.style.display = "block";
        }
        console.log(data);
        console.log(data.message);
    } catch (error) {
        console.error(error);
    }
});

document.querySelector('#login-redirect-button')
    .addEventListener('click', () => window.location.href = 'http://localhost:8080/login');