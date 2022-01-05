import { sendCommentDataToModal, showModal } from "../confirmDeleteModal.js";

export const activateConfirmDeleteModal = (event: Event): void => {
  showModal();
  const element = <Element>event.target;
  const parent = <HTMLDivElement>(
    element!.parentElement!.parentElement!.parentElement!.parentElement!.parentElement!.closest(
      ".commentBox__container"
    )
  );

  const isReply = parent.classList.contains("reply-comment");

  if (isReply) {
    const parentCommentOfTheReply =
      parent.parentElement?.parentElement?.parentElement;
    sendCommentDataToModal({
      elementToDelete: parent,
      parentId: parentCommentOfTheReply!.getAttribute("id")!,
      isReply,
      replyId: parent.getAttribute("id")!,
      returnFocusToElement: element.parentElement!,
    });
  } else {
    sendCommentDataToModal({
      elementToDelete: parent,
      parentId: parent!.getAttribute("id")!,
      isReply,
      replyId: "",
      returnFocusToElement: element.parentElement!,
    });
  }
};
