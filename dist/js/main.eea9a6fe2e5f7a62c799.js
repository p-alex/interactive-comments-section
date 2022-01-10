/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "P": () => (/* binding */ mainContainer),
  "J": () => (/* binding */ mainFormContainer)
});

;// CONCATENATED MODULE: ./src/handleLocalStorage/getDataFromLocalStorage.ts
const getDataFromLocalStorage = () => {
    if (JSON.parse(window.localStorage.getItem("data")) === null) {
        return null;
    }
    else {
        return JSON.parse(window.localStorage.getItem("data"));
    }
};

;// CONCATENATED MODULE: ./src/handleLocalStorage/updateLocalStorage.ts
const updateLocalStorage = (newData) => {
    window.localStorage.setItem("data", JSON.stringify(newData));
};

;// CONCATENATED MODULE: ./src/handleLocalStorage/scoreCommentLocalStorageUpdate.ts


// -------------------UPDATE COMMENT SCORE AND SAVE THE CHANGES TO LOCAL STORAGE-------------------
const scoreCommentLocalStorageUpdate = ({ scoreType, commentId, isReply, }) => {
    const data = getDataFromLocalStorage();
    const { comments, currentUser } = data;
    const isCommentAlreadyScored = currentUser.scored.find((item) => item.id === commentId);
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType === "downvote" &&
        scoreType === "upvote") {
        currentUser.scored.forEach((score) => {
            if (score.id === commentId && score.scoreType !== scoreType) {
                score.scoreType = scoreType;
            }
        });
        if (isReply) {
            const newComments = comments.map((comment) => {
                comment.replies.forEach((reply) => {
                    if (reply.id === commentId) {
                        reply.score += 2;
                        return;
                    }
                });
                return comment;
            });
            updateLocalStorage({ comments: newComments, currentUser });
            return;
        }
        const newComments = comments.map((comment) => {
            if (comment.id === commentId) {
                comment.score += 2;
                return comment;
            }
            return comment;
        });
        updateLocalStorage({ comments: newComments, currentUser });
        return;
    }
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType === "upvote" &&
        scoreType === "upvote") {
        currentUser.scored = currentUser.scored.filter((score) => score.id !== commentId);
        if (isReply) {
            const newComments = comments.map((comment) => {
                comment.replies.forEach((reply) => {
                    if (reply.id === commentId) {
                        reply.score--;
                        return;
                    }
                });
                return comment;
            });
            updateLocalStorage({ comments: newComments, currentUser });
            return;
        }
        const newComments = comments.map((comment) => {
            if (comment.id === commentId) {
                comment.score--;
                return comment;
            }
            return comment;
        });
        updateLocalStorage({ comments: newComments, currentUser });
        return;
    }
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType === "upvote" &&
        scoreType === "downvote") {
        currentUser.scored.forEach((score) => {
            if (score.id === commentId) {
                score.scoreType = scoreType;
            }
        });
        if (isReply) {
            const newComments = comments.map((comment) => {
                comment.replies.forEach((reply) => {
                    if (reply.id === commentId) {
                        console.log(reply.score);
                        reply.score -= 2;
                        console.log(reply.score);
                        return;
                    }
                });
                return comment;
            });
            updateLocalStorage({ comments: newComments, currentUser });
            return;
        }
        const newComments = comments.map((comment) => {
            if (comment.id === commentId) {
                comment.score -= 2;
                return comment;
            }
            return comment;
        });
        updateLocalStorage({ comments: newComments, currentUser });
        return;
    }
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType === "downvote" &&
        scoreType === "downvote") {
        currentUser.scored = currentUser.scored.filter((score) => score.id !== commentId);
        if (isReply) {
            const newComments = comments.map((comment) => {
                comment.replies.forEach((reply) => {
                    if (reply.id === commentId) {
                        reply.score++;
                        return;
                    }
                });
                return comment;
            });
            updateLocalStorage({ comments: newComments, currentUser });
            return;
        }
        const newComments = comments.map((comment) => {
            if (comment.id === commentId) {
                comment.score++;
                return comment;
            }
            return comment;
        });
        updateLocalStorage({ comments: newComments, currentUser });
        return;
    }
    if (!isCommentAlreadyScored && scoreType === "upvote") {
        currentUser.scored.push({ id: commentId, scoreType });
        if (isReply) {
            const newComments = comments.map((comment) => {
                comment.replies.forEach((reply) => {
                    if (reply.id === commentId) {
                        reply.score++;
                    }
                });
                return comment;
            });
            updateLocalStorage({ comments: newComments, currentUser });
            return;
        }
        const newComments = comments.map((comment) => {
            if (comment.id === commentId) {
                comment.score++;
                return comment;
            }
            return comment;
        });
        updateLocalStorage({ comments: newComments, currentUser });
        return;
    }
    if (!isCommentAlreadyScored && scoreType === "downvote") {
        currentUser.scored.push({ id: commentId, scoreType });
        if (isReply) {
            const newComments = comments.map((comment) => {
                comment.replies.forEach((reply) => {
                    if (reply.id === commentId) {
                        reply.score--;
                    }
                });
                return comment;
            });
            updateLocalStorage({ comments: newComments, currentUser });
            return;
        }
        const newComments = comments.map((comment) => {
            if (comment.id === commentId) {
                comment.score--;
                return comment;
            }
            return comment;
        });
        updateLocalStorage({ comments: newComments, currentUser });
        return;
    }
};

