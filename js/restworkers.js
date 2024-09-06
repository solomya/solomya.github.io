const workers = [
[ 'Шеф-повар',   'chef.png',        'yes',  'Шеф-повар руководит кухней, придумывает новые блюда.' ],
[ 'Повара́',	  'cooks.png',       'yes',  'Повара́ готовят еду.'       ],
[ 'Кондитер',    'confectioner.png', 'yes', 'Кондитер готовит десерты.' ],
[ 'Официант',    'waiter.png',      'yes',  'Официант приносит еду.'    ],
[ 'Метрдоте́ль',  'headwaiter.png',  'yes',  'Метрдоте́ль - главный официант, руководит в зале ресторана.' ],
[ 'Управляющий', 'manager.png',     'yes',  'Руководит всей работой ресторана.' ],
[ 'Уборщик',	 'cleaner.png',     'yes',  'Наводит чистоту.' ],
[ 'Парикмахер',  'hairdresser.png', 'no',   'Стрижёт волосы.'     ],
[ 'Программист', 'programmer.png',  'no',   'Пишет программы для компьютеров.' ],
[ 'Таксист',	 'taxidriver.png',  'no',   'Водит такси.'  ],
[ 'Учитель',	 'teacher.png',     'no',   'Учит детей.'   ],
[ 'Доктор',	     'doctor.png',      'no',   'Лечит людей.'  ],
[ 'Пожарный',	 'firefighter.png', 'no',   'Тушит пожары.' ],
[ 'Строитель',	 'builder.png',     'no',   'Строит дома.'       ],
]

// Перемешивание массива на входе в случайном порядке - для формирования карточкек слов

import { mixArrey } from './commonforgames.js';

// Создание карточек со словами, которые будем перетаскивать, находятся в блоке слева.

function cardsCreate(array) {
    let div;
    mixArrey(array);
    let parent_el = document.querySelector('.restworkers-workers')

    array.forEach((attrs) => {
        // создание элемента
        div = document.createElement('div');
      
        // добавление классов и других атрибутов
        div.classList.add('restworkers-worker');
        div.classList.add('draggabeChild')
        div.setAttribute('data-rest', attrs[2]);
        div.setAttribute('draggable', 'true');

        // текст для созданного div
        div.innerHTML = attrs[0]
      
        // внутрь элемента body добавить элемент div
        parent_el.appendChild(div)
    });
} 

document.addEventListener("DOMContentLoaded", cardsCreate(workers));


// Создаём модальное окно "Убери лишнее". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub.

const ModalOver = new ItcModal({
    title: 'Убери лишнее',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Штат ресторана уже укомплектован. Если нужно нанять ещё кого-то, уволь одного из сотрудников (перетяни карточку с профессией на общее поле справа).</div>',
});


// Перетаскивание блоков на поле с рестораном. На вход подаём количество допустимых дочерних элементов (включая изначально существующие доч.эл., если они есть).

function dragChild(n, modal) {
    let draggabeChild = document.querySelectorAll('.draggabeChild'); // Получаем все объекты с классом
    let parent = document.querySelectorAll('.parent'); // Получаем все объекты с классом
    let current;
    let divBlock, divImg, img;

    draggabeChild.forEach(function(elem) {
        elem.addEventListener('dragstart', function(event) {
            current = this;
        });
    });
    
    parent.forEach(function(elem) {
        elem.addEventListener('dragover', function(event) {
            event.preventDefault();
        });    
    });
    
    // Присоединяем блок, если колическво существующих дочерних элементов меньше указнного на входе. Если нет, выводим модальное окно, заданое на входе.

    parent.forEach(function(elem) {
        elem.addEventListener('drop', function(event) {
            if (elem.children.length < n) {

                // создание элемента
                divBlock = document.createElement("div");
                divImg   = document.createElement("div");
                img      = document.createElement("img");
            
                // добавление классов и других атрибутов
                divBlock.classList.add('restworkers-restaurant-block');

                divImg.classList.add('restworkers-restaurant-block-img');

            
                // установка пути для картинки
                // поиск пути для картинки для перетягиваемой профессии
                for (let i = 0; i < workers.length; i++) {
                    if (workers[i][0] == current.innerHTML) {
                        img.src = 'img/2restaurant/restworker/'+ workers[i][1];
                    }}
            
                // внутрь элемента div добавить элемент img
                divImg.appendChild(img);

                // внутрь элемента divBlock добавить элемент divImg
                divBlock.appendChild(divImg);

                // внутрь элемента divBlock добавить перетягиваемый элемент
                divBlock.appendChild(current);

                // внутрь элемента body добавить элемент div
                elem.appendChild(divBlock);

            } else {
                return modal.show();
            }
        });
    });    
}

dragChild(8, ModalOver);

// Перетаскивание блоков обратно на общее поле с удалением картинки

export function dragChildHome() {
    let draggabeChild = document.querySelectorAll('.draggabeChild');
    let parentBig = document.querySelectorAll('#parentBig');
    let current;
    
    draggabeChild.forEach(function(elem) {
        elem.addEventListener('dragstart', function(event) {
            current = this;
        });
    });

    parentBig.forEach(function(elem) {
        elem.addEventListener('dragover', function(event) {
            event.preventDefault();
        });    
    });

    parentBig.forEach(function(elem) {
        elem.addEventListener('drop', function(event) {
            // удаляем картинку
            let elRemove = current.parentNode;

            if (elRemove.className != 'restworkers-workers') {
                elRemove.remove()
            }
            
            // присоединяем элемент на основном поле
            elem.appendChild(current);            
        });
    });
}

dragChildHome();


// Создаём модальное окно "Не все слова распределены". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub.

const ModalNoAll = new ItcModal({
    title: 'Не полностью укомплектован штат ресторана',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Не все нужные сотрудники наняты, продолжи подбор персонала (перетяние ещё карточки с профессиями из блока слева). Всего должно быть 7 работников.</div>',
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
    let worker = document.querySelectorAll('.restworkers-worker'); // Получаем все объекты по классу

    worker.forEach(function (elem) {
        let rest = elem.dataset.rest; // Получить значение атрибута data-rest 
        let perentWorkerCl = elem.parentNode.className; // Получить class для родителя

        elem.parentNode.style.boxShadow = "none";   // Удаляем красную тень, если ранее были ошибки при проверке

        // Заполняем список значениями правильно/не правильно/не определено(если слово не перетащили)
        if (perentWorkerCl === 'restworkers-restaurant-block' &
            rest           === 'yes' ) {
            checkList.push('true');
        } else {
            if (perentWorkerCl === 'restworkers-restaurant-block' &
                rest           === 'no') {
                checkList.push('false');
            }
        };
    });

    // Анализируем содержимое списка.
    if (checkList.length < 7) {
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
    let worker = document.querySelectorAll('.restworkers-worker'); // Получаем все объекты по классу

    worker.forEach(function (elem) {
        let rest = elem.dataset.rest; // Получить значение атрибута data-rest 
        let perentWorkerCl = elem.parentNode.className; // Получить class для родителя
        
        if (perentWorkerCl === 'restworkers-restaurant-block' &
            rest           === 'no') {
            elem.parentNode.style.boxShadow = "5px 5px 10px red";   // Добавить в родительский элемент значение атрибута "стиль"
            }

        if (perentWorkerCl === 'restworkers-restaurant-block' &
            rest           === 'yes') {
            elem.parentNode.style.boxShadow = "none";
            }
    })
}

const showerrorsBtnMod = document.querySelector('.modal-btn-showerrors');
showerrorsBtnMod.addEventListener('click', showerrorsBtnModClick);
