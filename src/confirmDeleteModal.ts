import { deleteCommentLocalStorageUpdate } from "./handleLocalStorage/deleteCommentLocalStorageUpdate";

let commentData: {
  elementToDelete: HTMLDivElement;
  parentId: string;
  isReply: boolean;
  replyId: string;
  returnFocusToElement: HTMLElement;
};

const createModal = (): HTMLDivElement => {
  const container = document.createElement("div") as HTMLDivElement;
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

  const cancelBtn = container.querySelector(
    ".confirmModal__btn"
  ) as HTMLButtonElement;

  const deleteBtn = container.querySelector(
    ".confirmModal__btn-delete"
  ) as HTMLButtonElement;

  cancelBtn.addEventListener("click", cancelModal);
  deleteBtn.addEventListener("click", deleteComment);

  const backdrop = container.querySelector(
    ".confirmModal__backdrop"
  ) as HTMLDivElement;

  backdrop.addEventListener("click", cancelModal);

  return container;
};

export const showModal = () => {
  const isModalAlreadyOpened = document.querySelector(
    ".confirmModal"
  ) as HTMLDivElement;
  if (!isModalAlreadyOpened) {
    const modal = createModal();
    document.body.prepend(modal);
    const cancelButton = modal.querySelector(
      ".confirmModal__btn"
    ) as HTMLButtonElement;
    cancelButton.focus();
    applyFocusTrap({ modal, firstFocusableElement: cancelButton });
  }
};

export const sendCommentDataToModal = (data: {
  elementToDelete: HTMLDivElement;
  parentId: string;
  isReply: boolean;
  replyId: string;
  returnFocusToElement: HTMLElement;
}) => {
  commentData = data;
};

const deleteComment = (): void => {
  commentData.elementToDelete.remove();
  deleteCommentLocalStorageUpdate({
    parentId: commentData.parentId,
    isReply: commentData.isReply,
    replyId: commentData.replyId,
  });
  cancelModal();
};

const cancelModal = (): void => {
  const elementDeleteBtn = commentData.elementToDelete.querySelector(
    ".commentBox__btn"
  ) as HTMLButtonElement;
  elementDeleteBtn.focus();
  document.querySelector(".confirmModal")!.remove();
};

const applyFocusTrap = ({
  modal,
  firstFocusableElement,
}: {
  modal: HTMLDivElement;
  firstFocusableElement: HTMLButtonElement;
}) => {
  const topFocusTrap = modal.querySelector(
    ".confirmModal__topFocusTrap"
  ) as HTMLDivElement;
  const bottomFocusTrap = modal.querySelector(
    ".confirmModal__bottomFocusTrap"
  ) as HTMLDivElement;
  const lastFocusableElement = modal.querySelector(
    ".confirmModal__btn-delete"
  ) as HTMLButtonElement;

  topFocusTrap.addEventListener("focus", () => lastFocusableElement.focus());
  bottomFocusTrap.addEventListener("focus", () =>
    firstFocusableElement.focus()
  );
};
