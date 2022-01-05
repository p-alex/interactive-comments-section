import { createCommentElement } from "./comment/commentBox.js";
import { appendFooter } from "./footer.js";
import { addNewComment, appendForm, createForm } from "./form.js";
import { getDataFromLocalStorage } from "./handleLocalStorage/getDataFromLocalStorage.js";
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
      createCommentElement(
        comment.id,
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
