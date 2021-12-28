import { createCommentElement } from "./commentBox.js";
import { currentUser, mainContainer } from "./main.js";
const formContainer = document.querySelector(".form__container");
export const appendForm = () => {
    const form = document.createElement("div");
    form.classList.add("form");
    form.innerHTML = `
      <img src="./images/avatars/image-juliusomo.png" alt="" width="45" height="45" />
      <textarea class="form__text" aria-label="Write a comment" placeholder="Add a comment..." id="form-content"></textarea>
      <button class="form__submitBtn" type="submit">Send</button>
    `;
    const submitBtn = form.querySelector(".form__submitBtn");
    const formContent = form.querySelector("#form-content");
    if (formContent !== null) {
        submitBtn.addEventListener("click", () => addNewComment(formContent.value));
    }
    formContainer.appendChild(form);
};
const addNewComment = (content) => {
    if (content) {
        const comment = createCommentElement(0, currentUser.image.png, currentUser.username, new Date().toLocaleDateString(), content, [], currentUser);
        mainContainer.appendChild(comment);
        // Reset text area
        const formTextArea = formContainer.querySelector(".form__text");
        formTextArea.value = "";
    }
};
