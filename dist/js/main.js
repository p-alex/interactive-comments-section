var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createCommentElement } from "./commentBox.js";
const mainContainer = document.querySelector(".container");
const formContainer = document.querySelector(".form__container");
// Getting data from data.json
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("data.json");
    const json = yield response.json();
    return json;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const { comments, currentUser } = yield getData();
    const appendComments = (comments, currentUser) => {
        comments.forEach((comment) => {
            mainContainer.appendChild(createCommentElement(comment.score, comment.user.image.png, comment.user.username, comment.createdAt, comment.content, comment.replies, currentUser));
        });
    };
    const appendForm = () => {
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
    const appendFooter = () => {
        const footer = document.createElement("footer");
        footer.classList.add("footer");
        footer.innerHTML = `
      <p>Developed by <a href="https://github.com/p-alex" rel="noopener" target="_blank">Alex Daniel</a>.</p>
    `;
        document.body.appendChild(footer);
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
    appendComments(comments, currentUser);
    appendForm();
    appendFooter();
});
main();
