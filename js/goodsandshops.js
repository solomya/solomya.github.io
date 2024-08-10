/* Массив для хранения файлов с картинками для товаров с их принадлежностью к типу магазина */
const goodsImg = [
    [ 'bakery.png',        'bakery'     ],
    [ 'bed.png',           'furniture'  ],
    [ 'books.png',         'book'       ],
    [ 'bouquet.png',       'floral'     ],
    [ 'bread.png',         'bakery'     ],
    [ 'cake.png',          'sweet'      ],
    [ 'cat.png',           'pet'        ],
    [ 'dogfood.png',       'pet'        ],
    [ 'dress.png',         'clothing'   ],
    [ 'flowerpot.png',     'floral'     ],
    [ 'food1.png',         'supermarket'],
    [ 'food2.png',         'supermarket'],
    [ 'lego.png',          'toy'        ],
    [ 'magazines.png',     'book'       ],
    [ 'shoes.png',         'shoe'       ],
    [ 'sneakers.png',      'shoe'       ],
    [ 'stationery1.png',   'stationery' ],
    [ 'stationery2.png',   'stationery' ],
    [ 'sweets.png',        'sweet'      ],
    [ 'table.png',         'furniture'  ],
    [ 'teddybear.png',     'toy'        ],
    [ 'tshirt.png',        'clothing'   ],
    [ 'iron.png',          'electronics'],
    [ 'washingmachine.png','electronics'],
];

let mixgoodsImg = []   /* Массив для перемешаных картинок */
let goods; /* Для div с id #googs */
let parents = document.querySelectorAll('#parent'); /* Получаем все объекты с id 'parent' */
let current;

/* Перемешивание массива на входе в случайном порядке */

function mixArrey(array) {

    /*  Алгоритм для перемешивания под названием "Тасование Фишера — Йетса" - проходим по массиву в обратном порядке, меняя местами каждый элемент со случайным элементом, который находится перед ним. */
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));    /* Случайный индекс от 0 до i */
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Создание картинок продуктов

function goodgCreate(array) {
    let div, img;
    mixArrey(array);
    let parent_el = document.querySelector('.goodsshops-goods')

    array.forEach((attrs) => {
        // создание элемента
        div = document.createElement("div");
        img = document.createElement("img");
      
        // добавление классов и других атрибутов
        div.classList.add('goodsshops-product');
        div.setAttribute('id', 'goods');
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-shoptipe', attrs[1]);
      
        // установка пути для картинки
        img.src = 'img/shops/'+ attrs[0];
      
        // внутрь элемента div добавить элемент img
        div.appendChild(img);
      
        // внутрь элемента body добавить элемент div
        parent_el.appendChild(div)
        goods = document.querySelectorAll('#goods'); /* Получаем все объекты с id */
    });
} 

document.addEventListener("DOMContentLoaded", goodgCreate(goodsImg));


/* Перетаскивание слов в таблицу */

goods.forEach(function(elem) {
    elem.addEventListener('dragstart', function(event) {
        current = this;
    });
});

parents.forEach(function(elem) {
    elem.addEventListener('dragover', function(event) {
        event.preventDefault();
    });    
});

parents.forEach(function(elem) {
    elem.addEventListener('drop', function(event) {       
        // В каждый магазин, за исключением Торгового центра (mall), можно перетянуть только 2 товара. Перетаскиваем, только если количество дочерних элементов (получаем его elem.children.length) от 1 до 3 (вывеска магазина + 2 товара)
        if (elem.dataset.shoptipe === 'mall') {
            elem.appendChild(current);
            current.style.width = "17%";
            current.style.margin = "0 0";
            current.style.background = "rgba(255, 255, 255, 0.8)";

        } else {
            if (elem.children.length === 1 || elem.children.length === 2) {
                elem.appendChild(current);
                current.style.width = "29%";
                current.style.margin = "0 5%";
                current.style.background = ""; 
            } else {
                return ModalStockOver.show();
            }    
        }
    });
});

/* Перетаскивание слов обратно на общее поле */

let parentBig = document.querySelectorAll('#parentBig'); /* Получаем все объекты с id */

goods.forEach(function(elem) {
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
        elem.appendChild(current);
        current.removeAttribute('style');
       
    });
});


/* Создаём модальное окно "Склад магазина переполнен". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub. */

const ModalStockOver = new ItcModal({
    title: 'Склад магазина переполнен',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Склад этого магазина переполнен. Отвези товар в другой магазин, или сначала освободи этот магазин от лишнего товара. </div>',
});

/* Создаём модальное окно "Не все товары распределены" */

const ModalNoAll = new ItcModal({
    title: 'Не все товары распределены по магазинам',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Не все товары распределены по магазинам, закончи распределение товаров перед проверкой.</div>',
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

    goods.forEach(function (elem) {
        let shoptipe = elem.dataset.shoptipe; /* Получить значение атрибута data-shoptipe */ 
        let perentShoptipe = elem.parentNode.dataset.shoptipe; /* Получить shoptipe для родителя */

        elem.parentNode.style.boxShadow = "none";   /* Удаляем красную тень, если ранее были ошибки при проверке */

        /* Заполняем список значениями правильно/не правильно/не определено (если слово не переташили в таб.) */
        if (perentShoptipe === undefined) {
            checkList.push('undefined');
        } else {
            if (perentShoptipe != 'mall' && perentShoptipe != shoptipe ) {
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

    parents.forEach(function (elem) {
        elem.style.boxShadow = "none";
        let perentShoptipe = elem.dataset.shoptipe; /* Получить shoptipe для родителя */
        let children =  elem.querySelectorAll('.goodsshops-product')    /* Получить все дочерние эл. с классом */

        // В каждом магазине может быть: 1 ТОВАР, 2 ТОВАРА, или 0 ТОВАР (понимаем по длине массива chilfren), кроме mall (в mall может быть любое количество ЛЮБЫХ товаров). 
        // Если у родителя нет доч.элементов с классом goodsshops-product (нет товаров) или родительский элемент - это mall, ОШИБКИ НЕТ.
        // Если у родетеля есть доч. элементы, сравинваем shoptipe родителя и дочернего эл., если не равны - ОШИБКА.

        if (children.length > 0 && perentShoptipe != 'mall') {
            children.forEach(el => {
                let check = [];
                if (perentShoptipe === el.dataset.shoptipe) {
                    check.push('true')
                } else {
                    check.push('false')
                }
                // Анализируем содержимое списка check.
                if (check.includes('false')) {
                    el.parentNode.style.boxShadow = "8px 8px 15px red";   /* Добавить в родительский элемент значение атрибута "стиль" */
                } else {
                    elem.parentNode.style.boxShadow = "none";
                } 
            })           
        }
    });
}

const showerrorsBtnMod = document.querySelector('.modal-btn-showerrors');
showerrorsBtnMod.addEventListener('click', showerrorsBtnModClick);
