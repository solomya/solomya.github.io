const singPlur = [
[ 'Дом',	    'Дома'      ],
[ 'Ребёнок',	'Дети'      ],
[ 'Стол',	    'Столы'     ],
[ 'Стул',	    'Стулья'    ],
[ 'Друг',	    'Друзья'    ],
[ 'Собака',	    'Собаки'    ],
[ 'Глаз',	    'Глаза'     ],
[ 'Цветок',	    'Цветы'     ],
[ 'Брат',	    'Братья'    ],
[ 'Мост',	    'Мосты'     ],
[ 'Карандаш',	'Карандаши' ],
[ 'Лес',	    'Леса'      ],
[ 'Город',	    'Города'    ],
[ 'Дерево',	    'Деревья'   ],
[ 'Человек',	'Люди'      ],
[ 'Гора',	    'Горы'      ],
]

// Перемешивание массива на входе в случайном порядке - для формирования карточкек слов

import { mixArrey } from './commonforgames.js';

// Создание карточек со словами, которые будем перетаскивать, находятся в блоке с слассом onemany-secondarypart.

function cardsCreate(array) {
    let div;
    mixArrey(array);
    let parent_el = document.querySelector('.onemany-secondarypart')

    array.forEach((attrs) => {
        // создание элемента
        div = document.createElement('div');
      
        // добавление классов и других атрибутов
        div.classList.add('onemany-plural');
        div.classList.add('draggabeChild')
        div.setAttribute('data-basicnoun', attrs[0]);
        div.setAttribute('draggable', 'true');

        // текст для созданного div
        div.innerHTML = attrs[1]
      
        // внутрь элемента body добавить элемент div
        parent_el.appendChild(div)
    });
} 

document.addEventListener("DOMContentLoaded", cardsCreate(singPlur));

// Создание карточек со словами, для которых будет подбираться пара, их перетаскивать нельзя, находятся в блоке с слассом onemany-mainpart.

function mainCardsCreate(array) {
    let divNode, divChild;
    mixArrey(array);
    let parent_el = document.querySelector('.onemany-mainpart')

    array.forEach((attrs) => {
        // создание элемента
        divNode = document.createElement('div');
        divChild = document.createElement('div');
      
        // добавление классов и других атрибутов
        divNode.classList.add('onemany-couple');
        divNode.classList.add('parent')
        divNode.setAttribute('data-basicnoun', attrs[0]);

        divChild.classList.add('onemany-singular');

        // текст для мозданного div
        divChild.innerHTML = attrs[0];
      
        // внутрь элемента body добавить элемент div
        parent_el.appendChild(divNode);
        divNode.appendChild(divChild)
    });
} 

document.addEventListener("DOMContentLoaded", mainCardsCreate(singPlur));

// Создаём модальное окно "Убери лишнее". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub.

const ModalOver = new ItcModal({
    title: 'Убери лишнее',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Нельзя присоединить больше одной карточки. Сначала убери лишнюю карточку.</div>',
});

// Перетаскивание блоков, импортируем из commonfoegames.js. На вход подаём количество допустимых дочерних элементов (включая изначально существующие доч.эл., если они есть).

import { dragChild } from './commonforgames.js';
dragChild(2, ModalOver);

import { dragChildHome } from './commonforgames.js';
dragChildHome();


// Создаём модальное окно "Не все слова распределены". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub.

const ModalNoAll = new ItcModal({
    title: 'Не закончено формирование пар',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Не для всех карточек найдена пара.</div>',
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
    let plural = document.querySelectorAll('.onemany-plural'); // Получаем все объекты по классу

    plural.forEach(function (elem) {
        let pluralBasicnoun = elem.dataset.basicnoun; // Получить значение атрибута data-basicnoun 
        let perentBasicnoun = elem.parentNode.dataset.basicnoun; // Получить basicnoun для родителя

        elem.parentNode.style.boxShadow = "rgba(0,0,0,.8) 3px -3px 8px -3px";   // Удаляем красную тень, если ранее были ошибки при проверке

        // Заполняем список значениями правильно/не правильно/не определено(если слово не перетащили)
        if (perentBasicnoun === undefined) {
            checkList.push('undefined');
        } else {
            if (perentBasicnoun != pluralBasicnoun) {
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

//  Кнопка "Начать заново" в МОДАЛЬНОМ окне - закрыть модальное окно и обновленить страницу

function againBtnModClick() {
    ModalСheckUnsucces.hide();
    location.reload(true);
}
const againBtnMod = document.querySelector('.modal-btn-again'); // Обращаемся к єтой кнопке по классу, т.к. модальное окно создавалось из конструктора (набор файлов modal.css и modal.js)
againBtnMod.addEventListener('click', againBtnModClick);

// Кнопка "Показать ошибки" в МОДАЛЬНОМ окне

function showerrorsBtnModClick() {
    ModalСheckUnsucces.hide();
    let plural = document.querySelectorAll('.onemany-plural'); // Получаем все объекты по классу

    plural.forEach(function (elem) {
        let pluralBasicnoun = elem.dataset.basicnoun; // Получить значение атрибута data-basicnoun 
        let perentBasicnoun = elem.parentNode.dataset.basicnoun; // Получить basicnoun для родителя

        if (pluralBasicnoun != perentBasicnoun) {
            elem.parentNode.style.boxShadow = "5px 5px 10px red";   // Добавить в родительский элемент значение атрибута "стиль"
        } else {
            elem.parentNode.style.boxShadow = "rgba(0,0,0,.8) 3px -3px 8px -3px";
        }; 
    })
}

const showerrorsBtnMod = document.querySelector('.modal-btn-showerrors');
showerrorsBtnMod.addEventListener('click', showerrorsBtnModClick);
