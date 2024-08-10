/* Добавляем верхнее меню из topmenu.html */
$(function(){
  $("#includedContent").load("topmenu.html"); 
});

// Для открытия в отдельном окне в поноэкранном режиме. В файле реьд ссылка должна быть оформлена так: 
// <a href="#" onClick="fullScreen2('city_les1_hesheit.html');return false;">Текст ссылки</a>
function fullScreen2(theURL) {
  window.open(theURL, '','height='+screen.height+',width='+screen.width+',screenX=0,screenY=0,left=0,top=0,resizable=no');
}

// Для открытия в отдельном окне в поноэкранном режиме и без адресной строки. Тогда ссылка д.б. оформлена так:
//   <a href="#" onClick="fullscreen3(document.documentElement);return false;">Текст ссылки</a>
// Открывает то-же окно, в котором прописана ссылка.
function fullscreen3(element) {
  if(element.requestFullScreen) {
      element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
  }
}