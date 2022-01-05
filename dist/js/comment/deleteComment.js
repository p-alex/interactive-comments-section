import { sendCommentDataToModal, showModal } from "../confirmDeleteModal.js";
export const activateConfirmDeleteModal = (event) => {
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
