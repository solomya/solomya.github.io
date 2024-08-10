const storyParts = [
    [ 'part1', 'Однажды в городе открылся ма́ленький магазин игрушек. Но в нём продава́ли игрушки со всего мира: из Италии, России, Франции, Японии, Австралии...' ],
    [ 'part2', 'Но магазин этот был необы́чный! Каждое лето он закрыва́лся. Игрушки уезжали домой. Каждый – в свою страну. На целое лето!' ],
    [ 'part3', 'Осенью игрушки возвра́щались обратно. Они стояли на полках и ждали, пока их кто-нибудь купит. Им хотелось попа́сть в дом к хорошим детям. Почему?' ],
    [ 'part4', 'Потому что тогда они смогут расска́зывать своему хозяину интере́сные истории. О далёких города́х и стра́нах. О путеше́ствиях и приключе́ниях. ' ],
]

// Перемешивание массива на входе в случайном порядке - для формирования карточкек слов

import { mixArrey } from './commonforgames.js';

// Создание карточек, которые будем перетаскивать, находятся в блоке с слассом toyshopstory-secondarypart.

function cardsCreate(array) {
    let div;
    mixArrey(array);
    let parent_el = document.querySelector('.toyshopstory-secondarypart')

    array.forEach((attrs) => {
        // создание элемента
        div = document.createElement('div');
      
        // добавление классов и других атрибутов
        div.classList.add('toyshopstory-parts');
        div.classList.add('draggabeChild')
        div.setAttribute('data-part', attrs[0]);
        div.setAttribute('draggable', 'true');

        // текст для мозданного div
        div.innerHTML = attrs[1]
      
        // внутрь элемента body добавить элемент div
        parent_el.appendChild(div)
    });
} 

document.addEventListener("DOMContentLoaded", cardsCreate(storyParts));

// Перетаскивание блоков, импортируем из commonforgames.js. На вход подаём количество допустимых дочерних элементов (включая изначально существующие доч.эл., если они есть).

import { dragChildOne } from './commonforgames.js';
dragChildOne(1);

import { dragChildHome } from './commonforgames.js';
dragChildHome();

// Создаём модальное окно "Текст не полный". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub.

const ModalNoAll = new ItcModal({
    title: 'Текст не полный',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Не все кусочки истории нашли своё  место.</div>',
    footerButtons: [
        { class: 'btn modal-btn-close', text: 'Закрыть', action: 'close'},
    ]
});

// Создаём модальное окно "Проверка прошла успешно".

const ModalСheckSucces = new ItcModal({
    title: 'Проверка прошла успешно',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/congratulations.png" alt="congratulations" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Поздравляем! Задание выполнено успешно.</div>',
    footerButtons: [
        { class: 'btn modal-btn-close', text: 'Закрыть', action: 'close'},
    ]
});

// Создаём модальное окно "Проверка не пройдена".

const ModalСheckUnsucces = new ItcModal({
    title: 'Проверка не пройдена',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/unfortunately.png" alt="unfortunately" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">К сожалению, есть ошибки. Попробуй ещё раз.</div>',
    footerButtons: [
        { class: 'btn modal-btn-again', text: 'Начать заново', action: 'refresh'},
        { class: 'btn modal-btn-showerrors', text: 'Показать ошибки', action: 'show'},
        { class: 'btn modal-btn-close', text: 'Закрыть', action: 'close'},
    ]
});

// Кнопка "ПРОВЕРИТЬ"

function checkBtnClick() {
    let checkList = []; // Создаём массив для хранения результатов проверки
    let parts = document.querySelectorAll('.toyshopstory-parts'); // Получаем все объекты по классу

    parts.forEach(function (elem) {
        let partNomber = elem.dataset.part; // Получить значение атрибута data-... 
        let perentPartNomber = elem.parentNode.dataset.part; // Получить data-... для родителя

        elem.parentNode.style.boxShadow = "rgba(0,0,0,.8) 3px -3px 8px -3px";   // Удаляем красную тень, если ранее были ошибки при проверке

        // Заполняем список значениями правильно/не правильно/не определено(если слово не перетащили)
        if (perentPartNomber === undefined) {
            checkList.push('undefined');
        } else {
            if (perentPartNomber != partNomber) {
                checkList.push('false');
            } else {                
                checkList.push('true');
            };    
        }
    });

    // Анализируем содержимое списка.
    if (checkList.includes('undefined')) {
        return ModalNoAll.show();
    } else {
        if (checkList.includes('false')) {
            return ModalСheckUnsucces.show();
        } else {
            return ModalСheckSucces.show();
        }
    }
};

const checkBtn = document.getElementById('checkBtn'); // Создали переменную и привязали её к кнопке
checkBtn.addEventListener('click', checkBtnClick);    // Вызываем функцию по нажатию кнопки

// Кнопка "Начать заново" на игровом поле (обновить страницу)

import { againBtnClick } from './commonforgames.js';
const againBtn = document.querySelector('#againBtn');
againBtn.addEventListener('click', againBtnClick);

//  Кнопка "Начать заново" в МОДАЛЬНОМ окне - закрыть модальное окно и обновить страницу

function againBtnModClick() {
    ModalСheckUnsucces.hide();
    location.reload(true);
}
const againBtnMod = document.querySelector('.modal-btn-again'); // Обращаемся к єтой кнопке по классу, т.к. модальное окно создавалось из конструктора (набор файлов modal.css и modal.js)
againBtnMod.addEventListener('click', againBtnModClick);

// Кнопка "Показать ошибки" в МОДАЛЬНОМ окне

function showerrorsBtnModClick() {
    ModalСheckUnsucces.hide();
    let parts = document.querySelectorAll('.toyshopstory-parts'); // Получаем все объекты по классу

    parts.forEach(function (elem) {
        let partNomber = elem.dataset.part; // Получить значение атрибута data-basicnoun 
        let perentPartNomber = elem.parentNode.dataset.part; // Получить basicnoun для родителя

        if (perentPartNomber != partNomber) {
            elem.parentNode.style.boxShadow = "5px 5px 10px red";   // Добавить в родительский элемент значение атрибута "стиль"
        } else {
            elem.parentNode.style.boxShadow = "rgba(0,0,0,.8) 3px -3px 8px -3px";
        }; 
    })
}

const showerrorsBtnMod = document.querySelector('.modal-btn-showerrors');
showerrorsBtnMod.addEventListener('click', showerrorsBtnModClick);
