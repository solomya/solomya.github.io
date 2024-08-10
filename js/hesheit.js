const hesheitWordsHW = [
    [ 'Ку́ртка',     'she'   ],
    [ 'Дом',        'he'    ],
    [ 'Море',       'it'    ], 
    [ 'Дерево',     'it'    ],
    [ 'Поле',       'it'    ],
    [ 'Стол',       'he'    ],
    [ 'Окно',       'it'    ],
    [ 'Рубашка',    'she'   ],
    [ 'Небо',       'it'    ],
    [ 'Ручка',      'she'   ],
    [ 'Шкаф',       'he'    ],
    [ 'Стул',       'he'    ],
    [ 'Шапка',      'she'   ],
    [ 'Сумка',      'she'   ],
    [ 'Ку́хня',      'she'   ],
    [ 'Каранда́ш',   'he'    ],
    [ 'Шарф',       'he'    ],
    [ 'Лето',       'it'    ],
];

const hesheitWords = [
    [ 'Вода',       'she'   ],
    [ 'Торт',       'he'    ],
    [ 'Мясо',       'it'    ],
    [ 'Яблоко',     'it'    ],
    [ 'Морóженое',  'it'    ],
    [ 'Шокола́д',    'he'    ],
    [ 'Вишня',      'she'   ],
    [ 'Огуре́ц',     'he'    ],
    [ 'Молокó',     'it'    ],
    [ 'Мука́',       'she'   ],
    [ 'Анана́с',     'he'    ],
    [ 'Конфе́та',    'she'   ],
]

// Перемешивание массива на входе в случайном порядке - для формирования карточкек слов

import { mixArrey } from './commonforgames.js';

// Создание карточек со словами, которые будем перетаскивать.

function cardsCreate(array) {
    let div;
    mixArrey(array);
    let parent_el = document.querySelector('.hesheit_words')

    array.forEach((attrs) => {
        // создание элемента
        div = document.createElement('div');
      
        // добавление классов и других атрибутов
        div.classList.add('hesheit_words-block');
        div.classList.add('draggabeChild');
        div.setAttribute('data-gener', attrs[1]);
        div.setAttribute('draggable', 'true');

        // текст для созданного div
        div.innerHTML = attrs[0]
      
        // внутрь элемента body добавить элемент div
        parent_el.appendChild(div)
    });
} 

if (document.title === 'HE/SHE/IT(HW)') {
    document.addEventListener("DOMContentLoaded", cardsCreate(hesheitWordsHW))
} else if (document.title === 'HE/SHE/IT') {
    document.addEventListener("DOMContentLoaded", cardsCreate(hesheitWords))
}


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
    let words = document.querySelectorAll('.hesheit_words-block'); // Получаем все объекты по классу

    words.forEach(function (elem) {
        let gender = elem.dataset.gener; // Получить значение атрибута data-... 
        let perentGender= elem.parentNode.dataset.gener; // Получить data-... для родителя

        elem.parentNode.style.boxShadow = "none";   // Удаляем красную тень, если ранее были ошибки при проверке

        // Заполняем список значениями правильно/не правильно/не определено(если слово не переташили в таб.)
        if (perentGender === undefined) {
            checkList.push('undefined');
        } else {
            if (perentGender != gender) {
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
    let words = document.querySelectorAll('.hesheit_words-block'); // Получаем все объекты по классу

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
