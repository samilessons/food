"use strict";

window.addEventListener("DOMContentLoaded", function () {
  const tabs = require("./modules/tabs");
  const modalsObject = require("./modules/modals");
  const timer = require("./modules/timer");
  const calculator = require("./modules/calculator");
  const forms = require("./modules/forms");
  const menuCard = require("./modules/menuCard");
  const slider = require("./modules/slider");

  const { modals, openModal, closeModal, modal, modalTimerId } = modalsObject;

  tabs();
  modals();
  timer();
  calculator();
  forms(openModal, closeModal, modal, modalTimerId);
  menuCard();
  slider();
});