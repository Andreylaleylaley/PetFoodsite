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


export default calc;