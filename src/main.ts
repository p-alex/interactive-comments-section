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

// Getting data from data.json
const getData = async (): Promise<dataInterface> => {
  const response = await fetch("data.json");
  const json = await response.json();
  return json;
};

export let currentUser: userInterface;

const main = async (): Promise<void> => {
  const data: dataInterface = await getData();
  const { comments } = data;
  currentUser = data.currentUser;

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

  appendComments(comments, currentUser);
  appendForm();
  appendFooter();
};

main();
