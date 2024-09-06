const juicelist = [
    [ 'apple',  'applejuice.png',  'ЯБЛОЧНЫЙ',     'Сок из <strong>яблока</strong> называется...'    ],
    [ 'carrot', 'carrotjuice.png', 'МОРКОВНЫЙ',    'Сок из <strong>моркови</strong> называется...'   ],
    [ 'cherry', 'cherryjuice.png', 'ВИШНЁВЫЙ',     'Сок из <strong>вишни</strong> называется...'     ],
    [ 'grape',  'grapejuice.png',  'ВИНОГРАДНЫЙ',  'Сок из <strong>винограда</strong> называется...' ],
    [ 'orange', 'orangejuice.png', 'АПЕЛЬСИНОВЫЙ', 'Сок из <strong>апельсина</strong> называется...' ],
    [ 'plum',   'plumjuice.png',   'СЛИВОВЫЙ',     'Сок из <strong>сливы</strong> называется...'     ],
    [ 'raspberry',   'raspberryjuice.png',   'МАЛИНОВЫЙ',  'Сок из <strong>малины</strong> называется...'   ],
    [ 'strawberry',  'strawberryjuice.png',  'КЛУБНИЧНЫЙ', 'Сок из <strong>клубники</strong> называется...' ],
    [ 'pomegranate', 'pomegranatejuice.png', 'ГРАНАТОВЫЙ', 'Сок из <strong>граната</strong> называется...'  ],
    [ 'pineapple',   'pineapplejuice.png',   'АНАНАСОВЫЙ', 'Сок из <strong>ананаса</strong> называется...'  ],
];

// Перемешивание массива на входе в случайном порядке - для формирования карточкек слов

import { mixArrey } from './commonforgames.js';

// Создание карточек со словами, которые будем перетаскивать.

function cardsCreate(array) {
    let divJuice, divImg, divTxt, divInputadject, img, form, input;
    mixArrey(array);
    let parent_el = document.querySelector('.juiceadject-juices')

    array.forEach((attrs) => {
        // создание элементов
        divJuice = document.createElement('div');
        divImg = document.createElement('div');
        divTxt = document.createElement('div');
        divInputadject = document.createElement('div');
        img = document.createElement('img');
        form = document.createElement('form');
        input = document.createElement('input');
      
        // добавление классов и других атрибутов
        divJuice.classList.add('juiceadject-juice');
        divJuice.setAttribute('data-juicetipe', attrs[0]);
        divImg.classList.add('juiceadject-juice-img');
        divTxt.classList.add('juiceadject-juice-txt');
        divInputadject.classList.add('juiceadject-juice-inputadject');

        // установка пути для картинки
        img.src = 'img/2restaurant/juice/'+ attrs[1];
        img.alt = attrs[0];

        // текст для созданного divTxt
        divTxt.innerHTML = attrs[3];

        // установка параметров формы form
        form.action = 'getform.php';
        form.method = 'get';

        // установка параметров для input
        input.id = attrs[0];
        input.type = 'text';
        input.name = 'inputadject';                
        input.autocomplete = 'off';                

        // создаём ветку divImg
        divImg.appendChild(img);

        // создаём ветку divInputadject
        form.appendChild(input);
        divInputadject.appendChild(form);


        // создаём ветку divJuice
        divJuice.appendChild(divImg);
        divJuice.appendChild(divTxt);
        divJuice.appendChild(divInputadject);

        // внутрь элемента body добавить элемент div
        parent_el.appendChild(divJuice)
    });
} 

document.addEventListener("DOMContentLoaded", cardsCreate(juicelist))

/* Создаём модальное окно "Не все слова распределены". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub. */

const ModalNoAll = new ItcModal({
    title: 'Не всё заполнено',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Не все соки названы, впиши все слова перед проверкой.</div>',
    footerButtons: [
        { class: 'btn modal-btn-close', text: 'Закрыть', action: 'close'},
    ]
});

/* Создаём модальное окно "Проверка прошла успешно". */

const ModalСheckSucces = new ItcModal({
    title: 'Проверка прошла успешно',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/congratulations.png" alt="congratulations" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Поздравляем! Задание выполнено успешно.</div>',
    footerButtons: [
        { class: 'btn modal-btn-close', text: 'Закрыть', action: 'close'},
    ]
});

