const shoppinglist = [
    [ 'Хлеб',               'bakery'        ],
    [ 'Брюки',              'clothingshop'  ],
    [ 'Булка с орехами',    'bakery'        ],
    [ 'Пирожки',            'bakery'        ],
    [ 'Мясо',               'grocery'       ],
    [ 'Платье',             'clothingshop'  ],
    [ 'Рубашка',            'clothingshop'  ],
    [ 'Роза',               'flowershop'    ],
    [ 'Йогурт',             'grocery'       ],
    [ 'Круасса́н',           'bakery'        ],
    [ 'Нарцисс',            'flowershop'    ],
    [ 'Спагетти',           'grocery'       ],
    [ 'Костюм',             'clothingshop'  ],
    [ 'Рыба',               'grocery'       ],
    [ 'Яблочный пирог',     'bakery'        ],
    [ 'Пальто',             'clothingshop'       ],
    [ 'Рома́шка',            'flowershop'    ],
    [ 'Молоко',             'grocery'       ],
    [ 'Тюльпа́н',            'flowershop'    ],
    [ 'Лилия',               'flowershop'    ],
];

// Перемешивание массива на входе в случайном порядке - для формирования карточкек слов

import { mixArrey } from './commonforgames.js';

// Создание карточек со словами, которые будем перетаскивать.

function cardsCreate(array) {
    let div;
    mixArrey(array);
    let parent_el = document.querySelector('.shoppinglist-cards')

    array.forEach((attrs) => {
        // создание элемента
        div = document.createElement('div');
      
        // добавление классов и других атрибутов
        div.classList.add('shoppinglist-card');
        div.classList.add('draggabeChild');
        div.setAttribute('data-shoptipe', attrs[1]);
        div.setAttribute('draggable', 'true');

        // текст для созданного div
        div.innerHTML = attrs[0]
      
        // внутрь элемента body добавить элемент div
        parent_el.appendChild(div)
    });
} 

document.addEventListener("DOMContentLoaded", cardsCreate(shoppinglist))

// Перетаскивание блоков, импортируем из commonfoegames.js. На вход подаём количество допустимых дочерних элементов (включая изначально существующие доч.эл., если они есть).

import { dragChildOne } from './commonforgames.js';
dragChildOne(1);

import { dragChildHome } from './commonforgames.js';
dragChildHome();

/* Создаём модальное окно "Не все слова распределены". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub. */

const ModalNoAll = new ItcModal({
    title: 'Не закончено распределение слов',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Не все слова распределены по группам, закончи распределение слов перед проверкой.</div>',
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
    let goods = document.querySelectorAll('.shoppinglist-card'); // Получаем все объекты по классу

    goods.forEach(function (elem) {
        let shoptipe = elem.dataset.shoptipe; // Получить значение атрибута data-... 
        let perentShoptipe= elem.parentNode.dataset.shoptipe; // Получить data-... для родителя

        elem.parentNode.style.boxShadow = "none";   // Удаляем красную тень, если ранее были ошибки при проверке

        // Заполняем список значениями правильно/не правильно/не определено(если слово не переташили в таб.)
        if (perentShoptipe === undefined) {
            checkList.push('undefined');
        } else {
            if (perentShoptipe != shoptipe) {
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
    let goods = document.querySelectorAll('.shoppinglist-card'); // Получаем все объекты по классу

    goods.forEach(function (elem) {
        let shoptipe = elem.dataset.shoptipe; // Получить значение атрибута data-... 
        let perentShoptipe= elem.parentNode.dataset.shoptipe; // Получить data-... для родителя

        if (perentShoptipe != shoptipe) {
            elem.parentNode.style.boxShadow = "5px 5px 10px red";   // Добавить в родительский элемент значение атрибута "стиль"
        } else {
            elem.parentNode.style.boxShadow = "none";
        }; 
    })
}

const showerrorsBtnMod = document.querySelector('.modal-btn-showerrors');
showerrorsBtnMod.addEventListener('click', showerrorsBtnModClick);
