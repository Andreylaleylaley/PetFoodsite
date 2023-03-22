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

  export{postData};
  export{getResource};


  