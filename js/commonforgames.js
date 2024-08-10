// Этот файл НЕ ДОЛЖЕН подключаться к html, здесь только функции, которые потом подключаются к основному файлу js через ключевые слова export/import. 
// При подключении основного файла в html ОБЯЗАТЕЛЬНО указать type="module" ( <script type="module" src="js/onemany.js"></script>)
// В этом файле перед подключаемыми функциями ставим export, это даёт возможность использовать её в другом js файле.
// В целевом js файле импортируем эту функцию, прописав строку:
// import { funcName } from './commonfoegames.js'; (указать имя функции и js файл-источник)

// Перетаскивание бллоков. На вход подаём количество допустимых дочерних элементов (включая изначально существующие доч.эл., если они есть). При поаытке присоединить лишний элемент, выдаётся модальное окно.

export function dragChild(n, modal) {
    let draggabeChild = document.querySelectorAll('.draggabeChild'); // Получаем все объекты с классом
    let parent = document.querySelectorAll('.parent'); // Получаем все объекты с классом
    let current;

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
                elem.appendChild(current);
            } else {
                return modal.show();
            }
        });
    });    
}

// Перетаскивание бллоков. На вход подаём количество допустимых дочерних элементов (включая изначально существующие доч.эл., если они есть). При попытке присоединить лишний элемент, последний элемент ураляется из родителя и переносится на общее поле. Имеет смысл использовать, если присоединить к родитель можно ТОЛЬКО 1 дочерний элемент. Модильное окно не выводится

export function dragChildOne(n) {
    let draggabeChild = document.querySelectorAll('.draggabeChild'); // Получаем все объекты с классом
    let parent = document.querySelectorAll('.parent'); // Получаем все объекты с классом
    let current;

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
    
    // Присоединяем блок, если колическво существующих дочерних элементов меньше указнного на входе. Если нет, удаляем ПОСЛЕННИЙ дочерний элемент у родителя и переносим его на общее поле.

    parent.forEach(function(elem) {
        elem.addEventListener('drop', function(event) {
            if (elem.children.length < n) {
                elem.appendChild(current);
            } else {
                let tempRemovedChild = elem.children[n-1];
                let parentBig = document.querySelector('#parentBig');

                elem.removeChild(tempRemovedChild);
                elem.appendChild(current);
                parentBig.appendChild(tempRemovedChild);
            }
        });
    });    
}


// Перетаскивание блоков обратно на общее поле

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
            elem.appendChild(current);       
        });
    });
}

// Перетаскивание КЛОНИРУЕМЫХ блоков. На вход подаём количество допустимых дочерних элементов (включая изначально существующие доч.эл., если они есть). При попытке присоединить лишний элемент, последний элемент БЕЗВОЗВРАТНО удаляется из родителя. Имеет смысл использовать, если присоединить к родитель можно ТОЛЬКО 1 дочерний элемент. Модильное окно не выводится

export function dragChildСlone(n) {
    let draggabeChild = document.querySelectorAll('.draggabeChild'); // Получаем все объекты с классом
    let parent = document.querySelectorAll('.parent'); // Получаем все объекты с классом
    let current;

    draggabeChild.forEach(function(elem) {
        elem.addEventListener('dragstart', function(event) {
            current = elem.cloneNode(true); // Клонируем div
        });
    });
    
    parent.forEach(function(elem) {
        elem.addEventListener('dragover', function(event) {
            event.preventDefault();
        });    
    });
    
    // Присоединяем блок, если колическво существующих дочерних элементов меньше указнного на входе. Если нет, удаляем ПОСЛЕННИЙ дочерний элемент у родителя.

    parent.forEach(function(elem) {
        elem.addEventListener('drop', function(event) {
            if (elem.children.length < n) {
                elem.appendChild(current);
            } else {
                let tempRemovedChild = elem.children[n-1];

                elem.removeChild(tempRemovedChild);
                elem.appendChild(current);
            }
        });
    });    
}


// Кнопка "Начать заново" на игровом поле - обновление страницы
export function againBtnClick() {
    location.reload(true);  /* Обновить стрнаицу */
}

// Перемешивание массива на входе в случайном порядке. Алгоритм для перемешивания под названием "Тасование Фишера — Йетса" - проходим по массиву в обратном порядке, меняя местами каждый элемент со случайным элементом, который находится перед ним.

export function mixArrey(ar) {
    for (let i = ar.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Случайный индекс от 0 до i
        [ar[i], ar[j]] = [ar[j], ar[i]];
    }
}


