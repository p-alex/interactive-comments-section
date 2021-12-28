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
import { appendFooter } from "./footer.js";
import { appendForm } from "./form.js";
export const mainContainer = document.querySelector(".container");
// Getting data from data.json
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("data.json");
    const json = yield response.json();
    return json;
});
export let currentUser;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData();
    const { comments } = data;
    currentUser = data.currentUser;
    const appendComments = (comments, currentUser) => {
        comments.forEach((comment) => {
            mainContainer.appendChild(createCommentElement(comment.score, comment.user.image.png, comment.user.username, comment.createdAt, comment.content, comment.replies, currentUser));
        });
    };
    appendComments(comments, currentUser);
    appendForm();
    appendFooter();
});
main();
