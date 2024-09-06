const breakfast = [
    [ 'friedeggs.png',       'ПРИГОТОВЬ' ],
    [ 'bacon.png',           'САМЫЙ'     ],
    [ 'banana.png',          'ПРИГОТОВЬ' ],
    [ 'carrot.png',          'САМЫЙ'     ],
    [ 'brusselssprouts.png', 'ВКУСНЫЙ'   ],
    [ 'potato.png',          'ВКУСНЫЙ'   ],
    [ 'cherrypie.png',       'ВКУСНЫЙ'   ],
    [ 'blueberry.png',       'ПРИГОТОВЬ' ],
    [ 'icecream.png',        'ЗАВТРАК'   ],
    [ 'cheese.png',          'ЗАВТРАК'   ],
    [ 'hamburger.png',       'ПРИГОТОВЬ' ],
    [ 'mushrooms.png',       'ВКУСНЫЙ'   ],
    [ 'onion.png',           'САМЫЙ'     ],
    [ 'tomato.png',          'ВКУСНЫЙ'   ],
    [ 'orange.png',          'ЗАВТРАК'   ],
    [ 'croissant.png',       'ВКУСНЫЙ'   ],
    [ 'porridge.png',        'САМЫЙ'     ],
    [ 'sandwich.png',        'ПРИГОТОВЬ' ],
    [ 'fish.png',            'САМЫЙ'     ],
    [ 'rice.png',            'ПРИГОТОВЬ' ],
    [ 'avocado.png',         'ВКУСНЫЙ'   ],
    [ 'strawberry.png',      'ЗАВТРАК'   ],
    [ 'lemon.png',           'ВКУСНЫЙ'   ],
    [ 'watermelon.png',      'ЗАВТРАК'   ],
    [ 'broccoli.png',        'ЗАВТРАК'   ],
    ];

// Перемешивание массива на входе в случайном порядке - для формирования карточкек слов

import { mixArrey } from './commonforgames.js';

// Создание карточек со словами, которые будем перетаскивать.

function cardsCreate(array) {
    let div;
    mixArrey(array);
    let parent_el = document.querySelector('.breakfast-secondarypart')

    array.forEach((attrs) => {
        // создание элемента
        div = document.createElement('div');
      
        // добавление классов и других атрибутов
        div.classList.add('breakfast-food');
        div.classList.add('draggabeChild');
        div.setAttribute('draggable', 'true');

        // текст для созданного div
        div.innerHTML = attrs[1]

        // Фон - картинка, указанная в массиве breakfast
        div.style.backgroundImage = 'url(img/2restaurant/breakfast/' +  attrs[0] + ')';
      
        // внутрь элемента body добавить элемент div
        parent_el.appendChild(div)
    });
} 

document.addEventListener("DOMContentLoaded", cardsCreate(breakfast));

// Создаём модальное окно "Убери лишнее". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub.

const ModalOver = new ItcModal({
    title: 'Убери лишнее',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Тарелка уже полная. Если хочешь съесть что-то другое, сначала убери из тарелки лишнюю еду (перетяни картинку на общее поле справа).</div>',
});

// Перетаскивание блоков, импортируем из commonfoegames.js. На вход подаём количество допустимых дочерних элементов (включая изначально существующие доч.эл., если они есть).

import { dragChild } from './commonforgames.js';
dragChild(4, ModalOver);

import { dragChildHome } from './commonforgames.js';
dragChildHome();

/* Создаём модальное окно "Не все слова распределены". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub. */

const ModalNoAll = new ItcModal({
    title: 'Завртак не полный',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Не достаточно плотный завтрак, выбери ещё продукты (их должно быть 4).</div>',
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
    content: '<div style="width: 40%; padding: 1rem"><img src="img/unfortunately.png" alt="unfortunately" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">К сожалению, есть ошибки, не получилась нужная фраза. Попробуй ещё раз.</div>',
    footerButtons: [
        { class: 'btn modal-btn-again', text: 'Начать заново', action: 'refresh'},
        { class: 'btn modal-btn-close', text: 'Закрыть', action: 'close'},
    ]
});

/* Кнопка "ПРОВЕРИТЬ" */

function checkBtnClick() {
    let checkList = []; /* Создаём массив для хранения результатов проверки */
    let phrase = ['ПРИГОТОВЬ', 'САМЫЙ', 'ВКУСНЫЙ', 'ЗАВТРАК' ]
    let parent = document.getElementById('breakfast-mainpart'); // Получаем все объекты по классу
    let words = parent.querySelectorAll('.breakfast-food'); // Получаем все объекты по классу у найденного родителя

    words.forEach(function (elem) {
        let txt = elem.innerHTML; // Получить текст из div 

        console.log(txt)

        // Заполняем список значениями правильно/не правильно/не определено(если слово не переташили в таб.)
        if (phrase.includes(txt)) {
            checkList.push('true');
            phrase = phrase.filter((word) => word !== txt);
        } else {
            checkList.push('false');
        }            
    });

    console.log(checkList)
    console.log(phrase)

    /* Анализируем содержимое списка. */
    if (checkList.length < 4) {
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


/* Кнопка "Начать заново" */

function againBtnClick() {
    location.reload(true);  /* Обновить стрнаицу */
}

const againBtn = document.getElementById('againBtn');
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
    let words = document.querySelectorAll('.adjectgender-words-block'); // Получаем все объекты по классу

    words.forEach(function (elem) {
        let gender = elem.dataset.gener; // Получить значение атрибута data-... 
        let perentGender= elem.parentNode.dataset.gener; // Получить data-... для родителя

        if (perentGender != gender) {
            elem.parentNode.style.boxShadow = "5px 5px 10px red";   // Добавить в родительский элемент значение атрибута "стиль"
        } else {
            elem.parentNode.style.boxShadow = "none";
        }; 
    })
}

const showerrorsBtnMod = document.querySelector('.modal-btn-showerrors');
showerrorsBtnMod.addEventListener('click', showerrorsBtnModClick);