;// CONCATENATED MODULE: ./src/handleScoreChange.ts

const handleScoreChange = ({ elementToChange, commentId, scoreType, commentType, upvoteBtn, downvoteBtn, }) => {
    const data = getDataFromLocalStorage();
    const { comments, currentUser } = data;
    let currentScore = 0;
    if (commentType === "normal") {
        comments.forEach((comment) => {
            if (comment.id === commentId) {
                currentScore = comment.score;
            }
        });
    }
    if (commentType === "reply") {
        comments.forEach((comment) => {
            comment.replies.forEach((reply) => {
                if (reply.id === commentId) {
                    currentScore = reply.score;
                }
            });
        });
    }
    const isCommentAlreadyScored = currentUser.scored.find((item) => item.id === commentId);
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType === "downvote" &&
        scoreType === "upvote") {
        upvoteBtn.classList.add("btn-active");
        downvoteBtn.classList.remove("btn-active");
        elementToChange.textContent = `${currentScore + 2}`;
        return;
    }
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType === "upvote" &&
        scoreType === "upvote") {
        upvoteBtn.classList.remove("btn-active");
        downvoteBtn.classList.remove("btn-active");
        elementToChange.textContent = `${currentScore - 1}`;
        return;
    }
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType === "upvote" &&
        scoreType === "downvote") {
        upvoteBtn.classList.remove("btn-active");
        downvoteBtn.classList.add("btn-active");
        elementToChange.textContent = `${currentScore - 2}`;
        return;
    }
    if (isCommentAlreadyScored &&
        isCommentAlreadyScored.scoreType === "downvote" &&
        scoreType === "downvote") {
        upvoteBtn.classList.remove("btn-active");
        downvoteBtn.classList.remove("btn-active");
        elementToChange.textContent = `${currentScore + 1}`;
        return;
    }
    if (!isCommentAlreadyScored && scoreType === "upvote") {
        upvoteBtn.classList.add("btn-active");
        downvoteBtn.classList.remove("btn-active");
        elementToChange.textContent = `${currentScore + 1}`;
        return;
    }
    if (!isCommentAlreadyScored && scoreType === "downvote") {
        upvoteBtn.classList.remove("btn-active");
        downvoteBtn.classList.add("btn-active");
        elementToChange.textContent = `${currentScore - 1}`;
        return;
    }
};

;// CONCATENATED MODULE: ./src/utils/dateConverter.ts
// This function converts dates into 'x minutes ago', 'x months ago', etc...
// datePosted parameter should be in 'Date.now()' format
const dateConverter = (datePosted) => {
    const currentDate = Date.now();
    const diff = currentDate - datePosted;
    const msInADay = 1000 * 3600 * 24;
    const resultInDays = diff / msInADay;
    const resultInHours = resultInDays * 24;
    const resultInMinutes = resultInHours * 60;
    const resultInMonths = resultInDays / 30.4375;
    const resultInYears = resultInDays / 365;
    if (resultInMinutes < 1) {
        return "Just now";
    }
    if (resultInMinutes >= 1 && resultInMinutes < 60) {
        const convertedDate = Math.floor(resultInMinutes);
        return `${convertedDate} ${convertedDate === 1 ? "minute" : "minutes"} ago`;
    }
    if (resultInHours >= 1 && resultInHours < 24) {
        const convertedDate = Math.floor(resultInHours);
        return `${convertedDate} ${convertedDate === 1 ? "hour" : "hours"} ago`;
    }
    if (resultInDays >= 1 && resultInDays < 30.4375) {
        const convertedDate = Math.floor(resultInDays);
        return `${convertedDate} ${convertedDate === 1 ? "day" : "days"} ago`;
    }
    if (resultInMonths >= 1 && resultInMonths < 12) {
        const convertedDate = Math.floor(resultInMonths);
        return `${convertedDate} ${convertedDate === 1 ? "month" : "months"} ago`;
    }
    if (resultInYears >= 1) {
        const convertedDate = Math.floor(resultInYears);
        return `${convertedDate} ${convertedDate === 1 ? "year" : "years"} ago`;
    }
    return "";
};

