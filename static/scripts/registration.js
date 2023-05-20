let form = document.querySelector('form');
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    var formData = new FormData(form);

    try {
        // Использовать fetch для отправки данных формы
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
        console.log(data);
        console.log(data.message);
    } catch (error) {
        console.error(error); // вывод ошибок в консоль
    }
});