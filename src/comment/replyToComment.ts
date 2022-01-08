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

  const replyButton = commentContainer.querySelector(
    "#reply-btn"
  ) as HTMLButtonElement;

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
      cancelFunc: ({ formToRemove }: { formToRemove: Element }) => {
        formToRemove.remove();
        replyButton.focus();
      },
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

      const replyingTo = commentContainer.querySelector(
        ".commentBox__username"
      ) as HTMLParagraphElement;
      console.log(data.currentUser);
      if (textarea.value) {
        const randomId = randomIdGenerator();

        const comment = createCommentElement({
          id: randomId,
          score: 0,
          userImage: data.currentUser.image.png,
          username: data.currentUser.username,
          createdAt: Date.now(),
          content: textarea.value,
          replies: [],
          currentUser: data.currentUser,
          typeOfComment: "reply",
        });
        addReplyTo.appendChild(comment);

        const newReplyData = {
          id: randomId,
          content: textarea.value,
          createdAt: Date.now(),
          replyingTo: replyingTo.innerText,
          user: data.currentUser,
          score: 0,
        };

        addCommentLocalStorageUpdate({
          commentData: newReplyData,
          isReply: true,
          index: replyParent!.getAttribute("id")!,
        });
        form.remove();
      }
    };
  }
};
