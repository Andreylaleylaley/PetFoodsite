/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age , ratio ; //ratio коэф активности записан в дата атрибутах в верстке
    
    
    if(localStorage.getItem('sex')){
       sex = localStorage.getItem('sex');
    }else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
    }
    
    
    if(localStorage.getItem('ratio')){
      ratio = localStorage.getItem('ratio');
    }else {
     ratio = 1.375;
     localStorage.setItem('ratio', 1.375);
    }
    
    
    function initLocalSettings(selector, activeClass) { //функция для обработки значений с локального хранилища и смены класса активности под элементы согласно данных пользовательяс прошлого захода на сайт
      const elements = document.querySelectorAll(selector); //получаем элементы со страницы
    
      elements.forEach(elem => { //перебираем псевдомассив
        elem.classList.remove(activeClass); //перебираем каждый элемент и удаляем у каждого класс активности
        if(elem.getAttribute('id') === localStorage.getItem('sex')){//условие для верхних блоков с активностью если в элементе содержится айди и в локальном хранилище будет равно полу
          elem.classList.add(activeClass); //то навешиваем на этот элемент класс активности(в локальном хранилище будет указано на каком поле пользователь)
        }
    
        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { // условие для нижних блоков с активностью
          elem.classList.add(activeClass);
    
        }
      });
    }
    
    initLocalSettings('#gender div', 'calculating__choose-item_active'); // gender div означает что мы обращаемся к блокам див внутри айди гендер
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function calcTotal() {
      if(!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return; //пишем реторн для прерывания функции 
      }
      if(sex === 'female'){
        //используем Math.round для округления значения 
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      }else {
        result.textContent = Math.round((88.6 + (13.4* weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
    }
    calcTotal(); //вызываем чтобы значение заданное версткой поменялоссьь на ____
    
    
    function getStaticInformation(selector, activeClass){
      const elements = document.querySelectorAll(selector); // получаем псевдомассив с нашими элементами
      elements.forEach(elem => {
        elem.addEventListener( 'click', (e) => { //на каждый элемент навешиваем обработчик событий
          if(e.target.getAttribute('data-ratio')) { //если наш таргет на странице будет содержать атрибут 'data-ratio' то присваиваем переменной ratio 
            //значение 'data-ratio' а именно числов в это атрибуте
            ratio = +e.target.getAttribute('data-ratio');
            localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
          } else {
            sex = e.target.getAttribute('id');
            localStorage.setItem('sex', e.target.getAttribute('id'));
          }
       
          elements.forEach(elem => { // здесь мы удаляем класс активности на всех элементаъ
            elem.classList.remove(activeClass);
          });
      
          e.target.classList.add(activeClass); //добавляем активность при клике на элемент
          calcTotal(); //вызываем для обновления значения
        });
      });
    
     
    
    }
    //вызываем две функции для разных наших блоков
    //можно было и написать две схожие функции но мы с помощью условий уменьшили код и теперь наша функция многофункциональна 
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
    
    function getDynamicInformation(selector) { // пишем функцию для обработки значений полученных с инпутов со страницу
      const input = document.querySelector(selector); //получаем инпут со страницы
    
      input.addEventListener('input', () => { //навешиваем обработчик на инпут
        if(input.value.match(/\D/g)) { // ставим условие с помощью регулярного выражения что если значения инпута будет НЕ число и глобально на всякий случай
          input.style.border = '1px solid red'; // обводим инпут красным
        } else {
          input.style.border = 'none'; //если все хорошо обнуляем стиль инпута
        }
        switch(input.getAttribute('id')) { //свич для обработки каждого значение свич работат с айди инпута
          case 'height':
            height = +input.value; //присваеваем значения инпута если атрибут айди будет рост
            break;
          case 'weight':
            weight = +input.value;//присваеваем значения инпута если атрибут айди будет вес
            break;
          case 'age':
            age = +input.value;//присваеваем значения инпута если атрибут айди будет возраст
            break;
    
        }
        calcTotal(); //вызываем для обнавления значения
      });
    }
    
    //вызываем фунцкцю для каждого инпута
    getDynamicInformation('#height'); 
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
    
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function cards(){
    class ItemStructure  {
        constructor(src, alt, title, descr,price, parentSelector, ...classes) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.parent = document.querySelector(parentSelector);
          this.classes = classes ;
        }
        createStructure(){
          let div = document.createElement('div');
          this.div = 'menu__item';
          if(this.classes.length === 0){
            div.classList.add(this.div);
          } else {
            this.classes.forEach( className => div.classList.add(className));
          }
      
          div.innerHTML = `
            <img src = "${this.src}"></img> 
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                  <div div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> $/день</div>
                </div>
          
          `;
          this.parent.append(div);
        }
    
    }
    

    
    
    
    
    
    // getResource(' http://localhost:3000/menu')//тут мы обращаемся к фунции гет ресурс получаем с сервера данные после обрабатывает ответ от сервера(это промисс)
    // //с помощью  зена зену даем аргумент дату так как с сервера мы поулучаем меню которое является массивом применяем 
    // //фор ич и тут интересное с помощью этого синтаксиса проводим деструктуризацию обьекта(внутри массива у нас лежит обьект)
    // //и достаем img,altimg, title, descr, price следующие свойства после чего их мы добавляем
    // //в нащ класс-конструктор и вызываем на классе конструкторе метод createStructure();
    //   .then(data => {
    //     data.forEach(({img,altimg, title, descr, price}) => {
    //       new ItemStructure(img,altimg, title, descr, price,'.menu .container').createStructure();
    //     });
    //   });
    
      //есть еще спосо с помощью сторонней библиотеки аксиос заранее подключаем библиотеку аксиос
      //после чего мы так и пишем аксиос и т.д
      //аксиос тоже промисс в чем плюс в том что аксиос автоматически трансформирует в джейсон формат
      //также 
       (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
       .then(data => {
          data.forEach(({img,altimg, title, descr, price}) => { //мы обрашаемся дата.дата потому что аксиос сначал возвращает обьект в котором как свойство лежат наши данные
              new ItemStructure(img,altimg, title, descr, price,'.menu .container').createStructure();
        });
      });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");




function forms(formSelector, modalTimerId){
    const forms = document.querySelectorAll(formSelector); //ПОЛУЧАЕМ формы

const message = { //обьявляем обьект сообщений процесса отправки на сервер данных
  loading: 'icons/spinner.svg',
  success: 'Thaks.We will connect you soon',
  failure:'Thats bad...'
};

forms.forEach(item =>{ //для каждой формы применяем функцию
 bindPostData(item);
}); //перед ТЕСТИРОВАНИЕ СБРОСИТЬ КЕШ НА САЙТЕ SHIFT+ F5





function bindPostData(form){ //функция для отправки формы на сервер
  form.addEventListener('submit', (e)=> { // submit событие отправки формы
    e.preventDefault(); //сбпрос стандартной перезагрузки страницы
    const statusMessage = document.createElement('img'); //добавляем сообщения процесса отправки на страницу
    statusMessage.src = message.loading; //атрибут срс равен свойству обьекта меседж который является путем к картинке
    statusMessage.textContent = message.success;     // текст который будет выводится при отправки формы
    statusMessage.style.cssText = ` 
      display: block;
      margin: 0 auto;
    `; //правильней конечно просто сделать класс в CSS И потом добавить класс к статус меседж но делали тут как препод
    form.insertAdjacentElement('afterend', statusMessage); // метод вставки элемента в определенно положения элемента то есть читаем так вставить в элемент форм элемент статусМеседж
    //в конце
    

 
     //описываем метод HTTP и файл куда будет поститься данные
     // ОПИСЫВАЕМ ФАЙЛ когда мы используем связку XMLHttpRequest и FormData заголовок НАМ УСТАНАВЛИВАТЬ НЕ НУЖНО ОН УСТАНАВЛИВАЕТСЯ АВТОМАТИЧЕСКИ
    const formData = new FormData(form); //не все данные мы передаем в формате джейсон
    //также можно передавать в формате формДейта также там ключ значение 
    //САМОЕ ГЛАВНОЕ ЧТО ПРИ ОБРАБОТКЕ ФОРМ В ФОРМЕ В ВЕРСТКЕ ОБЯЗАЛЬНО ДОЛЖЕН БЫТЬ АТРИБУТ name = ''
    
    
    //==========здесь мы разбираем метод для отправки данных в формате джейсон
    //так как ФОРМ ДАТА нельзя просто так переформатировать в джейсон
    //необходимо перебрать его и запулить в обьект
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
  //в этой строке мы трансформируем нашу формдейту в массив массивов методом ентриес после чего делаем из него
  //обычный обьект методом фроментриес и после чего трансформируем  в джейсон формат методом JSON.stringify
  //получаем переменную джейсон которую передаем в функцию постдата

    // const json = JSON.stringify(object); // трансформация формДаты в джейсон закоментили потому что в бади мы уже трансформируем обьект

     (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests',json)
     .then(data => { //дата это ответ от сервера в этом промисе мы выводим ответ в консоль
          console.log(data); //Выводим в консоль ответ от сервера
          showThanksModal(message.success); //и запускаем что все хорошо
          statusMessage.remove(); //удаляем спиннер
     }).catch(() => { //кэтч ловит ошибки то есть в случае ошибок делает это лучше всегда писать кэтч на всякий случай
          showThanksModal(message.failure);
     }).finally (() => { //после всех промисов сбарсываем форму
      form.reset();
     });

  });
}

function showThanksModal(message) { //функция для модернизации модального окна для показывания сообщения вместо формы что форма отправилась
  const prevModalDialog = document.querySelector('.modal__dialog'); //получаем модальное окно

  prevModalDialog.classList.add('hide');
  (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
    <div class = "modal__content">
      <div class ="modal__close" data-close >×</div>
      <div class ="modal__title">${message}</div>
    </div>
  `;

  document.querySelector('.modal').append(thanksModal);

  setTimeout( () => {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
  },4000);
}

fetch('http://localhost:3000/menu') //здесь с помощью фетча мы просто получим нащу базу данных
// после добавления нашей базы данных с помощью  npx json-server db.json прямо из терминала мы берем
//и копируем наши пути и там мы можем обрашаться напрямую к джейсон структурам
//
    .then(data => data.json())
    // .then(res => console.log(res)); //выведется массив меню

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
'use strcit';
function closeModal (modalSelector){ 
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = 'visible';
}

function showModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // console.log(modalTimerId);
    if(modalTimerId){
      clearInterval(modalTimerId);// если пользователь уже открывал модальное окно
    }

}


function modal(triggerSelector, modalSelector, modalTimerId){
  function showModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // console.log(modalTimerId);
    if(modalTimerId){
      clearInterval(modalTimerId);// если пользователь уже открывал модальное окно
    }

}

    let  modalCall = document.querySelectorAll(triggerSelector), // в квадратных скобках получение по атрибуту 
      modal = document.querySelector(modalSelector); // получаем элементы со страницы



    modalCall.forEach(btn => {
      btn.addEventListener('click', () =>  showModal(modalSelector, modalTimerId)); // создаем тут стрелочную функцию так как нельзя вторым аргументом в обработчик события
      //ставить вызывающейся функцию так как нам надо чтобы она сработала тогкда когда будет клик а не сразу стрелочная функция решает проблему
        });



  modal.addEventListener('click', (e) => { // обработчик события если мы нажимаем вне модального окна
          if(e.target === modal || e.target.getAttribute('data-close') == ''){ //условие закртытия модали если еще и таргет над крестиком
          closeModal(modalSelector); // ХОРОШЕЙ ПРАКТИКОЙ НАПИСАНЯ КОДА ЯВЛЯЕТСЯ ТО ЧТО ЕСЛИ КОД ПОВТОРЯЕТСЯ БОЛЬШЕ ОДНОГО РАЗА ЗНАЧИТ НАДО ЕГО ЗАБИТЬ В ФУНКЦИЮ
}

  });


document.addEventListener('keydown', (e) =>{ // обработчик события если мы нажимаем на клавишу ЕСКЕЙП
    if(e.code === 'Escape'){
      closeModal(modalSelector);
    }
});



// Modal

function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= 
      document.documentElement.scrollHeight - 1) { // -1 пиксель это баг браузера технический
        showModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll); // для того чтобы один раз когда пользователь долистает до конца больше модалка не вызывалась
      } // условие если  количество прокрученных пикселей по вертикали плюс клиентская высота окна браузера
      //будет больше либо равна длинне скролла то это будет означать что пользователь долистал до конца

}
window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    const slider = document.querySelector(container),
       current = document.querySelector(currentCounter),
       total = document.querySelector(totalCounter),
       prevSlide = document.querySelector(prevArrow),
       nextSlide = document.querySelector(nextArrow),
       slides = document.querySelectorAll(slide),
       slidesWrapper = document.querySelector(wrapper,),// получаем обертку слайдера
       slidesField = document.querySelector(field),//получаем поле где будут наши слайдеры
       width = window.getComputedStyle(slidesWrapper).width; //получаем ширину слайда занимаемую
       //на экране



let slideIndex = 1;// обьявляем слайд индекс для слайдов
let offset = 0; //отступ



function addZeroToCount(){
  if(slides.length < 10){ //условие если слайдов меньше 10 подставляем 0 вперед числа
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  }else {
    total.textContent = slides.length;
    current.textContent = slides.length;
  
  }
}
function opacityDots() {
  dots.forEach(dot => dot.style.opacity = '50%');
  dots[slideIndex - 1].style.opacity = 1;
 }
//====описываем наше поле для слайдов
slidesField.style.width = slides.length * 100 + '%'; //тут мы формируем ширину нашего поля на основании количества
//слайдов количество слайдов умножаем на 100 и добавляем в конце проценты и это будет ширина нашего поля
//делается это для того чтобы мы могли поместить все слайды которые у нас есть на странице во внутрь поля
slidesField.style.display = 'flex'; //устнавливаем флекс чтобы все наши элементы были вряд
slidesField.style.transition = '1s all'; //ставим свойство трансишн которое означает скорость смены слайдов

slidesWrapper.style.overflow = 'hidden'; //оверфлоу означает что то что не помещается в блок будет скрыто


slides.forEach( slide => { //перебериаем кажды слайд
  slide.style.width = width; //перебираем все слайды и устанавливаем каждому слайду ширину одного слайда равную ширине враппера со слайдами
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'), //задаем контейнер для кружочков снизу слайдера
      dots = [];
indicators.classList.add('carousel-indicators');
slider.append(indicators);//добавляем наш кружочек в слайдер

for(let i = 0; i <slides.length; i++) {
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i + 1); //добавляем каждому кружку атрибут дата слайд ту и начания с первого(не с нулевого)
  dot.classList.add('dot'); //добавляем ровно столько точек сколько слайдов исходя из цикла

  indicators.append(dot);
  dots.push(dot); //добавляем кружки в новый массив
}

function deleteNotDigits(str){ // функция по удалению всех не цифр со строки
 return +str.replace(/\D/g, '');
}

nextSlide.addEventListener('click', () => { //пишем функцию для следующего слайда
  if (offset == deleteNotDigits(width) * (slides.length - 1)){  //если наш отступ будет равен ширине одного слайда 
    //в нашей ширине с помощью регулярных выражений удаляем ВСЕ НЕ цифры с нашего выржанием и заменяем на ничего так как не передаем ничего
    //допустим у нас 7 слайдов переменная виз содержит ширину занимаемую врапером на странице к примеру 500 получится  500 * 7 = 3500пикселей
    // +width.slice(0,width.length - 2) унарный плюс для преобразования в число метод слайс для того чтобы оставить только число
    //так как переменная width будет еще содержать буквы PX
    //умноженное на количество слайдов минус 1 это означает что мы долистали до самого конца минус 1 потому что свойство ленгт переводит в человеский язык количство слайдов
    //и нам нужно вернуться в начало
    offset = 0; //устанавливаем отступ на 0  возвращаемся в начало слайдов
  } else {
    offset += deleteNotDigits(width); //каждый раз при клике прибалвяем ширину равную ширине враппера
  }
  slidesField.style.transform = `translateX(-${offset}px)`; //transform позволяет вам поворачивать, масштабировать, 
  // наклонять или сдвигать элемент. Оно модифицирует координатное пространство
  //  для CSS визуальной форматируемой модели.
  // translate X означает сместить по оси Х на - офсет минус это сместить влево(на координатной прямой минус слева)
  //то есть будем передвигать прошлый слайд влево и показывать следующий
   if(slideIndex == slides.length) { //если слайд индекс будет равен количеству слайдов
    slideIndex = 1;//возвращаемся в начало
   }else {//если нет
    slideIndex++;//приплюсовываем 1 к слайд индексу
   }
   addZeroToCount();
   opacityDots();
});

prevSlide.addEventListener('click', () => {
  if ( offset == 0 ){   //когда мы нажимаем на кнопу prev и при этом у нас первый слайд мы перемещаемся
    //в самый конец
     offset = deleteNotDigits(width) * (slides.length - 1); //устанавливаем офсет маскимальное значение пикслей
  } else {
    offset -= deleteNotDigits(width); //если офсет не 0 то от офсет отнимает ширину враппера
  }
  slidesField.style.transform = `translateX(-${offset}px)`;  //перемещаем слайды по оси икс
  if(slideIndex == 1) {
    slideIndex = slides.length;
   }else {
    slideIndex--;
   }
   addZeroToCount();
   opacityDots();
});

dots.forEach(dot => { //на наши точки делаем функциональность которая при нажатаии
  //будет позволять переключать слайды
  dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo; //кликнули на четвертую  точку и соответственно в слйд индекс у нас пойдет 4-ка
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      opacityDots();
      addZeroToCount();

  });
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContetnSelector, tabsParentSelector, activeClass){
    const tabs = document.querySelectorAll(tabsSelector), // получаем наши подписи ПОСТНОЕ СБАЛАНСИРОВАННОЕ И Т.Д.
    tabsContent = document.querySelectorAll(tabsContetnSelector,),// Получаем наши дивы которые содержат в себе картинки с едой и описание в отдельном блоке поверх картинки
    tabsParent = document.querySelector(tabsParentSelector); //получаем оберточный блок для всех нащих табхедер айтемов(для последущего делегирования событий)

    function hideTabContent () { 
      tabsContent.forEach(item => { // перебираем наш псевдомассив и назначаем для каждого элемента класс ХАЙД который дисплэй нон и удаляем от туда класс ШОУ И ФЭЙД ЕСЛИ ОНИ НАЗНАЧЕНЫ(ФЭЙД ЭТО АНИМАЦИЯ)
          item.classList.add('hide');
          item.classList.remove('show', 'fade'); // просто записываем инлайновый стиль для этого элемента скрываем все элементы

      }); // перебор всех элементов псевдомассива табсконтент для скрытия их с экрана
      tabs.forEach(tab => {
          tab.classList.remove(activeClass);
      });  // функция по удалению класса активности (НИЖНЕГО подчеркивания в наших надписях)
    }

    function showTabContent (i = 0) { // = 0 это дефолтное значение то есть если функция передается без аргумента по умолчанию будет подставляться 0
      tabsContent[i].classList.add('show', 'fade'); // КЛАССЫ ШОУ ХАЙД У НАС ДОБАВЛЕНЫ В СИ ЭС ЭС НО ИХ НЕТ НА СТРАНИЦЕ НАПРЯМУЮ
      tabsContent[i].classList.remove('hide');

      tabs[i].classList.add('tabheader__item_active');
    } // эта функция для вывода таба табу будет присваиваться класс ШОУ и ФЭЙД  также подписи сбоку будет нижнее подчеркивание АЙ тут это будет соответсвовать номеру таба
    hideTabContent();
    showTabContent();  //вызов обеих функций для удаления всего лишнего с сайта и чтобы не поплыла верстка

    tabsParent.addEventListener('click', (event) => {  //используем делегирование событий для тэбспэрент
      const target = event.target; //чтобы каждый раз не писать ивент таргет обьявляем переменную 
      if(target && target.classList.contains(tabsSelector.slice(1))) { //если есть таргет и он содержит табхедер__айтем то обьявляем перебор в псевдомассиве табс
          tabs.forEach( (item, i) => { //  метод слайс на таб селектор нужен для того чтобы подставить название селектора без точки
              if (target == item) { // кликнули мы в третий таб начинается перебор и как только  ай =3 и таргет равно трем вызываются две наших функции  
              hideTabContent();
              showTabContent(i); //сюда будет подставлятся номер по порядку перебора

              }
          });
      }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline){
    function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - new Date(), // тоже самое что и new Date() здесь мы получим количеству миллисекунд котороое и будет нашим конечным временем
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // t делим на на скобках(миллисек умножаем на 60 секунд умножаем на 60 минут и 24 часа) и в скобках получается дни
            hours = Math.floor( (t / (1000 * 60 * 60) % 24) ), // Т делим на (милисекунды умнодаем на секунды умножаем на минуты и делим на 24 и в остатке у нас появятся часы которые мы округкляем до целого)
            minutes = Math.floor( (t / 1000 / 60 ) % 60), // получае сначало количество миллисекунд потом количество секунд и количество минут
            seconds = Math.floor( (t / 1000) % 60); // все просто делим на количество миллисекунд и в остатке получаем секунды
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
        }

        function getZero(num) { // делаем функцию помощник  эта функция нужна для того чтобы мы подставляли ноль к часам и минутам на странице
          if(num >= 0 && num <10) {
            return ` 0${num}`;
          }else {
            return num;
          }
        }
      function setClock(selector, endtime) {  // делаем функцию для запуливания нашего таймера на страницу 
        const timer = document.querySelector(selector), // передаем аргументов селектор чтобы наша функция могла использоваться по всей странице(в селектор будет передаваться элемент со страницы где должен будет отображен таймер)
              days = timer.querySelector('#days'),  // забиваем сюда наши уникальные айди со страницы
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock,1000); // создаем сет интервал который будет запускать функцию апдейтклок каждую секунду
          updateClock(); // сюда мы вставляем апдейт клок для того чтобы не моргала наша верстка так как мы при запуске сначало выполнится весь сет клок потом только апдейт
          // мы же сразу запустим апдейт клок после сетклок после ее выполнения она удалится и и все будет работать без моргания в верстке
        function updateClock (){
          const t = getTimeRemaining(endtime);  // вызываем нашу функцию с полученным значением наших дней часов и т.д.
          days.innerHTML = getZero(t.days); //  с помощью иннера ХТМЛ мы мы присваиваем нашим полученным селекторам значения из функции гетТаймРемейнинг
          hours.innerHTML = getZero(t.hours);
          minutes.innerHTML = t.minutes;
          seconds.innerHTML = t.seconds;


          if (t.total <=0){ // если время вышло (идет в отрицательную сторону) останавливаем таймер
            clearInterval(timeInterval);
          }
        }
      }
    setClock(id, deadline);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => { //пишем функцию для взаимодействия с беком
    //передаем аргументы url и data которые будут означать путь и данные которые мы хотим запостить
  //что важно про этот код знать
  //есть такие плюшки восьмого стандарта как async/await которые позволяют асинхронный код сделать наподобии синхронного или проще сказать поставить на паузу определенные действия
  //переменной резалт присвоется значения промисса фетч еще до ответа с сервера что плохо также функция постдата вернет переменную ресалт которая будет undefined
  //поэтому мы юзаем async/await важно понимать где их ставить асинк мы поставили перед началом всей функции а вот эвайт мы поставили перед присвоением значения переменной
  //эвайт ставим там где хотим дождаться ответа от асинхронного кода
      const res =  await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: data
      });//наша функция получает какие либо данные после чего их фетчит и после в переменную рес будет записан ответ от сервера
      //который мы вернем в формате джейсон
      return await res.json(); //рес будет промисом и возвращаться будет промисс который мы в дальнейшем обработаем
  };


  const getResource = async (url) => { //функция для получения данных с сервера 
    //тут просто мы аргументом передаем юрл в последствии с помощью фетча мы переходим по этому
    //юрлу и возвращаем ответ от сервера в формате json
      const res =  await fetch(url); //теперь будем вспоминать 
      if(!res.ok){
        throw new Error(`Cold not fetch ${url}, status${res.status}`);
      }
      return await res.json(); 
  };

  
  


  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");












window.addEventListener('DOMContentLoaded', () => { // DOMCONTENTLOADED ждет пока весь контент в браузере загрузится
    // ниже полкючаем наши файлы джс с помощью синтаксиса команд джс и это все будут функции
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimerId),3000);  
(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal', '.modal', modalTimerId);
(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer','2023-12-12');
(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])( {
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
    
});
(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});




        
 




//есть второй способ добавление айтем на страницу без классов так называемая верстка на лету
// getResource('http://localhost:3000/menu')
//   .then(data => creatCard(data));

// function creatCard(data) {
//   data.forEach(({img,altimg, title, descr, price}) => {
//     const element = document.createElement('div');

//     element.classList.add('menu__item');
//     element.innerHTML = `
//     <img src = "${img}" alt ="${altimg}"></img> 
//         <h3 class="menu__item-subtitle">${title}</h3>
//         <div class="menu__item-descr">${descr}</div>
//         <div class="menu__item-divider"></div> // этот метод тоже имеет место быть тут нет контекста вызова и код вроде как будет поменьше чем через классы
 //здесь у нас нет шаблонизации этот метод тоже часто испольуетя и его лушче юзать когда только один раз нам нужно сделать карточки
//         <div class="menu__item-price">
//               <div div class="menu__item-cost">Цена:</div>
//               <div class="menu__item-total"><span>${price}</span> грн/день</div>
//             </div>
//     `;
//   });
// }








  


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map