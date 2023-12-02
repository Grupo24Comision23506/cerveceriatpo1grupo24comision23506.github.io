export class Render {
  constructor(containerID) {
    this.container = document.getElementById(containerID);
    this.DATA_API = null;
    this.DOLAR_API = null;
  }


  async fetchData(URL, URL_Dolar, cb, options = {}) {
    try {
      const response_API = await fetch(URL, options);

      const DATA_API = await response_API.json();

      const response_DOLAR = await fetch(URL_Dolar, options);

      const DATA_DOLAR = await response_DOLAR.json();

      const items_DOLAR = DATA_DOLAR[0].casa.compra;
      
      const items_API = cb(DATA_API, items_DOLAR);

      this.#renderInContainer(items_API);

    } catch (error) {
      error(error);
    }
  }

  #renderInContainer(items) {
    this.container.innerHTML = items;
  }
}
