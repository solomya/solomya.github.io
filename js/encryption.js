const alfabet = [
    [ '1',  'А' ],
    [ '2',  'Б' ],
    [ '3',  'В' ],
    [ '4',  'Г' ],
    [ '5',  'Д' ],
    [ '6',  'Е' ],
    [ '7',  'Ё' ],
    [ '8',  'Ж' ],
    [ '9',  'З' ],
    [ '10',	'И' ],
    [ '11',	'Й' ],
    [ '12',	'К' ],
    [ '13',	'Л' ],
    [ '14',	'М' ],
    [ '15',	'Н' ],
    [ '16',	'О' ],
    [ '17',	'П' ],
    [ '18',	'Р' ],
    [ '19',	'С' ],
    [ '20',	'Т' ],
    [ '21',	'У' ],
    [ '22',	'Ф' ],
    [ '23',	'Х' ],
    [ '24',	'Ц' ],
    [ '25',	'Ч' ],
    [ '26',	'Ш' ],
    [ '27',	'Щ' ],
    [ '28',	'Ъ' ],
    [ '29',	'Ы' ],
    [ '30',	'Ь' ],
    [ '31',	'Э' ],
    [ '32',	'Ю' ],
    [ '33',	'Я' ],
    [ '34',	',' ],
    [ '35',	'.' ],
    [ '36',	':' ],
]

/* const phrase = [
    [ '1', 'МАГАЗИН,', 'В', 'КОТОРОМ', 'МОЖНО', 'КУПИТЬ', 'ХЛЕБ', 'И', 'ПИРОГ.' ]
] */

const riddle = [
    [ 'М', 'А', 'Г', 'А', 'З', 'И', 'Н', ',' ], 
    [ 'В' ], 
    [ 'К', 'О', 'Т', 'О', 'Р', 'О', 'М' ],
    [ 'М', 'О', 'Ж', 'Н', 'О' ], 
    [ 'К', 'У', 'П', 'И', 'Т', 'Ь' ], 
    [ 'Х', 'Л', 'Е', 'Б' ], 
    [ 'И' ],
    [ 'П', 'И', 'Р', 'О', 'Г', '.' ],
]

const riddleAnswer = ['Б', 'У', 'Л', 'О', 'Ч', 'Н', 'А', 'Я' ]



// Создание блоков с алфавитом.

function alfabetCreate(array) {
    let divBlock, divLetter, divNomber;
    let parent_el = document.querySelector('.encryption-alphabet')

    array.forEach((attrs) => {
        // создание элемента
        divBlock  = document.createElement('div');
        divLetter = document.createElement('div');
        divNomber = document.createElement('div');
      
        // добавление классов и других атрибутов
        divBlock.classList.add('encryption-alphabet-block');

        divLetter.classList.add('encryption-alphabet-letter')
        divLetter.classList.add('draggabeChild')
        divLetter.setAttribute('data-letter', attrs[1]);
        divLetter.setAttribute('draggable', 'true');

        divNomber.classList.add('encryption-alphabet-nomber')

        // текст для созданного div
        divLetter.innerHTML = attrs[1]
        divNomber.innerHTML = '- ' + attrs[0]

        // Соединить созданніе div в ветку
        divBlock.appendChild(divLetter)
        divBlock.appendChild(divNomber)

        // внутрь элемента body добавить элемент div
        parent_el.appendChild(divBlock)
    });
} 

document.addEventListener("DOMContentLoaded", alfabetCreate(alfabet));

// Создание зашифрованных блоков.

