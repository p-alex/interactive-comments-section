import { createButton, createCommentElement } from "./comment/commentBox.js";
import { addCommentLocalStorageUpdate } from "./handleLocalStorage/addCommentLocalStorageUpdate.js";
import { getDataFromLocalStorage } from "./handleLocalStorage/getDataFromLocalStorage.js";
import { mainContainer, mainFormContainer } from "./main.js";
import { randomIdGenerator } from "./randomIdGenerator.js";
const data = getDataFromLocalStorage();
export const createForm = ({ textareaPlaceholder, btnText, submitFunc, cancelFunc, withCancel, }) => {
    const form = document.createElement("div");
    form.classList.add("form");
    form.innerHTML = `
      <img src="./images/avatars/image-juliusomo.png" alt="" width="45" height="45" />
      <div class="form__topFocusTrap"></div>
      <textarea class="form__text" aria-label="${textareaPlaceholder}" placeholder="${textareaPlaceholder}" id="form-content"></textarea>
      <div class="form__btnsContainer">
        <button class="form__submitBtn">${btnText}</button>
      </div>
      <div class="form__bottomFocusTrap"></div>
    `;
    if (withCancel) {
        const btnsContainer = form.querySelector(".form__btnsContainer");
        const cancelBtn = createButton({
            text: "Cancel",
            withIcon: false,
            btnStyle: "normal",
        });
        cancelBtn.addEventListener("click", () => cancelFunc({ formToRemove: form }));
        btnsContainer.appendChild(cancelBtn);
        const topFocusTrap = form.querySelector(".form__topFocusTrap");
        topFocusTrap.tabIndex = 0;
        const bottomFocusTrap = form.querySelector(".form__bottomFocusTrap");
        bottomFocusTrap.tabIndex = 0;
    }
    const formSubmitBtn = form.querySelector(".form__submitBtn");
    formSubmitBtn.addEventListener("click", submitFunc);
    return form;
};
export const appendForm = ({ appendFormTo, formToAppend, }) => {
    appendFormTo.appendChild(formToAppend);
    applyFocusTrap(formToAppend);
};
export const addNewComment = () => {
    const formContent = mainFormContainer.querySelector("#form-content");
    if (formContent.value.trim()) {
        const randomId = randomIdGenerator();
        const comment = createCommentElement({
            id: randomId,
            score: 0,
            userImage: data.currentUser.image.png,
            username: data.currentUser.username,
            createdAt: Date.now(),
            content: formContent.value,
            replies: [],
            currentUser: data.currentUser,
            typeOfComment: "normal",
        });
        mainContainer.appendChild(comment);
        const formTextArea = mainFormContainer.querySelector(".form__text");
        const newCommentData = {
            id: randomId,
            content: formContent.value,
            createdAt: Date.now(),
            user: data.currentUser,
            replies: [],
            score: 0,
        };
        addCommentLocalStorageUpdate({
            commentData: newCommentData,
            isReply: false,
            index: "",
        });
        formTextArea.value = "";
    }
};
const applyFocusTrap = (form) => {
    const topFocusTrap = form.querySelector(".form__topFocusTrap");
    const bottomFocusTrap = form.querySelector(".form__bottomFocusTrap");
    const firstFocusableElement = form.querySelector(".form__text");
    const lastFocusableElement = form.querySelector(".normal");
    topFocusTrap.addEventListener("focus", () => lastFocusableElement.focus());
    bottomFocusTrap.addEventListener("focus", () => firstFocusableElement.focus());
};
