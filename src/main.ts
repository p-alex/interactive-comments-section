import "./styles/CommentBox.css";
import "./styles/ConfirmDelete.css";
import "./styles/Container.css";
import "./styles/Footer.css";
import "./styles/Form.css";
import "./styles/globals.css";
import "./styles/PageWrapper.css";

import { createCommentElement } from "./comment/commentBox";
import { appendFooter } from "./footer";
import { addNewComment, appendForm, createForm } from "./form";
import { getDataFromLocalStorage } from "./handleLocalStorage/getDataFromLocalStorage";
import {
  commentsInterface,
  dataInterface,
  userInterface,
} from "./interfaces/index";

export const mainContainer = document.querySelector(
  ".container"
) as HTMLDivElement;

export const mainFormContainer = document.querySelector(
  ".form__container"
) as HTMLDivElement;

// Getting data from data.json
const getData = async (): Promise<void> => {
  try {
    if (localStorage.getItem("data") === null) {
      const response = await fetch("data.json");
      const json: dataInterface = await response.json();
      localStorage.setItem("data", JSON.stringify(json));
    }
  } catch (err: any) {
    console.error(err);
    appendErrorMessage({ message: err.message });
  }
};

const main = (): void => {
  const data: dataInterface | null = getDataFromLocalStorage();
  if (data) {
    appendComments(data.comments, data.currentUser);
    appendForm({
      appendFormTo: mainFormContainer,
      formToAppend: createForm({
        textareaPlaceholder: "Write a comment...",
        btnText: "Send",
        submitFunc: addNewComment,
        cancelFunc: ({ formToRemove }: { formToRemove: Element }) =>
          formToRemove.remove(),
        withCancel: false,
      }),
    });
    appendFooter();
  }
};

const appendComments = (
  comments: commentsInterface[],
  currentUser: userInterface
) => {
  comments.forEach((comment: commentsInterface): void => {
    mainContainer.appendChild(
      createCommentElement({
        id: comment.id,
        score: comment.score,
        userImage: comment.user.image.png,
        username: comment.user.username,
        createdAt: comment.createdAt,
        content: comment.content,
        replies: comment.replies,
        currentUser,
        typeOfComment: "normal",
        replyingTo: "",
      })
    );
  });
};

const appendErrorMessage = ({ message }: { message: string }): void => {
  const error = document.createElement("p") as HTMLParagraphElement;
  error.innerText = message;
  mainContainer.appendChild(error);
};

(async (): Promise<void> => {
  await getData();
  main();
})();
