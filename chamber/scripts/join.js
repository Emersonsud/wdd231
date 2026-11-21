import "./common.js";

/* Hidden timestamp: when the form was loaded */
document.querySelector("#timestamp").value = new Date().toISOString();

/* Membership modals */
document.querySelectorAll("[data-modal]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById(link.dataset.modal).showModal();
  });
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.querySelector(".modal-close").addEventListener("click", () => dialog.close());
  // click on the backdrop closes the modal
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