function EnryptionCreate(array) {
    let divWord, divLettercode, divCode, divLetter;
    let parent_el = document.querySelector('.encryption-mainpart-riddle')

    array.forEach((attrs) => {
        // создание элемента
        divWord  = document.createElement('div');

        // добавление классов и других атрибутов
        divWord.classList.add('encryption-mainpart-riddle-word');

        attrs.forEach((i) => {  
            // создание элементов 
            divLettercode = document.createElement('div');
            divCode = document.createElement('div');
            divLetter = document.createElement('div');

            // добавление классов и других атрибутов
            divLettercode.classList.add('encryption-mainpart-lettercode');

            divCode.classList.add('encryption-mainpart-code');

            divLetter.classList.add('encryption-mainpart-letter');
            divLetter.classList.add('parent');
            divLetter.setAttribute('data-letter', i);   // Создаём атрибут data-letter, куда записываем букву, соответствующую коду


            // текст для созданного divCode. Нужно превратить букву в цифру из alfabet.
            let AlfabetNoLevel = alfabet.flat() // Превратили вложенный массив в одноуровневый

            let index = AlfabetNoLevel.findIndex((letter) => letter===i)    // Получили индекс буквы

            // Записали соседнее значение с буквой (что соответсвует её номеру) в тело html 
            divCode.innerHTML = AlfabetNoLevel[index-1];
            divLetter.innerHTML = '';


            // Соединить созданніе div в ветку
            divLettercode.appendChild(divCode);
            divLettercode.appendChild(divLetter);
            divWord.appendChild(divLettercode);

            // внутрь элемента body добавить элемент div
            parent_el.appendChild(divWord);          
        });
    });
} 

document.addEventListener("DOMContentLoaded", EnryptionCreate(riddle));

// Создание блоков под ответ.

function answerCreate(array) {
    let divAnswerLetter;
    let parent_el = document.querySelector('#answer')

    
    array.forEach((item) => {
        /* let answerLetter = [Array.from(i) ]; */ // Превратили слово из массива в массив букв. */

        // создание элемента
        divAnswerLetter  = document.createElement('div');

        // добавление классов и других атрибутов
        divAnswerLetter.classList.add('encryption-mainpart-letter');
        divAnswerLetter.classList.add('parent');
        divAnswerLetter.setAttribute('data-letter', item);   // Создаём атрибут data-letter, куда записываем букву, соответствующую коду


        // внутрь элемента body добавить элемент div
        parent_el.appendChild(divAnswerLetter);
    });
} 

document.addEventListener("DOMContentLoaded", answerCreate(riddleAnswer));

// Перетаскивание клонируемых блоков, импортируем из commonforgames.js. На вход подаём количество допустимых дочерних элементов (включая изначально существующие доч.эл., если они есть).

import { dragChildСlone } from './commonforgames.js';
dragChildСlone(1);

// Кнопка "Начать заново" на игровом поле (обновить страницу)

import { againBtnClick } from './commonforgames.js';
const againBtn = document.querySelector('#againBtn');
againBtn.addEventListener('click', againBtnClick);

// Создаём модальное окно "Не всё заполнено". Предварительно к HTML подключены файлы modal.css и modal.js, скачаные с GitHub.

const ModalNoAll = new ItcModal({
    title: 'Не всё заполнено',
    content: '<div style="width: 40%; padding: 1rem"><img src="img/attention.png" alt="attention" style="width: 100%;"></div> <div style="width: 60%;padding: 0.5rem; text-align: justify">Не все буквы на месте. Закончи заполнение.</div>',
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
    let transcript = document.querySelectorAll('.encryption-mainpart-letter'); // Получаем все объекты по классу

    transcript.forEach(function (elem) {
        let letterCorrect = elem.dataset.letter; // Получить значение атрибута data-... 
        let letterCurrent = elem.innerText; // Получить содержимое div

        elem.style.boxShadow = "rgba(0,0,0,.8) 3px -3px 8px -3px";   // Удаляем красную тень, если ранее были ошибки при проверке

        // Заполняем список значениями правильно/не правильно/не определено(если слово не перетащили)
        if (letterCurrent === '') {
            checkList.push('undefined');
        } else {
            if (letterCorrect != letterCurrent) {
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
    let transcript = document.querySelectorAll('.encryption-mainpart-letter'); // Получаем все объекты по классу

    transcript.forEach(function (elem) {
        let letterCorrect = elem.dataset.letter; // Получить значение атрибута data-... 
        let letterCurrent = elem.innerText; // Получить содержимое div

        if (letterCurrent != letterCorrect) {
            elem.style.boxShadow = "5px 5px 10px red";   // Добавить в родительский элемент значение атрибута "стиль"
        } else {
            elem.style.boxShadow = "rgba(0, 0, 0, 0.8) 3px 3px 8px -3px;";
        }; 
    })
}

const showerrorsBtnMod = document.querySelector('.modal-btn-showerrors');
showerrorsBtnMod.addEventListener('click', showerrorsBtnModClick);
