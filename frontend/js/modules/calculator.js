function calculator() {
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
}

module.exports = calculator;