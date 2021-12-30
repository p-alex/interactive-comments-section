import { createCommentElement } from "./commentBox.js";
import { appendFooter } from "./footer.js";
import { addNewComment, appendForm, createForm } from "./form.js";
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

export let data: dataInterface;

// Getting data from data.json
const getData = async (): Promise<void> => {
  try {
    const response = await fetch("data.json");
    const json: dataInterface = await response.json();
    data = json;
  } catch (err) {
    console.error(err);
  }
};

const main = (): void => {
  if (data?.currentUser?.username) {
    appendComments(data.comments, data.currentUser);
    appendForm({
      appendFormTo: mainFormContainer,
      formToAppend: createForm({
        textareaPlaceholder: "Write a comment...",
        btnText: "Send",
        submitFunc: addNewComment,
      }),
    });
    appendFooter();
  } else {
    appendErrorMessage({ message: "Something went wrong..." });
  }
};

const appendComments = (
  comments: commentsInterface[],
  currentUser: userInterface
) => {
  comments.forEach((comment: commentsInterface): void => {
    mainContainer.appendChild(
      createCommentElement(
        comment.score,
        comment.user.image.png,
        comment.user.username,
        comment.createdAt,
        comment.content,
        comment.replies,
        currentUser,
        "normal"
      )
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