;// CONCATENATED MODULE: ./src/handleLocalStorage/deleteCommentLocalStorageUpdate.ts


// -------------------DELETE COMMENT FROM LOCAL STORAGE-------------------
const deleteCommentLocalStorageUpdate = ({ parentId, isReply, replyId, }) => {
    const data = getDataFromLocalStorage();
    if (isReply) {
        const newComments = data.comments.map((comment) => {
            if (comment.id === parentId) {
                const newCommentReplies = comment.replies.filter((reply) => reply.id !== replyId);
                comment.replies = newCommentReplies;
                return comment;
            }
            return comment;
        });
        updateLocalStorage({
            comments: newComments,
            currentUser: data.currentUser,
        });
        console.log("Deleted reply from local storage!");
        return;
    }
    const newComments = data.comments.filter((comment) => comment.id !== parentId);
    updateLocalStorage({ comments: newComments, currentUser: data.currentUser });
    console.log("Deleted comment from local storage!");
};

;// CONCATENATED MODULE: ./src/confirmDeleteModal.ts

let commentData;
const createModal = () => {
    const container = document.createElement("div");
    container.classList.add("confirmModal");
    container.setAttribute("aria-modal", "true");
    const template = `
    <div class="confirmModal__backdrop"></div>
        <div class="confirmModal__body">
        <h2 class="confirmModal__title">Delete comment</h2>
        <p class="confirmModal__text">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
        </p>
        <div class="confirmModal__btns">
            <div tabindex="0" class="confirmModal__topFocusTrap"></div>
            <button class="confirmModal__btn">No, cancel</button>
            <button class="confirmModal__btn confirmModal__btn-delete">
            Yes, delete
            </button>
            <div tabindex="0" class="confirmModal__bottomFocusTrap"></div>
        </div>
        </div>
`;
    container.innerHTML = template;
    const cancelBtn = container.querySelector(".confirmModal__btn");
    const deleteBtn = container.querySelector(".confirmModal__btn-delete");
    cancelBtn.addEventListener("click", cancelModal);
    deleteBtn.addEventListener("click", deleteComment);
    const backdrop = container.querySelector(".confirmModal__backdrop");
    backdrop.addEventListener("click", cancelModal);
    return container;
};
const showModal = () => {
    const isModalAlreadyOpened = document.querySelector(".confirmModal");
    if (!isModalAlreadyOpened) {
        const modal = createModal();
        document.body.prepend(modal);
        const cancelButton = modal.querySelector(".confirmModal__btn");
        cancelButton.focus();
        applyFocusTrap({ modal, firstFocusableElement: cancelButton });
    }
};
const sendCommentDataToModal = (data) => {
    commentData = data;
};
const deleteComment = () => {
    commentData.elementToDelete.remove();
    deleteCommentLocalStorageUpdate({
        parentId: commentData.parentId,
        isReply: commentData.isReply,
        replyId: commentData.replyId,
    });
    cancelModal();
};
const cancelModal = () => {
    const elementDeleteBtn = commentData.elementToDelete.querySelector(".commentBox__btn");
    elementDeleteBtn.focus();
    document.querySelector(".confirmModal").remove();
};
const applyFocusTrap = ({ modal, firstFocusableElement, }) => {
    const topFocusTrap = modal.querySelector(".confirmModal__topFocusTrap");
    const bottomFocusTrap = modal.querySelector(".confirmModal__bottomFocusTrap");
    const lastFocusableElement = modal.querySelector(".confirmModal__btn-delete");
    topFocusTrap.addEventListener("focus", () => lastFocusableElement.focus());
    bottomFocusTrap.addEventListener("focus", () => firstFocusableElement.focus());
};

