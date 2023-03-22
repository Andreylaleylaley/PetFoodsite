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

export default tabs;