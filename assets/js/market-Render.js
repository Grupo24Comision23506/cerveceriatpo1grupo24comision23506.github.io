const { log, error } = console;

export class Render {
  constructor(containerID) {
    this.container = document.getElementById(containerID);
    this.DATA_API = null;
    this.DOLAR_API = null;
  }


  async fetchData(URL, URL_Dolar, cb, options = {}) {
    try {
      const response_API = await fetch(URL, options);
      // log('Response API: ', response_API);

      const DATA_API = await response_API.json();
      // log('Data API: ', DATA_API);

      const response_DOLAR = await fetch(URL_Dolar, options);
      // log('Response DOLAR: ', response_DOLAR);

      const DATA_DOLAR = await response_DOLAR.json();
      // log('Data DOLAR: ', DATA_DOLAR);

      const items_DOLAR = DATA_DOLAR[0].casa.compra;
      // log('Items DOLAR: ', items_DOLAR);
      
      const items_API = cb(DATA_API, items_DOLAR);
      // log('Items API: ', items_API);

      // const resultado = items_API * items_DOLAR.compra
      // log('Resultado: ', resultado);

      this.#renderInContainer(items_API);

    } catch (error) {
      error(error);
    }
    // fetch(URL, options)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     log(data)
    //     if (!cb) {
    //       log(data);
    //       return;
    //     }

    //     let items = cb(data);
    //     this.#renderInContainer(items);
    //   });
  }

  #renderInContainer(items) {
    this.container.innerHTML = items;
  }
}
