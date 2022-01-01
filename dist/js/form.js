import { createButton, createCommentElement } from "./commentBox.js";
import { addCommentLocalStorageUpdate, getDataFromLocalStorage, } from "./handleLocalStorage.js";
import { mainContainer, mainFormContainer } from "./main.js";
import { randomIdGenerator } from "./randomIdGenerator.js";
const data = getDataFromLocalStorage();
const { currentUser } = data;
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
        const randomId = randomIdGenerator();
        const comment = createCommentElement(randomId, 0, currentUser.image.png, currentUser.username, new Date().toLocaleDateString(), formContent.value, [], currentUser, "normal");
        mainContainer.appendChild(comment);
        // Reset text area
        const formTextArea = mainFormContainer.querySelector(".form__text");
        addCommentLocalStorageUpdate({
            id: randomId,
            content: formContent.value,
            createdAt: new Date().toLocaleDateString(),
            user: data.currentUser,
            replies: [],
            score: 0,
        }, false, "");
        formTextArea.value = "";
    }
};
