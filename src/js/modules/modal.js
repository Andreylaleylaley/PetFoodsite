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

export default modal;
export{closeModal};
export{showModal};