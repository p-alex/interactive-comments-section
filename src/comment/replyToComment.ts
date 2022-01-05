import { appendForm, createForm } from "../form.js";
import { addCommentLocalStorageUpdate } from "../handleLocalStorage/addCommentLocalStorageUpdate.js";
import { getDataFromLocalStorage } from "../handleLocalStorage/getDataFromLocalStorage.js";
import { dataInterface } from "../interfaces/index";
import { randomIdGenerator } from "../randomIdGenerator.js";
import { createCommentElement } from "./commentBox.js";

const data: dataInterface = getDataFromLocalStorage()!;

export const replyToComment = (event: Event): void => {
  const element = <Element>event.target;
  const commentContainer =
    element!.parentElement!.parentElement!.parentElement!.parentElement!.parentElement!.closest(
      ".commentBox__container"
    )!;

  const isTopLevelComment =
    !commentContainer.classList.contains("reply-comment");

  const commentFormContainer = commentContainer.querySelector(
    ".commentBox__replyFormContainer"
  ) as HTMLDivElement;

  const repliesContainer = commentContainer.querySelector(
    ".commentBox__replyCommentsContainer"
  ) as HTMLDivElement;

  const mainContainer = commentContainer.parentElement;

  if (!commentFormContainer.childNodes.length) {
    const form = createForm({
      textareaPlaceholder: "Write a reply...",
      btnText: "Reply",
      submitFunc: () =>
        addReply({
          addReplyTo: isTopLevelComment ? repliesContainer : mainContainer!,
        }),
      withCancel: true,
    });

    appendForm({
      appendFormTo: commentFormContainer,
      formToAppend: form,
    });

    const textarea = form.querySelector("#form-content") as HTMLTextAreaElement;

    textarea.focus();

    const addReply = ({ addReplyTo }: { addReplyTo: Element }): void => {
      const replyParent = addReplyTo.parentElement?.parentElement;

      if (textarea.value) {
        const randomId = randomIdGenerator();
        const comment = createCommentElement(
          randomId,
          0,
          data.currentUser.image.png,
          data.currentUser.username,
          new Date().toLocaleDateString(),
          textarea.value,
          [],
          data.currentUser,
          "reply"
        );
        addReplyTo.appendChild(comment);
        addCommentLocalStorageUpdate(
          {
            id: randomId,
            content: textarea.value,
            createdAt: new Date().toLocaleDateString(),
            user: data.currentUser,
            replies: [],
            score: 0,
          },
          true,
          replyParent?.getAttribute("id")!
        );
        form.remove();
      }
    };
  }
};
