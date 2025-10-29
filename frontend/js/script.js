"use strict";

import tabs from "./modules/tabs.js";
import modals from "./modules/modals.js";
import timer from "./modules/timer.js";
import calculator from "./modules/calculator.js";
import forms from "./modules/forms.js";
import menuCard from "./modules/menuCard.js";
import slider from "./modules/slider.js";

window.addEventListener("DOMContentLoaded", function () {
  tabs();
  modals();
  timer();
  calculator();
  forms();
  menuCard();
  slider();
});