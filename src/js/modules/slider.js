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

export default slider;