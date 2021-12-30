import { createButton, createCommentElement } from "./commentBox.js";
import { data, mainContainer, mainFormContainer } from "./main.js";
export const createForm = ({ textareaPlaceholder, btnText, submitFunc, withCancel, }) => {
    const form = document.createElement("div");
    form.classList.add("form");
    form.innerHTML = `
      <img src="./images/avatars/image-juliusomo.png" alt="" width="45" height="45" />
      <textarea class="form__text" aria-label="${textareaPlaceholder}" placeholder="${textareaPlaceholder}" id="form-content"></textarea>
      <div class="form__btnsContainer">
        <button class="form__submitBtn">${btnText}</button>
      </div>
    `;
    if (withCancel) {
        const btnsContainer = form.querySelector(".form__btnsContainer");
        const cancelBtn = createButton({
            text: "Cancel",
            withIcon: false,
            btnStyle: "normal",
        });
        cancelBtn.addEventListener("click", () => form.remove());
        btnsContainer.appendChild(cancelBtn);
    }
    const formSubmitBtn = form.querySelector(".form__submitBtn");
    formSubmitBtn.addEventListener("click", submitFunc);
    return form;
};
export const appendForm = ({ appendFormTo, formToAppend, }) => {
    appendFormTo.appendChild(formToAppend);
};
export const addNewComment = () => {
    const formContent = mainFormContainer.querySelector("#form-content");
    if (formContent.value) {
        const comment = createCommentElement(0, data.currentUser.image.png, data.currentUser.username, new Date().toLocaleDateString(), formContent.value, [], data.currentUser, "normal");
        mainContainer.appendChild(comment);
        // Reset text area
        const formTextArea = mainFormContainer.querySelector(".form__text");
        formTextArea.value = "";
    }
};
