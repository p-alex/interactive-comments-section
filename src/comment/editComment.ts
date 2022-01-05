import { editCommentLocalStorageUpdate } from "../handleLocalStorage.js";
import { createButton } from "./commentBox.js";

let currentComment: Element | null = null;

export const editComment = (event: Event): void => {
  const element = <Element>event.target;
  const commentContainer: HTMLElement =
    element!.parentElement!.parentElement!.parentElement!.parentElement!.parentElement!.closest(
      ".commentBox__container"
    )!;
  currentComment = commentContainer;

  const commentTextContainer = commentContainer!.querySelector(
    ".commentBox__text"
  ) as HTMLDivElement;

  //Hide comment text
  const commentText: HTMLParagraphElement =
    commentTextContainer.querySelector("#comment-text")!;
  commentText.style.display = "none";

  const editForm = createEditForm(commentContainer, commentTextContainer);

  commentTextContainer.appendChild(editForm);

  const editFormTextarea = editForm.querySelector(
    ".commentBox__textarea"
  ) as HTMLTextAreaElement;
  editFormTextarea.focus();
};

const cancelEditMode = (
  editForm: Element,
  commentText: HTMLParagraphElement
) => {
  const editBtn = currentComment?.querySelector(
    "#edit-btn"
  ) as HTMLButtonElement;
  editForm.remove();
  commentText.style.removeProperty("display");
  editBtn.focus();
};

const updateComment = (
  commentContainer: Element,
  commentText: HTMLParagraphElement,
  editedText: string
) => {
  commentText.textContent = editedText;
  const isReply = commentContainer.classList.contains("reply-comment");
  if (isReply) {
    const parentCommentOfTheReply =
      commentContainer.parentElement?.parentElement?.parentElement;
    editCommentLocalStorageUpdate({
      parentId: parentCommentOfTheReply!.getAttribute("id")!,
      isReply,
      replyId: commentContainer.getAttribute("id")!,
      content: editedText,
    });
    return;
  }
  editCommentLocalStorageUpdate({
    parentId: commentContainer.getAttribute("id")!,
    isReply,
    replyId: "",
    content: editedText,
  });
};

const createEditForm = (
  commentContainer: Element,
  commentTextContainer: Element
) => {
  const commentText: HTMLParagraphElement =
    commentTextContainer.querySelector("#comment-text")!;
  const editForm = document.createElement("div") as HTMLDivElement;
  const isTextarea = commentContainer.querySelector(
    ".commentBox__textarea"
  ) as HTMLTextAreaElement;
  if (!isTextarea) {
    const textarea = document.createElement("textarea") as HTMLTextAreaElement;
    textarea.classList.add("commentBox__textarea");
    textarea.placeholder = "Edit your comment...";
    textarea.value = commentText.textContent!;
    editForm.appendChild(textarea);
  }
  const textarea = editForm.querySelector(
    ".commentBox__textarea"
  ) as HTMLTextAreaElement;

  const isEditModeBtns = commentContainer.querySelector(
    ".commentBox__editModeBtnsContainer"
  ) as HTMLDivElement;
  if (!isEditModeBtns) {
    // Creating container for btns
    const editModeBtnsContainer = document.createElement(
      "div"
    ) as HTMLDivElement;
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
    cancelBtn.addEventListener("click", () =>
      cancelEditMode(editForm, commentText)
    );
    editForm.appendChild(editModeBtnsContainer);
    commentTextContainer.appendChild(editForm);
  }

  const topFocusTrap = document.createElement("div") as HTMLDivElement;
  topFocusTrap.classList.add("commentBox__topFocusTrap");
  topFocusTrap.tabIndex = 0;

  const bottomFocusTrap = document.createElement("div") as HTMLDivElement;
  bottomFocusTrap.classList.add("commentBox__bottomFocusTrap");
  bottomFocusTrap.tabIndex = 0;

  const firstFocusableElement = textarea;
  const lastFocusableElement = editForm.querySelector(
    ".cancel-btn"
  ) as HTMLButtonElement;

  editForm.prepend(topFocusTrap);
  editForm.appendChild(bottomFocusTrap);

  applyFocusTrap(
    topFocusTrap,
    bottomFocusTrap,
    firstFocusableElement,
    lastFocusableElement
  );

  return editForm;
};

const applyFocusTrap = (
  topFocusTrap: HTMLElement,
  bottomFocusTrap: HTMLElement,
  firstFocusableElement: HTMLTextAreaElement,
  lastFocusableElement: HTMLButtonElement
) => {
  topFocusTrap.addEventListener("focus", () => lastFocusableElement.focus());
  bottomFocusTrap.addEventListener("focus", () =>
    firstFocusableElement.focus()
  );
};
