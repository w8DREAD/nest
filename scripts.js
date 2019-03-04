window.onload = () => {
    var btn = document.getElementById('btn');
    var inputs = document.getElementsByTagName('input');

    btn.addEventListener('click', function () {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/login');
        //создание данных пользователя
        var userData = {
            username: inputs[0].value,
            password: inputs[1].value
        };
        // установка типа контента на сервер
        xhr.setRequestHeader('Content-type', 'application/json');
        //отправка данных
        xhr.send(JSON.stringify(userData));

        xhr.onload = () => {
            alert(this.responseText);
        };

        xhr.onerror = () => {
            alert('Server error');
        };
    });
};