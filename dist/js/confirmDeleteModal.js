import { deleteCommentLocalStorageUpdate } from "./handleLocalStorage/deleteCommentLocalStorageUpdate.js";
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
export const showModal = () => {
    const isModalAlreadyOpened = document.querySelector(".confirmModal");
    if (!isModalAlreadyOpened) {
        const modal = createModal();
        document.body.prepend(modal);
        const cancelButton = modal.querySelector(".confirmModal__btn");
        cancelButton.focus();
        applyFocusTrap({ modal, firstFocusableElement: cancelButton });
    }
};
export const sendCommentDataToModal = (data) => {
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
