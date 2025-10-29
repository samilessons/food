function forms(openModal, closeModal, modal, modalTimerId) {
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
    openModal(modal, modalTimerId);

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
      closeModal(modal, modalTimerId);
      clearTimeout(srmID);
    }, 2500);
  }
}

module.exports = forms;