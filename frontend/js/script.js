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

  axios.get("http://localhost:9999/menu")
    .then(data => {
      data.data.forEach(item => {
        new MenuCard(item.coverSrc, item.coverAlt, item.title, item.descr, item.price, ".menu__field .container").render();
      });
    });
  // MenuCard end

  // forms start
  const forms = document.querySelectorAll("form");
  forms.forEach(form => postWrapperData(form));

  const MESSAGES = {
    loading: "Загрузка...",
    success: "Спасибо ! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так... Попробуете снова !"
  };

  function postWrapperData(form) {
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
      const data = JSON.stringify(Object.fromEntries(formData.entries()));
      // fetch("http://localhost:4200/support/"
      // postData(
      //   "http://localhost:9999/support",
      //   data
      // )
      axios.post("http://localhost:9999/support", data)
        .then(response => {
          if (response.status === 201) {
            showResponseModal(MESSAGES.success);
          } else {
            showResponseModal(MESSAGES.failure);
          }
        })
        .catch(e => {
          showResponseModal(MESSAGES.failure);
        })
        .finally(() => {
          loading.remove();
          e.target.reset();
          axios.get("http://localhost:9999/support")
            .then(data => console.log(data));
        });
    });
  }

  function showResponseModal(message) {
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

  // slider start
  const sliderParent = document.querySelector(".offer__slider");
  const slides = document.querySelectorAll(".offer__slide");
  const prevBtn = document.querySelector(".offer__slider-prev");
  const nextBtn = document.querySelector(".offer__slider-next");
  const current = document.querySelector("#current");
  const total = document.querySelector("#total");
  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  const slidesInner = document.querySelector(".offer__slider-inner");
  
  // slider new version start
  let slideIndex = 1;
  let baseOffset = 0;
  const wrapperWidth = parseFloat(window.getComputedStyle(slidesWrapper).width);
  
  setCurrentAndTotal(current, slideIndex);
  setCurrentAndTotal(total, slides.length);

  slidesWrapper.style.overflow = "hidden";
  slidesInner.style.cssText = `
    width: ${100 * slides.length}%;
    transition: 0.4s all ease;
    display: flex;
  `;
  slides.forEach(slide => slide.style.width = wrapperWidth);

  sliderParent.style.position = "relative";

  const dotsWrapper = document.createElement("ul");
  dotsWrapper.classList.add("dots__wrapper");

  const dots = [];

  sliderParent.append(dotsWrapper);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    dot.setAttribute("data-slide-to", i + 1);
    if (i == 0) {
      dot.classList.add("active__dot");
    }
    dotsWrapper.append(dot);
    dots.push(dot);
  }

  nextBtn.addEventListener("click", () => {
    if (baseOffset == wrapperWidth * (slides.length - 1)) {
      baseOffset = 0;
    } else {
      baseOffset += wrapperWidth;
    }
    mathCurrentAndTotal("next");
    setCurrentAndTotal(current, slideIndex);
    setSliderTransform();
    setActiveDot();
  });

  prevBtn.addEventListener("click", () => {
    if (baseOffset == 0) {
      baseOffset = wrapperWidth * (slides.length - 1);
    } else {
      baseOffset -= wrapperWidth;
    }
    mathCurrentAndTotal("prev");
    setCurrentAndTotal(current, slideIndex);
    setSliderTransform();
    setActiveDot();
  });

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const slideTo = parseInt(e.target.dataset.slideTo);
      
      slideIndex = slideTo;
      baseOffset = wrapperWidth * (slideTo - 1);
      setSliderTransform();
      setActiveDot();
      setCurrentAndTotal(current, slideIndex);
    });
  });

  function mathCurrentAndTotal(state) {
    switch (state) {
      case "next":
        if (slideIndex == slides.length) {
          slideIndex = 1;
        } else {
          ++slideIndex;
        }
        break;
      case "prev":
        if (slideIndex == 1) {
          slideIndex = slides.length;
        } else {
          --slideIndex;
        }
        break;
    }
  }

  function setCurrentAndTotal(block, index) {
    if (slides.length < 10) {
      block.textContent = `0${index}`;
    } else {
      block.textContent = index;
    }
  }

  function setActiveDot() {
    dots.forEach(dot => dot.classList.remove("active__dot"));
    dots[slideIndex - 1].classList.add("active__dot");
  }

  function setSliderTransform() {
    slidesInner.style.transform = `translateX(-${baseOffset}px)`;
  }
  // slider new version end

  // slider old version start
  // let slideIndex = 1;

  // function setCurrentAndTotal(block, index) {
  //   if (slides.length < 10) {
  //     block.textContent = `0${index}`;
  //   } else {
  //     block.textContent = index; 
  //   }
  // }

  // function showSldes(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(slide => {
  //     slide.classList.add("hide");
  //     slide.classList.remove("show", "fade");
  //   });

  //   slides[slideIndex - 1].classList.remove("hide");
  //   slides[slideIndex - 1].classList.add("show", "fade");

  //   setCurrentAndTotal(current, slideIndex);
  // }

  // function changeSlidesN(n) {
  //   showSldes(slideIndex += n);
  // }
  
  // changeSlidesN(0);
  // setCurrentAndTotal(total, slides.length);
  // prevBtn.addEventListener("click", () => changeSlidesN(-1));
  // nextBtn.addEventListener("click", () => changeSlidesN(1));
  // slider old version start
  // slider end

  // global functions
  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: data
    });

    // return await res.json();
    return res;
  }

  async function getData(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Не удалось получить ${url}, статус - ${res.status}`);
    }

    return await res.json();
  }

  // calorie calculator
  const calculatingResult = document.querySelector(".calculating__result span");
  let gender, height, weight, age, pac;

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");
  
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");

  const state = {
    gender: "",
    pac: "",
    height: "",
    weight: "",
    age: "",
  };

  getStaticInformationFromLS("gender", "female");
  getStaticInformationFromLS("pac", 1.375);

  getDynamicInformationFromLS("height", 170, "#height");
  getDynamicInformationFromLS("weight", 70, "#weight");
  getDynamicInformationFromLS("age", 30, "#age");

  gender = state.gender;
  pac = state.pac;
  height = state.height;
  weight = state.weight;
  age = state.age;

  function getStaticInformationFromLS(key, defaultValue) {
    if (localStorage.getItem(key)) {
      state[key] = localStorage.getItem(key);
    } else {
      state[key] = defaultValue;
      localStorage.setItem(key, defaultValue);
    }
  }

  function getDynamicInformationFromLS(key, defaultValue, selector) {
    if (localStorage.getItem(key)) {
      state[key] = localStorage.getItem(key);
      document.querySelector(selector).value = state[key];
    } else {
      state[key] = defaultValue;
      document.querySelector(selector).value = defaultValue;
      localStorage.setItem(key, defaultValue);
    }
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.dataset.gender === localStorage.getItem("gender")) {
        elem.classList.add(activeClass);
      }

      if (elem.dataset.pac === localStorage.getItem("pac")) {
        elem.classList.add(activeClass);
      }
    });
  }

  function calculatingTotal() {
    if (!gender || !height || !weight || !age || !pac) {
      calculatingResult.textContent = "Чего-то не хватает...";
      return;
    }

    switch (gender) {
      case "female":
        calculatingResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161) * pac);
        break;
      case "male":
        calculatingResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * pac);
        break;
    }
  }

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener("click", (e) => {
        if (e.target.dataset.pac) {
          pac = parseFloat(e.target.dataset.pac);
          localStorage.setItem("pac", pac);
        }

        if (e.target.dataset.gender) {
          gender = e.target.dataset.gender;
          localStorage.setItem("gender", gender);
        }

        elements.forEach(elem => elem.classList.remove(activeClass));
        e.target.classList.add(activeClass);
        calculatingTotal();
      });
    });
  }

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", (e) => {
      if (input.value.match(/\D/g)) {
        input.style.background = "#ff00008c";
      } else {
        input.removeAttribute("style");
      }
      switch (e.target.id) {
        case "height":
          height = parseFloat(e.target.value);
          localStorage.setItem("height", height);
          break;
        case "weight":
          weight = parseFloat(e.target.value);
          localStorage.setItem("weight", weight);
          break;
        case "age":
          age = parseFloat(e.target.value);
          localStorage.setItem("age", age);
          break;
      }
      calculatingTotal();
    });
  }
});