;// CONCATENATED MODULE: ./src/comment/deleteComment.ts

const activateConfirmDeleteModal = (event) => {
    var _a, _b;
    showModal();
    const element = event.target;
    const parent = (element.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".commentBox__container"));
    const isReply = parent.classList.contains("reply-comment");
    if (isReply) {
        const parentCommentOfTheReply = (_b = (_a = parent.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        sendCommentDataToModal({
            elementToDelete: parent,
            parentId: parentCommentOfTheReply.getAttribute("id"),
            isReply,
            replyId: parent.getAttribute("id"),
            returnFocusToElement: element.parentElement,
        });
    }
    else {
        sendCommentDataToModal({
            elementToDelete: parent,
            parentId: parent.getAttribute("id"),
            isReply,
            replyId: "",
            returnFocusToElement: element.parentElement,
        });
    }
};

;// CONCATENATED MODULE: ./src/handleLocalStorage/editCommentLocalStorageUpdate.ts


// -------------------EDIT COMMENT FROM LOCAL STORAGE-------------------
const editCommentLocalStorageUpdate = ({ parentId, isReply, replyId, content, }) => {
    const data = getDataFromLocalStorage();
    if (isReply) {
        const newComments = data.comments.map((comment) => {
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
        updateLocalStorage({
            comments: newComments,
            currentUser: data.currentUser,
        });
        console.log("Edited reply successfuly");
        return;
    }
    const newComments = data.comments.map((comment) => {
        if (comment.id === parentId) {
            comment.content = content;
            return comment;
        }
        return comment;
    });
    updateLocalStorage({ comments: newComments, currentUser: data.currentUser });
    console.log("Edited comment successfuly");
};

;// CONCATENATED MODULE: ./src/comment/editComment.ts


let currentComment = null;
const editComment = (event) => {
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
        updateBtn.classList.add("update-btn");
        const cancelBtn = createButton({
            text: "Cancel",
            withIcon: false,
            btnStyle: "normal",
        });
        cancelBtn.classList.add("cancel-btn");
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
    editComment_applyFocusTrap(topFocusTrap, bottomFocusTrap, firstFocusableElement, lastFocusableElement);
    return editForm;
};
const editComment_applyFocusTrap = (topFocusTrap, bottomFocusTrap, firstFocusableElement, lastFocusableElement) => {
    topFocusTrap.addEventListener("focus", () => lastFocusableElement.focus());
    bottomFocusTrap.addEventListener("focus", () => firstFocusableElement.focus());
};

;// CONCATENATED MODULE: ./src/handleLocalStorage/addCommentLocalStorageUpdate.ts


// -------------------ADD COMMENT TO LOCAL STORAGE-------------------
const addCommentLocalStorageUpdate = ({ commentData, isReply, index, }) => {
    const data = getDataFromLocalStorage();
    if (isReply) {
        const newReplyData = commentData;
        const newComments = data.comments.map((comment) => {
            if (comment.id === index) {
                comment.replies.push(newReplyData);
                return comment;
            }
            return comment;
        });
        updateLocalStorage({
            comments: newComments,
            currentUser: data.currentUser,
        });
        console.log("Added reply to local storage!");
        return;
    }
    const newCommentData = commentData;
    updateLocalStorage({
        comments: [...data.comments, newCommentData],
        currentUser: data.currentUser,
    });
    console.log("Added comment to local storage!");
};

;// CONCATENATED MODULE: ./src/randomIdGenerator.ts
const randomIdGenerator = () => {
    const string = "aA1bB2cC3dD4eE5fF6gG7hH8iI9jJ1kK2lL3mM4nN5oO6pP7qQ8rR9sS1tT2uU3vV4wW5xX6yY7zZ8";
    let id = "";
    for (let i = 0; i <= 20; i++) {
        id += string[Math.floor(Math.random() * string.length)];
    }
    return id;
};

;// CONCATENATED MODULE: ./src/form.ts





const data = getDataFromLocalStorage();
const createForm = ({ textareaPlaceholder, btnText, submitFunc, cancelFunc, withCancel, }) => {
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
const appendForm = ({ appendFormTo, formToAppend, }) => {
    appendFormTo.appendChild(formToAppend);
    form_applyFocusTrap(formToAppend);
};
const addNewComment = () => {
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
        // Reset text area
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
const form_applyFocusTrap = (form) => {
    const topFocusTrap = form.querySelector(".form__topFocusTrap");
    const bottomFocusTrap = form.querySelector(".form__bottomFocusTrap");
    const firstFocusableElement = form.querySelector(".form__text");
    const lastFocusableElement = form.querySelector(".normal");
    topFocusTrap.addEventListener("focus", () => lastFocusableElement.focus());
    bottomFocusTrap.addEventListener("focus", () => firstFocusableElement.focus());
};

;// CONCATENATED MODULE: ./src/comment/replyToComment.ts





const replyToComment_data = getDataFromLocalStorage();
const replyToComment = (event) => {
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
            console.log(replyToComment_data.currentUser);
            if (textarea.value) {
                const randomId = randomIdGenerator();
                const comment = createCommentElement({
                    id: randomId,
                    score: 0,
                    userImage: replyToComment_data.currentUser.image.png,
                    username: replyToComment_data.currentUser.username,
                    createdAt: Date.now(),
                    content: textarea.value,
                    replies: [],
                    currentUser: replyToComment_data.currentUser,
                    typeOfComment: "reply",
                });
                addReplyTo.appendChild(comment);
                const newReplyData = {
                    id: randomId,
                    content: textarea.value,
                    createdAt: Date.now(),
                    replyingTo: replyingTo.innerText,
                    user: replyToComment_data.currentUser,
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

;// CONCATENATED MODULE: ./src/comment/commentBox.ts






const createCommentElement = ({ id, score, userImage, username, createdAt, content, replies, currentUser, typeOfComment, }) => {
    var _a;
    const container = document.createElement("div");
    container.classList.add("commentBox__container");
    container.id = id;
    if (typeOfComment === "reply")
        container.classList.add("reply-comment");
    const template = `
    <div class="commentBox">
      <div class="commentBox__rate">
          <button class="commentBox__rateBtn" id="upvote-btn" aria-label="Upvote comment">
            <img src="./images/icon-plus.svg" alt="" width='10' height='10'/>
          </button>
          <p class="commentBox__likes">${score}</p>
          <button class="commentBox__rateBtn" id="downvote-btn" aria-label="Downvote comment">
            <img src="./images/icon-minus.svg" alt="" width='10' height='3' />
          </button>
      </div>
      <div class="commentBox__body">
          <div class="commentBox__topBar">
            <div class="commentBox__userDetails">
                <img class="commentBox__profilePicture" src="${userImage}" alt="" width="35" height="35"/>
                <div class='commentBox__usernameAndDate'>
                  <p class="commentBox__username">${username}</p>
                  <p class="commentBox__commentDate">${dateConverter(createdAt)}</p>
                </div>
            </div>
            <div class="commentBox__btns"></div>
          </div>
          <div class="commentBox__text">
              <p id="comment-text"></p>
          </div>
      </div>
    </div>
    <div class="commentBox__replyFormContainer"></div>
    <div class="commentBox__replyContainer">
    <div class="commentBox__helperLine"></div>
      <div class="commentBox__replyCommentsContainer"></div>
    </div>
    `;
    container.innerHTML = template;
    const rateContainer = container.querySelector(".commentBox__rate");
    const upvoteBtn = rateContainer === null || rateContainer === void 0 ? void 0 : rateContainer.querySelector(`#upvote-btn`);
    const downvoteBtn = rateContainer.querySelector(`#downvote-btn`);
    const scoreParagraph = rateContainer.querySelector(".commentBox__likes");
    const commentUsername = (_a = container.querySelector(".commentBox__username")) === null || _a === void 0 ? void 0 : _a.textContent;
    currentUser.scored.forEach((score) => {
        if (score.id === id) {
            if (score.scoreType === "upvote") {
                upvoteBtn.classList.add("btn-active");
                return;
            }
            downvoteBtn.classList.add("btn-active");
        }
    });
    if (commentUsername === currentUser.username) {
        upvoteBtn.disabled = true;
        downvoteBtn.disabled = true;
    }
    else {
        upvoteBtn.addEventListener("click", () => {
            handleScoreChange({
                elementToChange: scoreParagraph,
                commentId: container.id,
                scoreType: "upvote",
                commentType: typeOfComment,
                upvoteBtn,
                downvoteBtn,
            });
            scoreCommentLocalStorageUpdate({
                scoreType: "upvote",
                commentId: container.id,
                isReply: typeOfComment === "reply",
            });
        });
        downvoteBtn.addEventListener("click", () => {
            handleScoreChange({
                elementToChange: scoreParagraph,
                commentId: container.id,
                scoreType: "downvote",
                commentType: typeOfComment,
                upvoteBtn,
                downvoteBtn,
            });
            scoreCommentLocalStorageUpdate({
                scoreType: "downvote",
                commentId: container.id,
                isReply: typeOfComment === "reply",
            });
        });
    }
    // Adding Reply, Delete, and Edit buttons based on currentUser
    const commentBoxBtns = container.querySelector(".commentBox__btns");
    if (currentUser.username === username) {
        commentBoxBtns.appendChild(createButton({ text: "Delete", withIcon: true, btnStyle: "normal" }));
        commentBoxBtns.appendChild(createButton({ text: "Edit", withIcon: true, btnStyle: "normal" }));
    }
    else {
        commentBoxBtns.appendChild(createButton({ text: "Reply", withIcon: true, btnStyle: "normal" }));
    }
    // Adding comment text using textContent for security
    container.querySelector("#comment-text").textContent = content;
    // Adding replies if the comment has any
    if (replies.length) {
        const repliesContainer = container.querySelector(".commentBox__replyCommentsContainer");
        replies.forEach((reply) => {
            repliesContainer.appendChild(createCommentElement({
                id: reply.id,
                score: reply.score,
                userImage: reply.user.image.png,
                username: reply.user.username,
                createdAt: reply.createdAt,
                content: reply.content,
                replies: [],
                currentUser,
                typeOfComment: "reply",
            }));
        });
    }
    return container;
};
const createButton = ({ text, withIcon, btnStyle, }) => {
    const button = document.createElement("button");
    button.classList.add("commentBox__btn");
    // Applying button style
    button.classList.add(btnStyle === "fill" ? "fill" : "normal");
    if (text === "Delete")
        button.classList.add("delete-btn");
    button.title = text;
    button.id = `${text.toLowerCase()}-btn`;
    // Add icon if true
    if (withIcon) {
        button.innerHTML = `
    <img src="./images/icon-${text.toLowerCase()}.svg" alt="" width="15" height="15" />
    <span>${text}</span>
  `;
    }
    else {
        button.innerText = text;
    }
    // Buttons with text 'reply', 'delete' and 'edit' have functions
    // assigned by default
    if (text === "Reply")
        button.addEventListener("click", replyToComment);
    if (text === "Delete")
        button.addEventListener("click", activateConfirmDeleteModal);
    if (text === "Edit")
        button.addEventListener("click", editComment);
    return button;
};

;// CONCATENATED MODULE: ./src/footer.ts
const appendFooter = () => {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    footer.innerHTML = `
      <p>Developed by <a href="https://github.com/p-alex" rel="noopener" target="_blank" title="My Github Profile">Alex Daniel</a>.</p>
    `;
    document.body.appendChild(footer);
};

;// CONCATENATED MODULE: ./src/main.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};











const mainContainer = document.querySelector(".container");
const mainFormContainer = document.querySelector(".form__container");
// Getting data from data.json
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (localStorage.getItem("data") === null) {
            const response = yield fetch("data.json");
            const json = yield response.json();
            localStorage.setItem("data", JSON.stringify(json));
        }
    }
    catch (err) {
        console.error(err);
        appendErrorMessage({ message: err.message });
    }
});
console.log("hello");
const main = () => {
    const data = getDataFromLocalStorage();
    if (data) {
        appendComments(data.comments, data.currentUser);
        appendForm({
            appendFormTo: mainFormContainer,
            formToAppend: createForm({
                textareaPlaceholder: "Write a comment...",
                btnText: "Send",
                submitFunc: addNewComment,
                cancelFunc: ({ formToRemove }) => formToRemove.remove(),
                withCancel: false,
            }),
        });
        appendFooter();
    }
};
const appendComments = (comments, currentUser) => {
    comments.forEach((comment) => {
        mainContainer.appendChild(createCommentElement({
            id: comment.id,
            score: comment.score,
            userImage: comment.user.image.png,
            username: comment.user.username,
            createdAt: comment.createdAt,
            content: comment.content,
            replies: comment.replies,
            currentUser,
            typeOfComment: "normal",
        }));
    });
};
const appendErrorMessage = ({ message }) => {
    const error = document.createElement("p");
    error.innerText = message;
    mainContainer.appendChild(error);
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield getData();
    main();
}))();

/******/ })()
;