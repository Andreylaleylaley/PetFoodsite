'use strict';
import tabs  from './modules/tabs';
import modal from './modules/modal';
import timer  from './modules/timer';
import cards from  './modules/cards';
import forms  from './modules/forms';
import slider from  './modules/slider';
import calc  from './modules/calc';
import { showModal } from './modules/modal';



window.addEventListener('DOMContentLoaded', () => { // DOMCONTENTLOADED ждет пока весь контент в браузере загрузится
    // ниже полкючаем наши файлы джс с помощью синтаксиса команд джс и это все будут функции
    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId),3000);  
tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
modal('[data-modal', '.modal', modalTimerId);
timer('.timer','2023-12-12');
cards();
forms('form', modalTimerId);
slider( {
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
    
});
calc();
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








  

