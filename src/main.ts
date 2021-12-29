import { createCommentElement } from "./commentBox.js";
import { appendFooter } from "./footer.js";
import { appendForm } from "./form.js";
import {
  commentsInterface,
  dataInterface,
  userInterface,
} from "./interfaces/index";

export const mainContainer = document.querySelector(
  ".container"
) as HTMLDivElement;

export const mainForm = document.querySelector(
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

const main = async (): Promise<void> => {
  if (data?.currentUser?.username) {
    appendComments(data.comments, data.currentUser);
    appendForm({ appendToElement: mainForm });
    appendFooter();
  } else {
    const error = document.createElement("p") as HTMLParagraphElement;
    error.innerText = "Something went wrong...";
    mainContainer.appendChild(error);
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
        currentUser
      )
    );
  });
};

(async () => {
  await getData();
  await main();
})();