/* Создаём модальное окно "Проверка не пройдена". */

const ModalСheckUnsucces = new ItcModal({
    title: 'Проверка не пройдена',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/unfortunately.png" alt="unfortunately" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">К сожалению, есть ошибки. Попробуй ещё раз.</div>',
    footerButtons: [
        { class: 'btn modal-btn-again', text: 'Начать заново', action: 'refresh'},
        { class: 'btn modal-btn-showerrors', text: 'Показать ошибки', action: 'show'},
        { class: 'btn modal-btn-close', text: 'Закрыть', action: 'close'},
    ]
});

/* Кнопка "ПРОВЕРИТЬ" */

function checkBtnClick() {
    let checkList = []; // Создаём массив для хранения результатов проверки
    
    let inpAdject = document.querySelectorAll('.juiceadject-juice-inputadject input[name="inputadject"]'); // Получаем все объекты input c name="inputadject"

    inpAdject.forEach(function (elem) {
        let inpId = elem.id; // Получить id 
        let inpTxt= elem.value.toUpperCase(); /// Получить введённое пользователем значение и перевести в верхний регистр (для сравнения со значением в массиве juicelist)

        elem.closest('div').style.boxShadow = "0px 0px 15px black";  // Удаляем красную тень, если ранее были ошибки при проверке

        // Заполняем список значениями правильно/не правильно/не определено(если слово не переташили в таб.)
        if (inpTxt === '') {
            checkList.push('undefined');
        } else {
            // поиск в массиве juicelist прилагательного
            for (let i = 0; i < juicelist.length; i++) {
                if (juicelist[i][0] == inpId & inpTxt == juicelist[i][2]) {
                    checkList.push('true');
                };
                if (juicelist[i][0] == inpId & inpTxt != juicelist[i][2]) {
                    checkList.push('false');
                }
            }
        } 
    });

    console.log(checkList)

    /* Анализируем содержимое списка. */
    if (checkList.includes('undefined')) {
        return ModalNoAll.show();
    }
    if (checkList.includes('false')) {
        return ModalСheckUnsucces.show();
    } else {
        return ModalСheckSucces.show();
    }
};

const checkBtn = document.getElementById('checkBtn'); /* Создали переменную и привязали её к кнопке */
checkBtn.addEventListener('click', checkBtnClick);    /* Вызываем функцию по нажатию кнопки */


// Кнопка "Начать заново" на игровом поле (обновить страницу)

import { againBtnClick } from './commonforgames.js';
const againBtn = document.querySelector('#againBtn');
againBtn.addEventListener('click', againBtnClick);

/* Кнопка "Начать заново" в МОДАЛЬНОМ окне */

function againBtnModClick() {
    ModalСheckUnsucces.hide();
    location.reload(true);
}

const againBtnMod = document.querySelector('.modal-btn-again');
againBtnMod.addEventListener('click', againBtnModClick);

/* Кнопка "Показать ошибки" в МОДАЛЬНОМ окне */

function showerrorsBtnModClick() {
    ModalСheckUnsucces.hide();
    let inpAdject = document.querySelectorAll('.juiceadject-juice-inputadject input[name="inputadject"]'); // Получаем все объекты input c name="inputadject"

    inpAdject.forEach(function (elem) {
        let inpId = elem.id; // Получить id 
        let inpTxt= elem.value.toUpperCase(); // Получить введённое пользователем значение и перевести в верхний регистр (для сравнения со значением в массиве juicelist)


        for (let i = 0; i < juicelist.length; i++) {
            if (juicelist[i][0] == inpId & inpTxt != juicelist[i][2]) {
                elem.closest('div').style.boxShadow = "0px 0px 15px red";   // Добавить в родительский элемент значение атрибута "стиль"
            } 
            if (juicelist[i][0] == inpId & inpTxt == juicelist[i][2]) {
                elem.closest('div').style.boxShadow = "0px 0px 15px black";
            }
        }
    })
}

const showerrorsBtnMod = document.querySelector('.modal-btn-showerrors');
showerrorsBtnMod.addEventListener('click', showerrorsBtnModClick);
