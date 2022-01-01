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
import { addNewComment, appendForm, createForm } from "./form.js";
export const mainContainer = document.querySelector(".container");
export const mainFormContainer = document.querySelector(".form__container");
export let data;
// Getting data from data.json
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("data.json");
        const json = yield response.json();
        if (localStorage.getItem("data") === null) {
            localStorage.setItem("data", JSON.stringify(json));
        }
    }
    catch (err) {
        console.error(err);
    }
});
export const addCommentLocalStorageUpdate = (commentData, isReply, index) => {
    const { id, content, createdAt, user, replies, score } = commentData;
    const data = JSON.parse(localStorage.getItem("data"));
    const newComment = {
        id,
        content,
        createdAt,
        user,
        replies,
        score,
    };
    if (isReply) {
        const data = JSON.parse(localStorage.getItem("data"));
        const newReply = {
            id,
            content,
            createdAt,
            replyingTo: "",
            score,
            user,
        };
        data.comments.forEach((comment) => {
            if (comment.id === index) {
                comment.replies.push(newReply);
            }
        });
        localStorage.setItem("data", JSON.stringify(data));
        refreshLocalStorageData();
        return;
    }
    data.comments.push(newComment);
    localStorage.setItem("data", JSON.stringify(data));
    refreshLocalStorageData();
};
export const deleteCommentLocalStorageUpdate = ({ parentId, isReply, replyId, }) => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (isReply) {
        console.log(data.comments);
        const comments = data.comments.map((comment) => {
            console.log(comment.id + " | " + parentId);
            if (comment.id === parentId) {
                const newCommentReplies = comment.replies.filter((reply) => reply.id !== replyId);
                comment.replies = newCommentReplies;
                return comment;
            }
            return comment;
        });
        console.log(comments);
        data.comments = comments;
        console.log(data.comments);
        localStorage.setItem("data", JSON.stringify(data));
        refreshLocalStorageData();
        return;
    }
    const comments = data.comments.filter((comment) => comment.id !== parentId);
    data.comments = comments;
    localStorage.setItem("data", JSON.stringify(data));
    refreshLocalStorageData();
};
export const editCommentLocalStorageUpdate = ({ parentId, isReply, replyId, content, }) => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (isReply) {
        const comments = data.comments.map((comment) => {
            console.log(comment.id + " | " + parentId);
            if (comment.id === parentId) {
                const newCommentReplies = comment.replies.map((reply) => {
                    if (reply.id === replyId) {
                        reply.content = content;
                        return reply;
                    }
                    return reply;
                });
                comment.replies = newCommentReplies;
                return comment;
            }
            return comment;
        });
        console.log(comments);
        data.comments = comments;
        localStorage.setItem("data", JSON.stringify(data));
        refreshLocalStorageData();
        return;
    }
    const comments = data.comments.map((comment) => {
        if (comment.id === parentId) {
            comment.content = content;
            return comment;
        }
        return comment;
    });
    data.comments = comments;
    localStorage.setItem("data", JSON.stringify(data));
    refreshLocalStorageData();
};
export const randomIdGenerator = () => {
    const string = "aA1bB2cC3dD4eE5fF6gG7hH8iI9jJ1kK2lL3mM4nN5oO6pP7qQ8rR9sS1tT2uU3vV4wW5xX6yY7zZ8";
    let id = "";
    for (let i = 0; i <= 20; i++) {
        id += string[Math.floor(Math.random() * string.length)];
    }
    return id;
};
randomIdGenerator();
const main = () => {
    var _a;
    if ((_a = data === null || data === void 0 ? void 0 : data.currentUser) === null || _a === void 0 ? void 0 : _a.username) {
        appendComments(data.comments, data.currentUser);
        appendForm({
            appendFormTo: mainFormContainer,
            formToAppend: createForm({
                textareaPlaceholder: "Write a comment...",
                btnText: "Send",
                submitFunc: addNewComment,
                withCancel: false,
            }),
        });
        appendFooter();
    }
    else {
        appendErrorMessage({ message: "Something went wrong..." });
    }
};
const appendComments = (comments, currentUser) => {
    comments.forEach((comment) => {
        mainContainer.appendChild(createCommentElement(comment.id, comment.score, comment.user.image.png, comment.user.username, comment.createdAt, comment.content, comment.replies, currentUser, "normal"));
    });
};
const appendErrorMessage = ({ message }) => {
    const error = document.createElement("p");
    error.innerText = message;
    mainContainer.appendChild(error);
};
export const refreshLocalStorageData = () => {
    data = JSON.parse(localStorage.getItem("data"));
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield getData();
    data = JSON.parse(localStorage.getItem("data"));
    main();
}))();
