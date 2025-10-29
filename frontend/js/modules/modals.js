function closeModal(modal, modalTimerId) {
  modal.classList.add("hidden");
  modal.classList.remove("show");
  document.body.style.overflowY = "auto";
  clearTimeout(modalTimerId);
}

function openModal(modal, modalTimerId) {
  modal.classList.remove("hidden");
  modal.classList.add("show");
  document.body.style.overflowY = "hidden";
  clearTimeout(modalTimerId);
}

const modal = document.querySelector(".modal");
const modalTimerId = setTimeout(openModal, 320000);

function modals() {
  const openModalTriggers = document.querySelectorAll("[data-modal-open]");

  closeModal(modal, modalTimerId);
  openModal(modal, modalTimerId);

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modal, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  if (!modal.matches(".hidden") && !modal.matches(".show")) {
    modal.classList.add("hidden");
  }

  openModalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      if (modal.classList.contains("hidden")) openModal(modal, modalTimerId);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target && e.target === modal || e.target.matches("[data-modal-close]")) closeModal(modal, modalTimerId);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape' && modal.matches(".show")) closeModal(modal, modalTimerId);
  });

  window.addEventListener("scroll", showModalByScroll);
}

module.exports = {
  modals,
  closeModal,
  openModal,
  modal,
  modalTimerId
};