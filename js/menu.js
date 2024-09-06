const menu = [
    [ 'cake',      'cake1.png',      'cake2.png',      ],
    [ 'fish',      'fish1.png',      'fish2.png',      ],
    [ 'pizza',     'pizza1.png',     'pizza2.png',     ],
    [ 'salad',     'salad1.png',     'salad2.png',     ],
    [ 'soup',      'soup1.png',      'soup2.png',      ],
    [ 'tea',       'tea1.png',       'tea2.png',       ],
    [ 'toast',     'toast1.png',     'toast2.png',     ],
    [ 'icecream',  'icecream1.png',  'icecream2.png',  ],
    [ 'spaghetti', 'spaghetti1.png', 'spaghetti2.png', ],
];
    
// Перемешивание массива на входе в случайном порядке - для формирования карточкек слов

import { mixArrey } from './commonforgames.js';

// Создание карточек со словами, которые будем перетаскивать.

function cardsCreate(array) {
    let div;
    mixArrey(array);
    let parent_el = document.querySelector('.menu-secondarypart')

    array.forEach((attrs) => {
        // создание элемента
        div = document.createElement('div');
      
        // добавление классов и других атрибутов
        div.classList.add('menu-secondarypart-word');
        div.classList.add('draggabeChild');
        div.setAttribute('data-word', attrs[0]);
        div.setAttribute('draggable', 'true');

        // Фон - картинка, указанная в массиве
        div.style.backgroundImage = 'url(img/2restaurant/menu/' +  attrs[1] + ')';


        // внутрь элемента body добавить элемент div
        parent_el.appendChild(div)
    });
} 

document.addEventListener("DOMContentLoaded", cardsCreate(menu))


// Создание карточек на основном поле.

function cardsCreateMain(array) {
    let div;
    mixArrey(array);
    let parent_el = document.querySelector('.menu-mainpart')

    array.forEach((attrs) => {
        // создание элемента
        let divBlock = document.createElement('div');
        let divWord = document.createElement('div');
      
        // добавление классов и других атрибутов
        divBlock.classList.add('menu-mainpart-block');
        divBlock.classList.add('parent');
        divBlock.setAttribute('data-word', attrs[0]);

        divWord.classList.add('menu-mainpart-word');
        divWord.setAttribute('data-word', attrs[0]);

        // Фон - картинка, указанная в массиве
        divWord.style.backgroundImage = 'url(img/2restaurant/menu/' +  attrs[2] + ')';

        // внутрь элемента block добавить элемент divWord
        divBlock.appendChild(divWord)


        // внутрь элемента body добавить элемент div
        parent_el.appendChild(divBlock)
    });
}

document.addEventListener("DOMContentLoaded", cardsCreateMain(menu))


// Перетаскивание блоков, импортируем из commonfoegames.js. На вход подаём количество допустимых дочерних элементов (включая изначально существующие доч.эл., если они есть).

import { dragChildOne } from './commonforgames.js';
dragChildOne(2);

import { dragChildHome } from './commonforgames.js';
dragChildHome();

/* Создаём модальное окно "Не все слова распределены". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub. */

const ModalNoAll = new ItcModal({
    title: 'Не закончено распределение слов',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Не все слова нашли пару, соедини все одинкаовые слова перед проверкой.</div>',
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
    let checkList = []; /* Создаём массив для хранения результатов проверки */
    let words = document.querySelectorAll('.menu-secondarypart-word'); // Получаем все объекты по классу

    words.forEach(function (elem) {
        let dataWord = elem.dataset.word; // Получить значение атрибута data-... 
        let perentDataWord= elem.parentNode.dataset.word; // Получить data-... для родителя

        elem.parentNode.style.boxShadow = "none";   // Удаляем красную тень, если ранее были ошибки при проверке

        // Заполняем список значениями правильно/не правильно/не определено(если слово не переташили в таб.)
        if (perentDataWord === undefined) {
            checkList.push('undefined');
        } else {
            if (dataWord != perentDataWord) {
                checkList.push('false');
            } else {                
                checkList.push('true');
            };    
        }
    });

    /* Анализируем содержимое списка. */
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
    let words = document.querySelectorAll('.menu-secondarypart-word'); // Получаем все объекты по классу

    words.forEach(function (elem) {
        let dataWord = elem.dataset.word; // Получить значение атрибута data-... 
        let perentDataWord= elem.parentNode.dataset.word; // Получить data-... для родителя

        if (dataWord != perentDataWord) {
            elem.parentNode.style.boxShadow = "5px 5px 10px red";   // Добавить в родительский элемент значение атрибута "стиль"
        } else {
            elem.parentNode.style.boxShadow = "none";
        }; 
    })
}

const showerrorsBtnMod = document.querySelector('.modal-btn-showerrors');
showerrorsBtnMod.addEventListener('click', showerrorsBtnModClick);
