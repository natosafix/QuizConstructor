let form = document.querySelector('form');
let usernameError = document.getElementById('username-error');
let passwordError = document.getElementById('password-error');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    let formData = new FormData(form);
    usernameError.style.display = "none";
    passwordError.style.display = "none";

    try {
        // Использовать fetch для отправки данных формы
        const response = await fetch('http://localhost:8080/login/check', {
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