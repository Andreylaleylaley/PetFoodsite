import { getResource } from "../services/services";


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
       getResource('http://localhost:3000/menu')
       .then(data => {
          data.forEach(({img,altimg, title, descr, price}) => { //мы обрашаемся дата.дата потому что аксиос сначал возвращает обьект в котором как свойство лежат наши данные
              new ItemStructure(img,altimg, title, descr, price,'.menu .container').createStructure();
        });
      });
}

export default cards;