import getData from "../services/getData.js";

export default function menuCard() {
  class MenuCard {
    constructor(coverSrc, coverAlt, title, descr, price, parentSelector) {
      this.coverSrc = coverSrc;
      this.coverAlt = coverAlt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parentSelector = document.querySelector(parentSelector);
      this.usdRate = 41.25;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.usdRate;
    }

    render() {
      const elem = document.createElement("div");
      const { coverSrc, coverAlt, title, descr, price } = this;
      elem.innerHTML = `
        <div class="menu__item">
          <img src="${coverSrc}" alt="${coverAlt}">
          <h3 class="menu__item-subtitle">${title}</h3>
          <div class="menu__item-descr">${descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price.toFixed(2)}</span> грн/день</div>
          </div>
        </div>
      `;
      this.parentSelector.append(elem);
    }
  }

  try {
    getData("http://localhost:9999/menu")
  } catch { }

  // axios.get("http://localhost:9999/menu")
  //   .then(data => {
  //     data.data.forEach(item => {
  //       new MenuCard(item.coverSrc, item.coverAlt, item.title, item.descr, item.price, ".menu__field .container").render();
  //     });
  //   });
}