import { editCommentLocalStorageUpdate } from "../handleLocalStorage/editCommentLocalStorageUpdate.js";
import { createButton } from "./commentBox.js";
let currentComment = null;
export const editComment = (event) => {
    const element = event.target;
    const commentContainer = element.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".commentBox__container");
    currentComment = commentContainer;
    const commentTextContainer = commentContainer.querySelector(".commentBox__text");
    //Hide comment text
    const commentText = commentTextContainer.querySelector("#comment-text");
    commentText.style.display = "none";
    const editForm = createEditForm(commentContainer, commentTextContainer);
    commentTextContainer.appendChild(editForm);
    const editFormTextarea = editForm.querySelector(".commentBox__textarea");
    editFormTextarea.focus();
};
const cancelEditMode = (editForm, commentText) => {
    const editBtn = currentComment === null || currentComment === void 0 ? void 0 : currentComment.querySelector("#edit-btn");
    editForm.remove();
    commentText.style.removeProperty("display");
    editBtn.focus();
};
const updateComment = (commentContainer, commentText, editedText) => {
    var _a, _b;
    commentText.textContent = editedText;
    const isReply = commentContainer.classList.contains("reply-comment");
    if (isReply) {
        const parentCommentOfTheReply = (_b = (_a = commentContainer.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        editCommentLocalStorageUpdate({
            parentId: parentCommentOfTheReply.getAttribute("id"),
            isReply,
            replyId: commentContainer.getAttribute("id"),
            content: editedText,
        });
        return;
    }
    editCommentLocalStorageUpdate({
        parentId: commentContainer.getAttribute("id"),
        isReply,
        replyId: "",
        content: editedText,
    });
};
const createEditForm = (commentContainer, commentTextContainer) => {
    const commentText = commentTextContainer.querySelector("#comment-text");
    const editForm = document.createElement("div");
    const isTextarea = commentContainer.querySelector(".commentBox__textarea");
    if (!isTextarea) {
        const textarea = document.createElement("textarea");
        textarea.classList.add("commentBox__textarea");
        textarea.placeholder = "Edit your comment...";
        textarea.value = commentText.textContent;
        editForm.appendChild(textarea);
    }
    const textarea = editForm.querySelector(".commentBox__textarea");
    const isEditModeBtns = commentContainer.querySelector(".commentBox__editModeBtnsContainer");
    if (!isEditModeBtns) {
        // Creating container for btns
        const editModeBtnsContainer = document.createElement("div");
        editModeBtnsContainer.classList.add("commentBox__editModeBtnsContainer");
        // Creating the buttons
        const updateBtn = createButton({
            text: "Update",
            withIcon: false,
            btnStyle: "fill",
        });
        const cancelBtn = createButton({
            text: "Cancel",
            withIcon: false,
            btnStyle: "normal",
        });
        cancelBtn.classList.add("cancel-btn");
        editModeBtnsContainer.appendChild(updateBtn);
        editModeBtnsContainer.appendChild(cancelBtn);
        editForm.appendChild(editModeBtnsContainer);
        // Adding event listeners to buttons
        updateBtn.addEventListener("click", () => {
            updateComment(commentContainer, commentText, textarea.value);
            cancelEditMode(editForm, commentText);
        });
        cancelBtn.addEventListener("click", () => cancelEditMode(editForm, commentText));
        editForm.appendChild(editModeBtnsContainer);
        commentTextContainer.appendChild(editForm);
    }
    const topFocusTrap = document.createElement("div");
    topFocusTrap.classList.add("commentBox__topFocusTrap");
    topFocusTrap.tabIndex = 0;
    const bottomFocusTrap = document.createElement("div");
    bottomFocusTrap.classList.add("commentBox__bottomFocusTrap");
    bottomFocusTrap.tabIndex = 0;
    const firstFocusableElement = textarea;
    const lastFocusableElement = editForm.querySelector(".cancel-btn");
    editForm.prepend(topFocusTrap);
    editForm.appendChild(bottomFocusTrap);
    applyFocusTrap(topFocusTrap, bottomFocusTrap, firstFocusableElement, lastFocusableElement);
    return editForm;
};
const applyFocusTrap = (topFocusTrap, bottomFocusTrap, firstFocusableElement, lastFocusableElement) => {
    topFocusTrap.addEventListener("focus", () => lastFocusableElement.focus());
    bottomFocusTrap.addEventListener("focus", () => firstFocusableElement.focus());
};
