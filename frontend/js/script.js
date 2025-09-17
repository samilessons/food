"use strict";

window.addEventListener("DOMContentLoaded", function () {
  // tabs start
  const tabHeadersParent = document.querySelector(".tabheader__items");
  const tabHeaders = tabHeadersParent.querySelectorAll(".tabheader__item ");
  const tabContents = document.querySelectorAll(".tabcontent");

  // function for hiddeing all tabs and all active classes
  function hideTabContentsAndActiveClasses() {
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].classList.remove("show", "fade");
      tabContents[i].classList.add("hide");
      tabHeaders[i].classList.remove("tabheader__item_active");
    }
  }

  // function for showing current tab and adding active class for current header
  function showTabContentsAndActiveClasses(i = 0) {
    tabContents[i].classList.remove("hide");
    tabContents[i].classList.add("show", "fade");
    tabHeaders[i].classList.add("tabheader__item_active");
  }

  hideTabContentsAndActiveClasses();
  showTabContentsAndActiveClasses();

  // event delegation
  tabHeadersParent.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".tabheader__item")) {
      for (let i = 0; i < tabHeaders.length; i++) {
        if (e.target == tabHeaders[i]) {
          hideTabContentsAndActiveClasses();
          showTabContentsAndActiveClasses(i);
        }
      }
    }
  });
  // tabs end

  // timer start
  const endTime = "2025-12-31 23:59:59";

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    let days, hours, minutes, seconds;

    if (total <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24));
      hours = Math.floor(total / (1000 * 60 * 60) % 24);
      minutes = Math.floor((total / 1000 / 60) % 60);
      seconds = Math.floor((total / 1000) % 60);
    }

    return { total, days, hours, minutes, seconds };
  }

  function setZero(n) {
    return n >= 0 && n < 10 ? `0${n}` : n;
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector);
    const daysElem = timer.querySelector("#days");
    const hoursElem = timer.querySelector("#hours");
    const minutesElem = timer.querySelector("#minutes");
    const secondsElem = timer.querySelector("#seconds");

    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const { total, days, hours, minutes, seconds } = getTimeRemaining(endTime);

      daysElem.textContent = setZero(days);
      hoursElem.textContent = setZero(hours);
      minutesElem.textContent = setZero(minutes);
      secondsElem.textContent = setZero(seconds);

      if (total <= 0) clearInterval(timeInterval);
    }
  }

  setClock(".timer", endTime);
  // timer end

  // modal start
  const openModalTriggers = document.querySelectorAll("[data-modal-open]");
  const modal = document.querySelector(".modal");

  const modalTimerId = setTimeout(openModal, 320000);

  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("show");
    document.body.style.overflowY = "auto";
    clearTimeout(modalTimerId);
  }

  function openModal() {
    modal.classList.remove("hidden");
    modal.classList.add("show");
    document.body.style.overflowY = "hidden";
    clearTimeout(modalTimerId);
  }

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  if (!modal.matches(".hidden") && !modal.matches(".show")) {
    modal.classList.add("hidden");
  }

  openModalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      if (modal.classList.contains("hidden")) openModal();
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target && e.target === modal || e.target.matches("[data-modal-close]")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape' && modal.matches(".show")) closeModal();
  });

  window.addEventListener("scroll", showModalByScroll);
  // modal end

  // MenuCard start
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

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню \"Фитнес\"",
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и
              фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким
              качеством!`,
    5.55,
    ".menu__field .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и
              качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    13.33,
    ".menu__field .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Меню \"Постное\"",
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов
              животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет
              тофу и импортных вегетарианских стейков.`,
    10.42,
    ".menu__field .container"
  ).render();
  // MenuCard end

  // forms start
  const forms = document.querySelectorAll("form");
  forms.forEach(form => postData(form));

  const MESSAGES = {
    loading: "Загрузка...",
    success: "Спасибо ! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так... Попробуете снова !"
  };

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const loading = document.createElement("div");
      loading.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
      `;
      loading.innerHTML = `<img src="icons/spinner.svg"/> <span>${MESSAGES.loading}</span>`;
      form.insertAdjacentElement("beforeend", loading);

      const formData = new FormData(e.target);

      const request = new XMLHttpRequest();
      request.open("POST", "http://localhost:4200/support/");
      request.setRequestHeader("Content-type", "application/json");
      
      request.send(JSON.stringify(Object.fromEntries(formData)));
      e.target.reset();

      request.addEventListener("load", (e) => {
        if (request.status === 200) {
          showResponseModal(MESSAGES.success, loading);
        } else {
          showResponseModal(MESSAGES.failure, loading);
        }
      });
    });
  }

  function showResponseModal(message, loading) {
    loading.remove();
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal();

    const responeModal = document.createElement("div");
    responeModal.classList.add("modal__dialog");
    responeModal.innerHTML = `
      <div class="modal__content">
        <div data-modal-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    modal.append(responeModal);

    const srmID = setTimeout(() => {
      responeModal.remove();
      prevModalDialog.classList.remove("hide");
      prevModalDialog.classList.add("show");
      closeModal();
      clearTimeout(srmID);
    }, 2500);
  }
  // forms end
}); 