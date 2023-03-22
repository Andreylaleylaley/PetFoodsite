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

export default timer;