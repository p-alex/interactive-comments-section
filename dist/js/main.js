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
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("data.json");
    const json = yield response.json();
    return json;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const { comments, currentUser } = yield getData();
    let stringg = "wow this is awesome @alex";
    // let regExp = /(@[a-z]+)/g;
    // stringg.replace(regExp, "<b>$1</b>");
    // console.log(stringg.replace(regExp, "<b>$1</b>"));
    let regExp = /(@[a-z]+)/g;
    appendComments(comments, currentUser);
    appendForm();
    appendFooter();
});
const appendComments = (comments, currentUser) => {
    comments.forEach((comment) => {
        const { score, createdAt, content, replies } = comment;
        const { username, image } = comment.user;
        mainContainer.appendChild(createCommentElement(score, image.png, username, createdAt, content, replies, currentUser));
    });
};
const appendForm = () => {
    const form = document.createElement("form");
    form.classList.add("form");
    form.innerHTML = `
  <img
    src="./images/avatars/image-juliusomo.png"
    alt=""
    width="45"
    height="45"
  />
  <textarea
    class="form__text"
    aria-label="Write a comment"
    placeholder="Add a comment..."
  ></textarea>
  <button class="form__submitBtn" type="submit">Send</button>`;
    mainContainer.appendChild(form);
};
const appendFooter = () => {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    footer.innerHTML = `
    <p>
      Developed by <a href="https://github.com/p-alex" rel="noopener" target="_blank">Alex Daniel</a>.
    </p>
  `;
    document.body.appendChild(footer);
};
main();
