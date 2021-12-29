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
export const mainForm = document.querySelector(".form__container");
export let data;
// Getting data from data.json
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("data.json");
        const json = yield response.json();
        data = json;
    }
    catch (err) {
        console.error(err);
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = data === null || data === void 0 ? void 0 : data.currentUser) === null || _a === void 0 ? void 0 : _a.username) {
        appendComments(data.comments, data.currentUser);
        appendForm({ appendToElement: mainForm });
        appendFooter();
    }
    else {
        const error = document.createElement("p");
        error.innerText = "Something went wrong...";
        mainContainer.appendChild(error);
    }
});
const appendComments = (comments, currentUser) => {
    comments.forEach((comment) => {
        mainContainer.appendChild(createCommentElement(comment.score, comment.user.image.png, comment.user.username, comment.createdAt, comment.content, comment.replies, currentUser));
    });
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield getData();
    yield main();
}))();
