import { appendForm, createForm } from "../form.js";
import { addCommentLocalStorageUpdate } from "../handleLocalStorage/addCommentLocalStorageUpdate.js";
import { getDataFromLocalStorage } from "../handleLocalStorage/getDataFromLocalStorage.js";
import { randomIdGenerator } from "../randomIdGenerator.js";
import { createCommentElement } from "./commentBox.js";
const data = getDataFromLocalStorage();
export const replyToComment = (event) => {
    const element = event.target;
    const commentContainer = element.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".commentBox__container");
    const replyButton = commentContainer.querySelector("#reply-btn");
    const isTopLevelComment = !commentContainer.classList.contains("reply-comment");
    const commentFormContainer = commentContainer.querySelector(".commentBox__replyFormContainer");
    const repliesContainer = commentContainer.querySelector(".commentBox__replyCommentsContainer");
    const mainContainer = commentContainer.parentElement;
    if (!commentFormContainer.childNodes.length) {
        const form = createForm({
            textareaPlaceholder: "Write a reply...",
            btnText: "Reply",
            submitFunc: () => addReply({
                addReplyTo: isTopLevelComment ? repliesContainer : mainContainer,
            }),
            cancelFunc: ({ formToRemove }) => {
                formToRemove.remove();
                replyButton.focus();
            },
            withCancel: true,
        });
        appendForm({
            appendFormTo: commentFormContainer,
            formToAppend: form,
        });
        const textarea = form.querySelector("#form-content");
        textarea.focus();
        const addReply = ({ addReplyTo }) => {
            var _a;
            const replyParent = (_a = addReplyTo.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
            const replyingTo = commentContainer.querySelector(".commentBox__username");
            if (textarea.value) {
                const randomId = randomIdGenerator();
                const comment = createCommentElement(randomId, 0, data.currentUser.image.png, data.currentUser.username, new Date().toLocaleDateString(), textarea.value, [], data.currentUser, "reply");
                addReplyTo.appendChild(comment);
                const newReplyData = {
                    id: randomId,
                    content: textarea.value,
                    createdAt: new Date().toLocaleDateString(),
                    replyingTo: replyingTo.innerText,
                    user: data.currentUser,
                    score: 0,
                };
                addCommentLocalStorageUpdate({
                    commentData: newReplyData,
                    isReply: true,
                    index: replyParent.getAttribute("id"),
                });
                form.remove();
            }
        };
    }
};
