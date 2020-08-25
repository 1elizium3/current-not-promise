// let options = {
//     width: 1366,
//     height: 768,
//     background: 'red',
//     font: {
//         size: '16px',
//         color: '#fff'
//     }
// };

// // console.log(JSON.stringify(options));
// console.log(JSON.parse(JSON.stringify(options)));


let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', (e) => {
    // Проверка на NaN 
    if (isNaN(e.target.value)) {
        inputUsd.value = "Введите число";
        return false;
    }
    let request = new XMLHttpRequest();

    // request.open(method, url, async, login, pass);
    request.open('GET', 'current.json');
    request.setRequestHeader('Countent-type', 'application/json; charset=utf-8');
    request.send();

    // status - содержит http Код освета сервера (200, 404, 501 и проч)
    // statusText - содержит текстовое описание ответа сервера (ОК, Not Found...)
    // responseText / response - содержит текст ответа сервера. Это как раз то что back-end разработчик
    // хочет послать нам со своего рабочего окружения
    // readyState - когда запрос отправляется на сервер он содержит несколько этапов 
    // в своей работе (0 - UNSEND, 1 - OPENED, 2 - HEADERS_RECEIVED, 3 - LOADING, 4 - DONE)

    request.addEventListener('readystatechange', function() {
        if (request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response);

            inputUsd.value = (inputRub.value / data.usd).toFixed(3);
        } else {
            inputUsd.value = "Произошла ошибка!";
        }
    });

});

inputUsd.addEventListener('input', (e) => {
    if (isNaN(e.target.value)) {
        inputRub.value = "Введите число";
        return false;
    };
    
    let request = new XMLHttpRequest();

    request.open('GET', 'current.json');
    request.setRequestHeader('Countent-type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response);

            inputRub.value = (inputUsd.value * data.usd).toFixed(3);
        } else {
            inputRub.value = "Произошла ошибка!";
        }
    });
});

// method - это метод по которому общается клиент с сервером. Чаще всего используются
// это GET (при помощи которого можно Получить данные сервера) 
// и POST (который позволяет нам Отправлять данные на сервер)

// url - это путь к серверу (может быть Локальный файл или облачный)

// async - отвечает за асинзронность запроса. По умолчанию этот параметр стоит true,
// если указать false то пока сервер не ответит мы не сможем взаимодействовать со страницей.

// .setRequestHeader - настройка http запросов

// .send() - запусуаем запрос и этот запрос идёт за ответом к серверу
