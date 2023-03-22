import { closeModal, showModal } from "./modal";
import { postData } from "../services/services";


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

     postData('http://localhost:3000/requests',json)
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
  showModal('.modal', modalTimerId);

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
    closeModal('.modal');
  },4000);
}

fetch('http://localhost:3000/menu') //здесь с помощью фетча мы просто получим нащу базу данных
// после добавления нашей базы данных с помощью  npx json-server db.json прямо из терминала мы берем
//и копируем наши пути и там мы можем обрашаться напрямую к джейсон структурам
//
    .then(data => data.json())
    // .then(res => console.log(res)); //выведется массив меню

}

export default forms;